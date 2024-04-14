import actionTypes from "./actionTypes";

export const addToCart = (product) => {
    return {
        type: actionTypes.ADD_TO_CART,
        product
    }
}

export const incrementQuantity = (productVariantId) => {
    return {
        type: actionTypes.INCREMENT_QUANTITY,
        productVariantId
    }
}

export const decrementQuantity = (productVariantId) => {
    return {
        type: actionTypes.DECREMENT_QUANTITY,
        productVariantId
    }
}

export const removeItem = (productVariantId) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        productVariantId
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    }
}