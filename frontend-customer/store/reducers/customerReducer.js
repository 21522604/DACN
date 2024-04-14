import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    customerInfo: null,
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_LOGIN_OR_REGISTER:
            return {
                ...state,
                isLoggedIn: true,
                customerInfo: action.customerInfo
            };

        case actionTypes.CUSTOMER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                customerInfo: null
            };

        default:
            return state;
    }
};

export default customerReducer;