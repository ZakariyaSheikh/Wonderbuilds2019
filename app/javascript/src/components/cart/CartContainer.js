/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import CartProduct from './CartProduct';
import './CartContainer.css';
import cartActions from '../../actions/cart';


class CartContainer extends Component {
  componentDidMount() {
    this.props.setTotal(this.props.products);
    this.props.setQuantity(this.props.products);
  }

  componentWillReceiveProps(nextProps) {
    this.props.setTotal(nextProps.products);
    this.props.setQuantity(nextProps.products);
  }

  render() {
    const {size} = this.props;
    const total = this.props.total ? this.props.total : 0;
    const VATCoeff = 0.2;
    const VATSize = (total * VATCoeff).toFixed(3);
    const totalWithVAT = (+total + (+VATSize)).toFixed(3);

    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <div className={`cart_products_block ${size}`}>
          <div className="cart_header">Shopping cart</div>
          <div className="cart_products_table">
            <div className="cart_table_header">
            <span className="cart_table_header_product cart_header_item">
              PRODUCT
            </span>
              <span className="cart_table_header_price cart_header_item">
              PRICE
            </span>
              <span className="cart_table_header_quantity cart_header_item">
              QUANTITY
            </span>
              <span className="cart_table_header_price cart_header_item">
              TOTAL
            </span>
            </div>
            <hr className="cart_out_table_separator separator_top cart_default_margin"/>
            {this.props.products &&
            this.props.products.map((productContainer, index) => {
              return (
                  <CartProduct
                      productContainer={productContainer}
                      index={index}
                      size={size}
                      {...this.props}
                  />
              );
            })}
            <hr className="cart_out_table_separator cart_default_margin"/>
            <div className={`cart_total cart_default_margin ${size}VAT`}>
              <span className="VATContainer">
              Total Net: £{parseFloat(total.toFixed(3))}
              </span>
              <span className="VATContainer">
              VAT: £{parseFloat(VATSize)}
            </span>
              Total: £
              {parseFloat(totalWithVAT)}
            </div>
            <div className="cart_buttons_block cart_default_margin">
              <div
                  className="cart_button cart_back_to_shop_button"
                  onClick={this.props.history.goBack}
              >
                BACK TO SHOP
              </div>
              <Link to="/checkout">
                <div className="cart_button cart_checkout_button">CHECKOUT</div>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.cartReducer};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...cartActions}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CartContainer);
