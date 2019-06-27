import React, { Component } from 'react';
import './style.css'

class OrderError extends Component {
    render() {
        return (
            <div className="registration_success_content">
                <div className="registration_success_header in_order_success_header">
                    Something went wrong.
                    Please, try later!
                </div>
                <div className="cart_button cart_checkout_button in_order_success_button error_btn" onClick={ () => this.props.history.push('/checkout') }>GO TO CHECKOUT!</div>
            </div>
        );
    }
}

export default OrderError;