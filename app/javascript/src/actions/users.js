import axios from 'axios';
import sessionConstants from '../constants/sessionConstants'


export function signUp(data, object) {
    const url = '/api/v1/users';
    
    axios.post(url, data)
        .then(response => {
            object.props.history.push('/registration_success')
        })
        .catch(error => {
            console.log(error);
        })
}

export function resetPassword(data, object) {
    const url = '/api/v1/reset_password_links';
    
    axios.post(url, {user: data })
        .then(response => {
            object.setState({modalIsOpen: true})
        })
        .catch(error => {
            console.log(error);
        })
}


export function changePassword(data, token, object) {
    const url = '/api/v1/reset_password_links/' + token + '/password';
    
    axios.put(url, data)
        .then(response => {
            object.props.history.push('/login')
        })
        .catch(error => {
            console.log(error);
        })
}

export function confirmEmail(token) {
    const url = '/api/v1/confirmations/' + token;
    
    axios.put(url)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
}

const signIn = (data) => dispatch => {
    const url = '/api/v1/sessions';
    
    axios.post(url, data)
        .then(response => {
            dispatch({
                type: sessionConstants.LOGIN,
                payload: { user: response.data.user, token: response.headers.authorization, rememberMe: data.rememberMe }
            })
        })
        .catch(error => {
            console.log(error);
    
            dispatch({
                type: sessionConstants.ERROR,
                payload: { message: error.data.message }
            })
        });
};

const signOut = (token) => dispatch => {
    const url = '/api/v1/sessions';
    
    axios.delete(url, { headers: { Authorization: token } })
        .then(response => {
            dispatch({
                type: sessionConstants.LOGOUT
            })
        })
        .catch(error => {
            dispatch({
                type: sessionConstants.LOGOUT
            })
        });
}

const cleanMessage = () => dispatch => {
    dispatch({
        type: sessionConstants.ERROR_CLEAN,
    })
};

export default {
    signIn,
    signOut,
    cleanMessage
}
