import React, { Component } from 'react';
import './CartProduct.css';

class CartProduct extends Component {
    constructor(props) {
        super(props)
    }

    decrement = () => {
        const { index, productContainer } = this.props;

        if(productContainer.quantity > 1) {
            this.props.decrement(index)
        } else {
            this.props.remove(index)
        }
    };

    increment = () => {
        const { index, productContainer } = this.props;
            this.props.increment(index)
    };

    remove = () => {
      this.props.remove(this.props.index);
    };

    render() {
        const { product, quantity } = this.props.productContainer;
        const { size } = this.props;

        return (
            <div>
                {
                    this.props.index != 0 ? <hr className="cart_in_table_separator"/> : null
                }
                <div className="cart-product-container">
                    <div className="main-info">
                        <img className="cart_product_image" src={ product.url }/>
                        <div className={ product.made_in ?
                            "main-info-title cart_product_has_made" :
                            "main-info-title"}>
                            <div className="cart-product-item">{ product.name }</div>
                            <div className="cart-product-item">{ product.made_in }</div>
                        </div>
                    </div>
                    <div className="cart_product_price cart-product-item cart_product_price_one">£{ parseFloat((+product.price).toFixed(3)) }</div>
                    <div className="cart_product_quantity cart-product-item">
                        <span className="quantity_minus" onClick={this.decrement}> ‒ </span>
                        <span className="quantity_number">{ quantity }</span>
                        <span className="quantity_plus" onClick={this.increment}> + </span>
                    </div>
                    <div className="cart_product_price cart-product-item">£{ parseFloat((product.price * quantity).toFixed(3)) }</div>
                    <span className='cart_product_remove cart-product-item' onClick={ this.remove }>&#10060;</span>
                </div>
            </div>
        )
    }
}

export default CartProduct;
