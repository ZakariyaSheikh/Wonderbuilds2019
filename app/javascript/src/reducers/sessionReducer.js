import constant from '../constants/sessionConstants';

export default function (state = {}, action) {
    switch(action.type) {
        case constant.LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                token: action.payload.token,
                rememberMe: action.payload.rememberMe
            };
        case constant.LOGOUT:
            return {
                ...state,
                currentUser: null,
                token: null,
                rememberMe: false
            };
        case constant.ERROR:
            return {
                ...state,
                message: action.payload.message
            };
        case constant.ERROR_CLEAN:
            return {
                ...state,
                message: null
            };
        default:
            return state;
    }
    
}