const orderid = require('order-id')('key');

const Order = require('../models/order');
const User = require('../models/user');
const Order_State = require('../models/order_state');
const Product_Variant = require('../models/product_variant');
const Product = require('../models/product');
const Product_Price_History = require('../models/product_price_history');
const Order_Item = require('../models/order_item');
const Feedback = require('../models/feedback');
const Order_Status_Change_History = require('../models/order_status_change_history');

let create = async (req, res, next) => {
    let user_id = req.body.user_id;
    if (user_id === undefined) return res.status(400).send('Trường user_id không tồn tại');
    try {
        let user = await User.findOne({ where: { user_id, role_id: 2 } });
        if (user == null) return res.status(400).send('User này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) return res.status(400).send('Trường customer_name không tồn tại');
    let email = req.body.email;
    if (email === undefined) return res.status(400).send('Trường email không tồn tại');
    let phone_number = req.body.phone_number;
    if (phone_number === undefined) return res.status(400).send('Trường phone_number không tồn tại');
    let address = req.body.address;
    if (address === undefined) return res.status(400).send('Trường address không tồn tại');
    let order_items = req.body.order_items;
    if (order_items === undefined) return res.status(400).send('Trường order_items không tồn tại');

    try {
        let order_id = orderid.generate().replace(/-/g, "");
        var newOrder = await Order.create({
            user_id,
            order_id,
            customer_name,
            email,
            phone_number,
            address,
            total_product_value: 0,
            delivery_charges: 0,
            total_order_value: 0,
        });

        let total_product_value = 0;
        for (let i = 0; i < order_items.length; i++) {
            let order_item = order_items[i];
            let product_variant = await Product_Variant.findOne({
                attributes: ['product_variant_id', 'quantity', 'state'],
                include: [
                    {
                        model: Product, attributes: ['product_id'],
                        include: { model: Product_Price_History, attributes: ['price'], separate: true, order: [['created_at', 'DESC']] }
                    },
                ],
                where: { product_variant_id: order_item.product_variant_id }
            });
            if (product_variant == null)
                return res.status(400).send("Sản phẩm này không tồn tại");
            if (product_variant.state != true)
                return res.status(400).send("Sản phẩm này chưa được mở bán");
            if (order_item.quantity > product_variant.quantity)
                return res.status(400).send("Số lượng sản phẩm không hợp lệ");
            let productVariantPrice = product_variant.Product.Product_Price_Histories[0].price;
            let total_value = productVariantPrice * order_item.quantity;
            let newOrderItem = {
                order_id: newOrder.order_id,
                product_variant_id: product_variant.product_variant_id,
                order_item_index: i,
                price: productVariantPrice,
                quantity: order_item.quantity,
                total_value
            }
            await Order_Item.create(newOrderItem);
            newProductVariantQuantity = product_variant.quantity - order_item.quantity;
            product_variant.update({ quantity: newProductVariantQuantity });
            total_product_value += total_value;
        }

        let delivery_charges = 20000
        let total_order_value = total_product_value + delivery_charges;
        newOrder.update({ total_product_value, delivery_charges, total_order_value });
        let state = await Order_State.findOne({ where: { state_id: 1, state_name: "Chờ Xác Nhận" } });
        await newOrder.addOrder_State(state);
        return res.send(newOrder)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }
}

let listAdminSide = async (req, res, next) => {
    try {
        let orderList = await Order.findAll({
            attributes: ['order_id', 'total_order_value'],
            include: [
                {
                    model: Order_Status_Change_History, where: { state_id: 1 }
                },
            ],
            order: [
                [Order_Status_Change_History, 'created_at', 'DESC']
            ]
        });

        orderList = await Promise.all(orderList.map(async (order) => {
            let stateList = await order.getOrder_States()
            let state = stateList.pop()
            let newOrder = {
                order_id: order.order_id,
                total_order_value: order.total_order_value,
                state_id: state.state_id,
                state_name: state.state_name,
                created_at: order.Order_Status_Change_Histories[0].created_at
            }
            return newOrder;
        }));

        return res.send(orderList);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');

    }
}

let listCustomerSide = async (req, res, next) => {
    let customer_id = req.params.customer_id;
    if (customer_id === undefined) return res.status(400).send('Trường customer_id không tồn tại');
    try {
        let customer = await User.findOne({ where: { user_id: customer_id, role_id: 2 } });
        if (customer == null) return res.status(400).send('User này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }

    try {
        // Lấy tất cả đơn hàng và sắp xếp theo ngày tạo
        let orderList = await Order.findAll({
            attributes: ['order_id', 'total_order_value', 'user_id'],
            include: [
                {
                    model: Order_Status_Change_History, where: { state_id: 1 }
                },
            ],
            where: { user_id: customer_id },
            order: [
                [Order_Status_Change_History, 'created_at', 'DESC']
            ]
        });

        orderList = await Promise.all(orderList.map(async (order) => {
            // Lấy danh sách sản phẩm của đơn hàng
            let productVariantList = await order.getProduct_variants();
            let orderItemList = [];
            for (let productVariant of productVariantList) {
                let product = await productVariant.getProduct();
                let productImages = await productVariant.getProduct_Images();
                let colour = await productVariant.getColour();
                let size = await productVariant.getSize();

                let feedback = await Feedback.findOne({
                    where: {
                        user_id: customer_id,
                        product_variant_id: productVariant.product_variant_id
                    }
                })
                let hasFeedback = feedback != null

                let productVariantConverted = {
                    product_variant_id: productVariant.product_variant_id,
                    name: product.product_name,
                    image: productImages[0].path,
                    quantity: productVariant.Order_Item.quantity,
                    colour: colour.colour_name,
                    size: size.size_name,
                    price: productVariant.Order_Item.price,
                    has_feedback: hasFeedback
                }
                orderItemList.push(productVariantConverted);
            }

            // Lấy trạng thái cuối cùng của đơn hàng
            let stateList = await order.getOrder_States()
            let state = stateList.pop()

            // Convert lại đơn hàng
            let orderConverted = {
                order_id: order.order_id,
                state_id: state.state_id,
                state_name: state.state_name,
                order_items: orderItemList,
                total_order_value: order.total_order_value,
                created_at: order.Order_Status_Change_Histories[0].created_at
            }
            return orderConverted;
        }));

        return res.send(orderList);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');

    }
}

let detailCustomerSide = async (req, res, next) => {
    let customer_id = req.params.customer_id;
    if (customer_id === undefined) return res.status(400).send('Trường customer_id không tồn tại');
    try {
        let customer = await User.findOne({ where: { user_id: customer_id, role_id: 2 } });
        if (customer == null) return res.status(400).send('User này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');
    }

    let order_id = req.params.order_id;
    if (order_id === undefined) return res.status(400).send('Trường order_id không tồn tại');
    let order;
    try {
        order = await Order.findOne({ where: { order_id, user_id: customer_id } });
        if (order == null) return res.status(400).send('Order này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');
    }

    let stateList = await order.getOrder_States()
    let created_at = stateList[0].Order_Status_Change_History.created_at;
    let state = stateList.pop()

    let productVariantList = await order.getProduct_variants();
    let orderItemList = [];
    for (let productVariant of productVariantList) {
        let product = await productVariant.getProduct();
        let colour = await productVariant.getColour();
        let size = await productVariant.getSize();
        let productVariantConverted = {
            name: product.product_name,
            quantity: productVariant.Order_Item.quantity,
            price: productVariant.Order_Item.price,
            colour: colour.colour_name,
            size: size.size_name,
            total_value: productVariant.Order_Item.total_value
        }
        orderItemList.push(productVariantConverted);
    }

    let orderConverted = {
        order_id: order.order_id,
        state_id: state.state_id,
        state_name: state.state_name,
        created_at,
        order_items: orderItemList,
        total_product_value: order.total_product_value,
        delivery_charges: order.delivery_charges,
        total_order_value: order.total_order_value,
        customer_name: order.customer_name,
        email: order.email,
        phone_number: order.phone_number,
        address: order.address
    }

    return res.send(orderConverted);
}

let detailAdminSide = async (req, res, next) => {
    let order_id = req.params.order_id;
    if (order_id === undefined) return res.status(400).send('Trường order_id không tồn tại');

    try {
        let order = await Order.findOne({ where: { order_id } });
        if (order == null) return res.status(400).send('Order này không tồn tại');

        let stateList = await order.getOrder_States()
        let orderHistories = stateList.map((state) => {
            return {
                state_name: state.state_name,
                created_at: state.Order_Status_Change_History.created_at
            }
        });
        let created_at = stateList[0].Order_Status_Change_History.created_at
        let state = stateList.pop()

        let productVariantList = await order.getProduct_variants();
        let orderItemList = [];
        for (let productVariant of productVariantList) {
            let product = await productVariant.getProduct();
            let colour = await productVariant.getColour();
            let size = await productVariant.getSize();
            let productVariantConverted = {
                name: product.product_name,
                quantity: productVariant.Order_Item.quantity,
                price: productVariant.Order_Item.price,
                colour: colour.colour_name,
                size: size.size_name,
                total_value: productVariant.Order_Item.total_value
            }
            orderItemList.push(productVariantConverted);
        }

        let orderConverted = {
            order_id: order.order_id,
            state_id: state.state_id,
            state_name: state.state_name,
            created_at,
            order_items: orderItemList,
            total_product_value: order.total_product_value,
            delivery_charges: order.delivery_charges,
            total_order_value: order.total_order_value,
            order_histories: orderHistories,
            customer_name: order.customer_name,
            email: order.email,
            phone_number: order.phone_number,
            address: order.address
        }

        return res.send(orderConverted);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');
    }
}

let changeStatus = async (req, res, next) => {
    let order_id = req.params.order_id;
    if (order_id === undefined) return res.status(400).send('Trường order_id không tồn tại');
    let state_id = req.params.state_id;
    if (state_id === undefined) return res.status(400).send('Trường state_id không tồn tại');
    let order;
    try {
        order = await Order.findOne({ where: { order_id } });
        if (order == null) return res.status(400).send('Order này không tồn tại');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tạo đơn hàng vui lòng thử lại');
    }

    try {
        // Xử lý chuyển đơn hàng sang trạng thái "Đã xác nhận"
        if (state_id == 2) {
            let stateList = await order.getOrder_Status_Change_Histories();
            const even = (state) => state.state_id == 1;
            // Kiểm tra xem đơn hàng có tồn tại trạng thái "Chờ xác nhận" hay không?
            if (stateList.some(even)) {
                let state = await Order_State.findOne({ where: { state_id: 2 } });
                let newState = await order.addOrder_State(state);
                return res.send(newState);
            } else return res.send("Đơn hàng không hợp lệ");
        }

        // Xử lý chuyển đơn hàng sang trạng thái "Đang vận chuyển"
        if (state_id == 3) {
            let stateList = await order.getOrder_Status_Change_Histories();
            const even = (state) => state.state_id == 2;
            // Kiểm tra xem đơn hàng có tồn tại trạng thái "Đã xác nhận" hay không?
            if (stateList.some(even)) {
                let state = await Order_State.findOne({ where: { state_id: 3 } });
                let newState = await order.addOrder_State(state);
                return res.send(newState);
            } else return res.send("Đơn hàng không hợp lệ");
        }

        // Xử lý chuyển đơn hàng sang trạng thái "Đã giao"
        if (state_id == 4) {
            let stateList = await order.getOrder_Status_Change_Histories();
            const even = (state) => state.state_id == 3;
            // Kiểm tra xem đơn hàng có tồn tại trạng thái "Đang vận chuyển" hay không?
            if (stateList.some(even)) {
                let productVariantList = await order.getProduct_variants();
                for (let productVariant of productVariantList) {
                    let product = await productVariant.getProduct();
                    let oldSold = product.sold;
                    let quantity = productVariant.Order_Item.quantity;
                    let newSold = oldSold + quantity;
                    await product.update({ sold: newSold })
                }
                let state = await Order_State.findOne({ where: { state_id: 4 } });
                let newState = await order.addOrder_State(state);
                return res.send(newState);
            } else return res.send("Đơn hàng không hợp lệ");
        }

        // Xử lý chuyển đơn hàng sang trạng thái "Đã hủy"
        if (state_id == 5) {
            let stateList = await order.getOrder_Status_Change_Histories();
            const even = (state) => state.state_id == 1;
            const lastIndex = stateList.length - 1;
            // Kiểm tra xem đơn hàng có tồn tại trạng thái "Chờ xác nhận" và 
            // không có trạng thái "Đã giao" và "Hủy bởi shop" là trạng thái cuối cùng hay không?
            if (stateList.some(even) && stateList[lastIndex].state_id != 4 && stateList[lastIndex].state_id != 6) {
                let state = await Order_State.findOne({ where: { state_id: 5 } });
                let newState = await order.addOrder_State(state);
                return res.send(newState);
            } else return res.send("Đơn hàng không hợp lệ");
        }

        // Xử lý chuyển đơn hàng sang trạng thái "Hủy bởi shop"
        if (state_id == 6) {
            let stateList = await order.getOrder_Status_Change_Histories();
            const even = (state) => state.state_id == 1;
            const lastIndex = stateList.length - 1;
            // Kiểm tra xem đơn hàng có tồn tại trạng thái "Chờ xác nhận" và 
            // không có trạng thái "Đã giao" và "Đã hủy" là trạng thái cuối cùng hay không?
            if (stateList.some(even) && stateList[lastIndex].state_id != 4 && stateList[lastIndex].state_id != 5) {
                let state = await Order_State.findOne({ where: { state_id: 6 } });
                let newState = await order.addOrder_State(state);
                return res.send(newState);
            } else return res.send("Đơn hàng không hợp lệ");
        }

        res.send("state_id không hợp lệ");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Gặp lỗi khi tải dữ liệu vui lòng thử lại');
    }
}

module.exports = {
    create,
    listAdminSide,
    listCustomerSide,
    detailCustomerSide,
    detailAdminSide,
    changeStatus
}
