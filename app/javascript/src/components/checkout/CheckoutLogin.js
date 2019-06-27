import React, { Component } from 'react';
import './CheckoutLogin.css'
import { Link } from 'react-router-dom';
import TextField from '../common/TextField';


class CheckoutLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                value: "",
                isValid: true
            },
            password: {
                value: "",
                isValid: true
            },
            checked: false
        }
    }

    signInReq = () => {
        let canMakeRequest = true;
        const data = {user: {}}

        for (let key in this.state) {
            if (key !== "checked") {
                this.validate(key)

                if (!this.state[key].isValid || !this.state[key].value.length) {
                    canMakeRequest = false;
                }
                data.user[key] = this.state[key].value
            }
        }
        if(canMakeRequest) {
            this.props.signIn(data);
        }
    };

    validate = (type) => {
        switch (type) {
            case "email": {
                if (!this.state.email.value) {
                    this.setState({[type]: {...this.state[type], isValid: false},});
                }
                break;
            }
            case "password": {
                if (!this.state.password.value) this.setState({ [type]: { ...this.state[type],  isValid: false},});
            }
                break;
        }
    };

    handleInput = (value, type) => {
        this.setState({
            ...this.state,
            [type]: {
                value: value,
                isValid: true
            },
        });
    };

  handleClick = (event) => {
    this.setState({ checked: event.target.checked });
  };

    render() {
        const { email, password } = this.state;
        return(
            <div className="checkout_auth_side">
                <div className="checkout_auth_header">Returning customer</div>
                <div className="sign_up_inputs checkout_auth_block">
                    <TextField
                        value={email.value}
                        className={email.isValid ? "": "invalid"}
                        type="email"
                        labelName="E-mail"
                        onBlur = {(type)=> this.validate(type)}
                        onInput={(value, type) => this.handleInput(value, type)}
                    />
                    <TextField
                        value={password.value}
                        className={password.isValid ? "": "invalid"}
                        type="password"
                        labelName="Password"
                        inputType="password"
                        onBlur = {(type)=> this.validate(type)}
                        onInput={(value, type) => this.handleInput(value, type)}
                    />
                    <label className="sign_up_checkmark_container sign_in_checkmark_container checkmark_container">
                        Remember me
                        <input type="checkbox"
                               className="sign_up_checkbox checkbox"
                               onClick={ this.handleClick }
                        />
                        <span className="sign_up_checkmark checkmark"/>
                    </label>
                    <Link to="/forgot_password" className="sign_in_forgot_password">Forgot password?</Link>
                </div>
                <div className="sign_up_buttons sign_in_buttons">
                    <div className="sign_up_button" onClick={ this.signInReq }>LOGIN</div>
                </div>
            </div>
        )
    }
}

export default CheckoutLogin;