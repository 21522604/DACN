import actionTypes from "./actionTypes";

export const customerLoginOrRegister = (customerInfo) => {
    return {
        type: actionTypes.CUSTOMER_LOGIN_OR_REGISTER,
        customerInfo
    }
}

export const customerLogOut = () => {
    return {
        type: actionTypes.CUSTOMER_LOGOUT
    }
}