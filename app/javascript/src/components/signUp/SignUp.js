import React, { Component } from 'react';
import './SignUp.css'
import TextField from '../shared/TextField';
import { Link } from 'react-router-dom';
import { signUp } from "../../actions/users";
import ModalAlert from '../shared/ModalAlert';


class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.state = { checked: false, fullNameFocus: false, emailFocus: false, passwordFocus: false,
            confirmPasswordFocus: false, modalIsOpen: false,
            valid: { email: false, password: false, confirmPassword: false }
        }
    }
    
    handleClick = (event) => {
        this.setState({checked: event.target.checked});
    };
    
    signUpReq = () => {
        if(!this.state.checked) {
            this.setState({modalIsOpen: true});
            return
        }
        let { email, password, confirmPassword } = this.state.valid;
        if(email && password && confirmPassword) {
            let { email, password, confirmPassword } = this.state;
            let data = { user: { email: email, password: password, password_confirmation: confirmPassword }};
            signUp(data, this);
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
                if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
                    elem.className += ' invalid';
                    this.setState({ valid: { ...this.state.valid, email: false } });
                }
                this.setState({ valid: { ...this.state.valid, email: true } });
                break;
            }
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
                <div className="sign_up_header">Sign up</div>
                <div className="sign_up_inputs">
                    <TextField
                        parent={this}
                        type="fullName"
                        labelName="Full name"
                    />
                    <TextField
                        parent={this}
                        type="email"
                        labelName="E-mail"
                    />
                    <TextField
                        parent={this}
                        type="password"
                        labelName="Password"
                        inputType="password"
                    />
                    <TextField
                        parent={this}
                        type="confirmPassword"
                        labelName="Confirm password"
                        inputType="password"
                    />
                    <label className="sign_up_checkmark_container checkmark_container">
                        I agree to the Suppliers Hub Customer <b><Link to='/terms' target="_blank" className="sign_up_terms_link">
                        Terms of Service
                    </Link></b>
                        <input type="checkbox"
                               className="sign_up_checkbox checkbox"
                               onClick={ this.handleClick }
                        />
                        <span className="sign_up_checkmark checkmark"/>
                    </label>
                </div>
                <div className="sign_up_buttons">
                    <div className="sign_up_button" onClick={ this.signUpReq }>SIGN UP</div>
                    <div className="sign_up_login">or <b><Link to="/login" className="sign_up_login_link">Login</Link></b>
                    </div>
                </div>
                <ModalAlert modalIsOpen={this.state.modalIsOpen} parent={this} alert={'Please, read and agree with Terms of Services.'}/>
            </div>
        );
    }
}

export default SignUp;