import actionTypes from "../actions/actionTypes";

const initialState = {
    productList: [],
    isError: false,
    messageError: ''
};

const getProductPosition = (productList, productVariantId) => {
    for (let i in productList) {
        if (productList[i].productVariantId === productVariantId)
            return i
    }
    return -1
}

const handleAddToProduct = (state, action) => {
    let productList = state.productList
    let product = action.product
    let position = getProductPosition(productList, product.productVariantId)

    if (position == -1) {
        if (product.quantity <= 0 || product.quantity > product.inventory)
            return {
                ...state,
                isError: true,
                messageError: product.name + " chỉ còn tồn kho " + product.inventory + " sản phẩm"
            }
        product.totalValue = product.price * product.quantity
        productList.push(product)
    } else {
        let newQuantity = productList[position].quantity + product.quantity
        if (newQuantity > productList[position].inventory)
            return {
                ...state,
                isError: true,
                messageError: product.name + " chỉ còn tồn kho " + product.inventory + " sản phẩm"
            }
        productList[position].quantity = newQuantity
        productList[position].totalValue = productList[position].price * productList[position].quantity
    }
    return {
        ...state,
        productList: [...productList]
    };
}

const handleIncrementQuantity = (state, action) => {
    let productList = state.productList;
    let productVariantId = action.productVariantId;
    let position = getProductPosition(productList, productVariantId);

    if (position != -1) {
        let newQuantity = productList[position].quantity + 1;
        if (newQuantity <= productList[position].inventory) {
            productList[position].quantity = newQuantity
            productList[position].totalValue = productList[position].price * productList[position].quantity
        }
    }
    return {
        ...state,
        productList: [...productList]
    };
}

const handleDecrementQuantity = (state, action) => {
    let productList = state.productList;
    let productVariantId = action.productVariantId;
    let position = getProductPosition(productList, productVariantId);

    if (position != -1) {
        let newQuantity = productList[position].quantity - 1;
        if (newQuantity >= 1) {
            productList[position].quantity = newQuantity
            productList[position].totalValue = productList[position].price * productList[position].quantity
        }
    }
    return {
        ...state,
        productList: [...productList]
    };
}

const handleRemoveItem = (state, action) => {
    let productList = state.productList;
    let productVariantId = action.productVariantId;
    let position = getProductPosition(productList, productVariantId);

    if (position != -1)
        productList.splice(position, 1);
    return {
        ...state,
        productList: [...productList]
    };
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return handleAddToProduct(state, action)

        case actionTypes.INCREMENT_QUANTITY:
            return handleIncrementQuantity(state, action)

        case actionTypes.DECREMENT_QUANTITY:
            return handleDecrementQuantity(state, action)

        case actionTypes.REMOVE_ITEM:
            return handleRemoveItem(state, action)

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                productList: []
            };

        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                isError: false,
                messageError: ""
            };

        default:
            return state;
    }
};

export default cartReducer;