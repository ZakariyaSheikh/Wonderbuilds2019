import React, { Component } from 'react';
import './ChangePassword.css'
import TextField from '../shared/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../actions/users';


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = { passwordFocus: false, confirmPasswordFocus: false,
            valid: { password: false, confirmPassword: false }
        }
    }
    
    handleClick = (event) => {
        this.setState({ checked: event.target.checked });
    };
    
    changePasswordReq = () => {
        let { password, confirmPassword } = this.state.valid;
        if(password && confirmPassword) {
            let { password, confirmPassword } = this.state;
            let data = { password: password, password_confirmation: confirmPassword };
            const params = new URLSearchParams(this.props.location.search);
            const token = params.get('token')
            changePassword(data,  token, this)
        }
    };
    
    validate = (type) => {
        let elem = document.getElementById(type);
        let n = elem.className.search(' invalid');
        
        if(n > 0) {
            elem.className = elem.className.slice(0, n);
        }
        switch(type) {
            case "password": {
                if(this.state.password && (this.state.password.length < 6)){
                    elem.className += ' invalid';
                    this.setState({ valid: { ...this.state.valid, password: false } });
                }
                this.setState({ valid: { ...this.state.valid, password: true } });
                break;
            }
            case "confirmPassword": {
                if(this.state.confirmPassword && (this.state.confirmPassword.length < 6
                        && this.state.password !== this.state.confirmPassword)){
                    elem.className += ' invalid';
                    this.setState({ valid: { ...this.state.valid, confirmPassword: false } });
                }
                this.setState({ valid: { ...this.state.valid, confirmPassword: true } });
                break;
            }
        }
    };
    
    render() {
        return (
            <div className="sign_up">
                <div className="sign_up_header">Change password</div>
                <div className="sign_up_inputs">
                    <TextField
                        parent={this}
                        type="password"
                        labelName="New password"
                        inputType="password"
                    />
                    <TextField
                        parent={this}
                        type="confirmPassword"
                        labelName="Confirm new password"
                        inputType="password"
                    />
                </div>
                <div className="sign_up_buttons">
                    <div className="sign_up_button change_password_button" onClick={ this.changePasswordReq }>CHANGE MY PASSWORD</div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;