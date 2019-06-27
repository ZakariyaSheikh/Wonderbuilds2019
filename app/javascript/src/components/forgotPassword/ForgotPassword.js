import React, { Component } from 'react';
import './ForgotPassword.css'
import TextField from '../shared/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword } from '../../actions/users';
import ModalAlert from '../shared/ModalAlert';



class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = { modalIsOpen: false, emailFocus: false, valid: { email: false }  }
    }
    
    handleClick = (event) => {
        this.setState({ checked: event.target.checked });
    };
    
    resetPasswordReq = () => {
        let { email } = this.state.valid;
        if(email) {
            let { email } = this.state;
            let data = { email: email };
            resetPassword(data, this)
        }
    };
    
    validate = (type) => {
        let elem = document.getElementById(type);
        let n = elem.className.search(' invalid');
    
        if(n > 0) {
            elem.className = elem.className.slice(0, n);
        }
        switch(type) {
            case "email": {
                if( !( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) ) ) {
                    elem.className += ' invalid';
                    this.setState({ valid: { email: false } })
                } else {
                    this.setState({ valid: { email: true } })
                }
                break;
            }
        }
    };
    
    render() {
        return (
            <div className="sign_up">
                <div className="sign_up_header">Forgot password</div>
                <div className="forgot_password_text">We'll send instructions to reset your password</div>
                <div className="sign_up_inputs">
                    <TextField
                        parent={this}
                        type="email"
                        labelName="E-mail"
                    />
                </div>
                <div className="sign_up_buttons">
                    <div className="sign_up_button" onClick={ this.resetPasswordReq }>RESET PASSWORD</div>
                    <div className="sign_up_login">Need help? <b><Link to="/contact_us" className="sign_up_login_link">Contact us</Link></b>
                    </div>
                </div>
                <ModalAlert modalIsOpen={this.state.modalIsOpen} parent={this} alert={"Reset link sent to your email, please, check it."}/>

            </div>
        );
    }
}

export default ForgotPassword;