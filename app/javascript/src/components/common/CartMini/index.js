import React, { Component } from 'react'
import { connect } from "react-redux";
import onClickOutside from "react-onclickoutside";
import CartActions from '../../../actions/cart';
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import './style.css'

class CartMini extends Component {
    state = {
        isOpen: false
    }

    handleClick () {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleClickOutside = evt => {
        this.setState({isOpen: false})
    };

    render() {
        const { isOpen } = this.state;
        const { quantity, products } = this.props.cart;
        const { removeItem } = this.props;

        return (
            <div className="cart-mini">
                <div className="cart-mini-container" onClick={() => this.handleClick()}>
                    <div className="cart-mini-logo" />
                    <div className="cart-mini-count">{quantity}</div>
                </div>
                {isOpen && <div className="cart-mini-dd">
                    {products.map((product, i) => <CartProduct product={product } remove={() => removeItem(i)} />)}
                    {products.length === 0 && "No one product at the card!"}
                    {products.length > 0 &&
                    <div className="cart-mini-button-container">
                        <Link to='/cart' onClick={() => this.handleClick()}>
                            <div className="button-red">VIEW MY BAG</div>
                        </Link>
                        <Link to='/checkout' onClick={() => this.handleClick()}>
                            <div className="button-white">CHECKOUT</div>
                        </Link>
                    </div>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
   cart: state.cartReducer,
});

const mapDispatchToProps = dispatch => ({
    removeItem: (index) => dispatch(CartActions.remove(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CartMini));
