import actionTypes from './actionTypes';

export const adminLoginOrRegister = (adminInfo) => {
    return {
        type: actionTypes.ADMIN_LOGIN_OR_REGISTER,
        adminInfo,
    };
};

export const adminLogOut = () => {
    return {
        type: actionTypes.ADMIN_LOGOUT,
    };
};