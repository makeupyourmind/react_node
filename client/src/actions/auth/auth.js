import API from "../../services/api";
import * as ACTION from '../types';

const authSuccessAction = payload => {
    return {
        type: ACTION.LOGIN_SUCCESS,
        isAuth: true,
        payload
    };
};

const authFailedAction = err => {
    return {
        type: ACTION.LOGIN_FAILED,
        isAuth: false,
        err
    };
};

const registerSuccessAction = payload => {
    return {
        type: ACTION.REGISTER_SUCCESS,
        payload
    };
};

const registerFailedAction = err => {
    return {
        type: ACTION.REGISTER_FAILED,
        err
    };
};

const logoutAction = () => {
    return {
        type: ACTION.LOGOUT,
        isAuth: false
    };
};


export const login = (password, email) => {
    console.log("dispath")
    return dispatch => {
        return API.post("/users/login", {
            password,
            email
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch(authSuccessAction(res));
        })
        .catch(error => {
            dispatch(authFailedAction("Wrong name or password"));
            console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        })
    };
};


export const signUp = (name, password, email) => {
    return dispatch => {
        return API.post("/users/signUp", {
            name,
            password,
            email
        })
        .then(res => {
            dispatch(registerSuccessAction({ name, password, email }));
        })
        .catch(error => {
            dispatch(registerFailedAction("Invalid values. Try again"));
            // console.log(error.response.data.message)
            throw new Error(error.response.data.message);
        })
    };
}

export const authorizated = () => {
    return dispatch => {
        return API.get("/users/getCurrentUser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                dispatch(authSuccessAction(res.data.user));
            })
            .catch(e => {
                localStorage.clear()
                console.log(e.response)
                throw new Error(e.response);
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        return dispatch(logoutAction());
    };
};