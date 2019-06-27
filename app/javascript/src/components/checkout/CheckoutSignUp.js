import React, {Component} from 'react';
import './CheckoutSignUp.css'
import TextField from '../common/TextField';
import {Link} from 'react-router-dom';
import {signUp} from "../../actions/users";
import ModalAlert from '../shared/ModalAlert';


class CheckoutSignUp extends Component {
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
      password_confirmation: {
        value: "",
        isValid: true
      },
      checked: false,
      modalIsOpen: false
    }
  }

  handleClick = (event) => {
    console.log(event.target.checked);
    this.setState({checked: event.target.checked});
  };

  signUpReq = () => {
    let canMakeRequest = true
    let data = {user: {}}
    if (!this.state.checked) {
      this.setState({modalIsOpen: true});
      return
    }


    for (let key in this.state) {
      if (key !== "checked" && key !== "modalIsOpen") {
        this.validate(key)

        if (!this.state[key].isValid || !this.state[key].value.length) {
          canMakeRequest = false;
        }
        data.user[key] = this.state[key].value
      }
    }
    if (canMakeRequest) {
      signUp(data, this);
    }
  };

  validate = (type) => {
    switch (type) {
      case "email": {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email.value))) {
          this.setState({[type]: {...this.state[type], isValid: false},});
        }
        break;
      }
      case "password": {
        if (!this.state.password.value || this.state.password.value.length < 6) {
          this.setState({[type]: {...this.state[type], isValid: false},});
        }
        break;
      }
      case "password_confirmation": {
        if (! this.state.password_confirmation.value  || ((this.state.password_confirmation.value.length < 6
            && this.state.password.value !== this.state.password_confirmation.value))) {
          this.setState({[type]: {...this.state[type], isValid: false},});
        }
        break;
      }
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

  render() {
    const {email, password, password_confirmation} = this.state
    return (
      <div className="checkout_sign_up">
        <div className="checkout_auth_sign_up">
          <div className="checkout_auth_header">New customer</div>
          <div className="sign_up_inputs checkout_auth_block">
            <TextField
              value={email.value}
              className={email.isValid ? "" : "invalid"}
              type="email"
              labelName="E-mail *"
              onBlur={(type) => this.validate(type)}
              onInput={(value, type) => this.handleInput(value, type)}
            />
            <TextField
              value={password.value}
              className={password.isValid ? "" : "invalid"}
              type="password"
              labelName="Password *"
              inputType="password"
              onBlur={(type) => this.validate(type)}
              onInput={(value, type) => this.handleInput(value, type)}
            />
            <TextField
              value={password_confirmation.value}
              className={password_confirmation.isValid ? "" : "invalid"}
              type="password_confirmation"
              labelName="Confirm password *"
              inputType="password"
              onBlur={(type) => this.validate(type)}
              onInput={(value, type) => this.handleInput(value, type)}
            />
            <label className="sign_up_checkmark_container checkmark_container">
              I agree to the Suppliers Hub Customer <b><Link to='/terms' target="_blank"
                                                             className="sign_up_terms_link">
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
            <div className="sign_up_button" onClick={this.signUpReq}>SIGN UP</div>
          </div>
        </div>
        <ModalAlert modalIsOpen={this.state.modalIsOpen} parent={this}
                    alert={'Please, read and agree with Terms of Services.'}/>
      </div>
    );
  }
}

export default CheckoutSignUp;