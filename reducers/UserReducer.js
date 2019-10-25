export const UserReducer = (state, action) => {
    switch (action.type) {
        case "NEW_PASSWORD_REQUIRED":
            return {
                ...state,
                user: action.user,
                confirmCode: false,
            };
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                newUser: action.newUser,
                confirmCode: true,
            };
        case "SIGNUP_FAIL":
            return {
                ...state,
                user: null,
                newUser: null,
                confirmCode: false,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.user,
                appKey: action.appKey,
                jwtToken: action.jwtToken,
                newUser: null,
                confirmCode: false,
            };
       
        case "CHECK_LOGIN_SUCCESS":
            return {
                ...state,
                user: action.user,
                appKey: action.appKey,
                jwtToken: action.jwtToken,
                newUser: null,
                confirmCode: false,
            };
        case "CHECK_LOGIN_FAIL":
            return {
                ...state,
                user: null,
                newUser: null,
                confirmCode: false,
            };
        case "LOGIN_FAIL":
            return state;
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: null,
                newUser: null,
                confirmCode: false,
            };
        default:
            return state;
    }
};
