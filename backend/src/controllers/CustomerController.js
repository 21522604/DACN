const bcrypt = require('bcrypt');

const User = require('../models/user');
const Customer_Info = require('../models/customer_info');

let register = async (req, res, next) => {
    let email = req.body.email;
    if (email === undefined) return res.status(400).send('Trường email không tồn tại');
    let password = req.body.password;
    if (password === undefined) return res.status(400).send('Trường password không tồn tại');
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) return res.status(400).send('Trường customer_name không tồn tại');
    let phone_number = req.body.phone_number;
    if (phone_number === undefined) return res.status(400).send('Trường phone_number không tồn tại');

    let customer = await User.findOne({ where: { email, role_id: 2 } });
    if (customer) return res.status(409).send("Email đã tồn tại");
    else {
        try {
            let hashPassword = bcrypt.hashSync(password, 10);
            let newCustomer = await User.create({ email: email, password: hashPassword, role_id: 2 });
            let newCustomerInfo = await Customer_Info.create({ user_id: newCustomer.user_id, customer_name, phone_number });
            return res.send({
                customer_id: newCustomer.user_id,
                email: newCustomer.email,
                customer_name: newCustomerInfo.customer_name,
                phone_number: newCustomerInfo.phone_number,
                address: newCustomerInfo.address
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send("Có lỗi trong quá trình tạo tài khoản vui lòng thử lại");
        }
    }
}

let login = async (req, res, next) => {
    let email = req.body.email;
    if (email === undefined) return res.status(400).send('Trường email không tồn tại');
    let password = req.body.password;
    if (password === undefined) return res.status(400).send('Trường password không tồn tại');

    try {
        let customer = await User.findOne({
            where: { email, role_id: 2 },
            include: [
                { model: Customer_Info, attributes: ['customer_name', 'phone_number', 'address'] },
            ]
        });
        if (!customer) {
            return res.status(401).send("Email không chính xác");
        }

        let isPasswordValid = bcrypt.compareSync(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).send("Mật khẩu không chính xác");
        }

        return res.send({
            customer_id: customer.user_id,
            email: customer.email,
            customer_name: customer.Customer_Info.customer_name,
            phone_number: customer.Customer_Info.phone_number,
            address: customer.Customer_Info.address
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Có lỗi trong quá trình đăng nhập vui lòng thử lại");
    }
}

let update = async (req, res, next) => {
    let user_id = req.body.user_id;
    if (user_id === undefined) return res.status(400).send('Trường user_id không tồn tại');
    let customer_name = req.body.customer_name;
    if (customer_name === undefined) return res.status(400).send('Trường customer_name không tồn tại');
    let phone_number = req.body.phone_number;
    if (phone_number === undefined) return res.status(400).send('Trường phone_number không tồn tại');
    let address = req.body.address;
    if (address === undefined) return res.status(400).send('Trường address không tồn tại');

    try {
        let customer = await User.findOne({ where: { user_id, role_id: 2 } });
        if (!customer) return res.status(409).send("Customer không tồn tại");

        let numberUpdate = await Customer_Info.update(
            { customer_name, phone_number, address },
            { where: { user_id } }
        )
        if (numberUpdate) {
            return res.send({
                customer_name,
                phone_number,
                address
            });
        } else {
            return res.status(400).send("Có lỗi trong quá trình cập nhật vui lòng thử lại");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send("Có lỗi trong quá trình cập nhật vui lòng thử lại");
    }
}

module.exports = {
    register,
    login,
    update
};
