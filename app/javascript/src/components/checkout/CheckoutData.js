import React, { Component } from 'react';
import './CheckoutData.css'
import {createOrder} from '../../api/orders';
import TextField from '../common/TextField';



class CheckoutData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:  {
                value: "",
                isValid: true
            },
            country : {
                value: "",
                isValid: true
            },
            province: {
                value: "",
                isValid: true
            },
            city: {
                value: "",
                isValid: true
            },
            surname: {
                value: "",
                isValid: true
            },
            address: {
                value: "",
                isValid: true
            },
            zip: {
                value: "",
                isValid: true
            },
            telephone: {
                value: "",
                isValid: true
            },
            cvc_code: {
                value: "",
                isValid: true
            },
            exp_date: {
                value: "",
                isValid: true
            },
            card_number: {
                value: "",
                isValid: true
            },
            btnDisabled : false
        }
    }

    validate = (type) => {
        switch(type) {
            case "card_number": {
                var is_valid = validateCardNumber(this.state.card_number.value.replace(/-/g, ""))
                if (!is_valid)  this.setState({ [type]: { ...this.state[type], isValid: false }, });
                break;
            }
            case "exp_date": {
                if(this.state.exp_date.value.length < 4) this.setState({ [type]: { ...this.state[type], isValid: false }, });
                break;
            }
            case "telephone": {
                if (this.state.telephone.value.length < 5) this.setState({ [type]: { ...this.state[type], isValid: false }, });
                break;
            }
            case "cvc_code": {
                if(this.state.cvc_code.value.length < 3) this.setState({ [type]: { ...this.state[type], isValid: false }, });
                break;
            }
            default: {
                if (!this.state[type].value.length) this.setState({ [type]: { ...this.state[type], isValid: false }, });
            }
        }

    };

    makeOrder = () => {
        let canMakeRequest = true;
        const data = {}

        for (let key in this.state) {
            if (key !== "btnDisabled") {
                this.validate(key)

                if (!this.state[key].isValid || !this.state[key].value.length) {
                    canMakeRequest = false;
                }
                data[key] = this.state[key].value
            }
        }

        if(canMakeRequest && this.props.products.length ) {
            this.setState({btnDisabled: true});

            let {products, total, token} = this.props;
            total = parseFloat((total + total * 0.2).toFixed(3));

            let dataSend = {...data, products, total};

            createOrder(dataSend, token).then((data) => {
                this.props.cleanCart();
                this.props.history.push('/order_success')
            }).catch((error)=>{
                this.props.history.push('/order_error')
            });
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
        const { btnDisabled, name, country, city, province, surname, address, zip, telephone, card_number, cvc_code, exp_date }  = this.state;

        return(
            <div className='checkout_info_data checkout_left'>
                <div className="checkout_data_header">1. Shipping data</div>
                <div className="checkout_shipping_data">
                    <div className="checkout_shipping_data_side">
                        <TextField
                            value={name.value}
                            className={name.isValid ? "": "invalid"}
                            type="name"
                            labelName="Name *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={country.value}
                            className={country.isValid ? "": "invalid"}
                            type="country"
                            labelName="Country *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={city.value}
                            className={city.isValid ? "": "invalid"}
                            type="city"
                            labelName="City *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={province.value}
                            className={province.isValid ? "": "invalid"}
                            type="province"
                            labelName="Province *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                    </div>
                    <div className="checkout_shipping_data_side">
                        <TextField
                            value={surname.value}
                            className={surname.isValid ? "": "invalid"}
                            type="surname"
                            labelName="Surname *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={address.value}
                            className={address.isValid ? "": "invalid"}
                            type="address"
                            labelName="Address *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={zip.value}
                            className={zip.isValid ? "": "invalid"}
                            type="zip"
                            labelName="ZIP *"
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                        <TextField
                            value={telephone.value}
                            className={telephone.isValid ? "": "invalid"}
                            type="telephone"
                            labelName="Telephone *"
                            mask="+999999999999"
                            maskChar={null}
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                    </div>
                </div>
                <div className="checkout_payment_method">
                    <div className="checkout_data_header">2. Payment method</div>
                    <div className="checkout_shipping_data_side">
                        <TextField
                            value={card_number.value}
                            className={card_number.isValid ? "": "invalid"}
                            type="card_number"
                            labelName="Card number *"
                            mask="9999-9999-9999-9999"
                            maskChar={null}
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                    </div>
                    <div className="checkout_shipping_data_small_side">
                        <TextField
                            value={exp_date.value}
                            className={exp_date.isValid ? "": "invalid"}
                            type="exp_date"
                            labelName="MM/YY *"
                            mask="99/99"
                            maskChar={null}
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                    </div>
                    <div className="checkout_shipping_data_small_side">
                        <TextField
                            value={cvc_code.value}
                            className={cvc_code.isValid ? "": "invalid"}
                            type="cvc_code"
                            labelName="CVC code *"
                            mask="9999"
                            maskChar={null}
                            onBlur = {(type)=> this.validate(type)}
                            onInput={(value, type) => this.handleInput(value, type)}
                        />
                    </div>
                </div>
                <div className="cart_button checkout_continue_button" onClick={ this.makeOrder }>CHECKOUT</div>
                {btnDisabled &&
                    <div className="overlay">
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                }
            </div>

        )
    }
}

function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

export default CheckoutData