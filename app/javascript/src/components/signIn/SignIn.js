import React, { Component } from 'react';
import './SignIn.css'
import TextField from '../shared/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import usersActions from '../../actions/users';
import ModalAlert from '../shared/ModalAlert';


class SignIn extends Component {
    constructor(props) {
        super(props);
        
        this.state = { emailFocus: false, passwordFocus: false, modalIsOpen: false,
            valid: { email: false, password: false }
        }
    }
    
    handleClick = (event) => {
        this.setState({ checked: event.target.checked });
    };
    
    signInReq = () => {
        let { email, password } = this.state.valid;
        if(email && password) {
            let { email, password } = this.state;
            let data = {user: { email: email, password: password }};
            this.props.signIn(data);
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
        }
    };
    
    componentWillReceiveProps(props) {
        if(props.message) {
            this.setState({modalIsOpen: true})
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.modalIsOpen) {
            this.props.cleanMessage();
        }
    }
    
    componentWillUnmount() {
        this.props.cleanMessage();
    }
    
    render() {
        if(this.props.currentUser) {
            this.props.history.push('/');
        }
        
        return (
            <div className="sign_up">
                <div className="sign_up_header">Login</div>
                <div className="sign_up_inputs">
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
                    <div className="sign_up_login">or <b><Link to="/registration" className="sign_up_login_link">Create an account</Link></b>
                    </div>
                </div>
                <ModalAlert modalIsOpen={this.state.modalIsOpen} parent={this} alert={this.props.message}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state.sessionReducer }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ signIn: usersActions.signIn, cleanMessage: usersActions.cleanMessage } , dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);