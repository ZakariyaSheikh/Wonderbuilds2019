import React, { Component } from "react";
import './style.css'

class CartProduct extends Component {
    render() {
        const { product, remove } = this.props;
        console.log('remove', remove)
        return (
            <div className="cart-product" >
                <img src={ product.product.url } className="cart-product-image"/>
                <div className="cart-product-item  cart-product-names">
                    <div className="cart-product-name">
                        { product.product.name }
                    </div>
                    <div className="cart-product-quantity">
                        QUANTITY: { product.quantity }
                    </div>
                </div>
                <div className="cart-product-item cart-product-price">
                    £{ (product.product.price * product.quantity).toFixed(3) }
                </div>
                <span className='cart-remove cart-product-remove cart-product-item' onClick={remove}>&#10060;</span>
            </div>
        )
    }
}

export default CartProduct
