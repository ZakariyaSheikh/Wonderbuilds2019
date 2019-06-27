import React, { Component } from 'react';
import './OrderSuccess.css'

class OrderSuccess extends Component {
	render() {
		return (
			<div className="registration_success_content">
				<div className="registration_success_header in_order_success_header">
					Thank you for your order!
				</div>
				<div className="cart_button cart_checkout_button in_order_success_button" onClick={ () => this.props.history.push('/') }>GO HOME!</div>
			</div>
		);
	}
}

export default OrderSuccess;