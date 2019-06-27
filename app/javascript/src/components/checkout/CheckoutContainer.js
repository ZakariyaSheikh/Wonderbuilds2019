import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import usersActions from '../../actions/users';
import cartActions from '../../actions/cart';
import CheckoutData from "./CheckoutData";
import CartContainer from '../cart/CartContainer';
import CheckoutLogin from "./CheckoutLogin";
import CheckoutSignUp from "./CheckoutSignUp";
import './CheckoutContainer.css';
import ToastMessage from '../toastMessage';


class CheckoutContainer extends Component {
  constructor(props) {
    super(props)
  }

  shouldShowNotification() {
    return this.props.products.some((p) => {
      return (p.product.warning_amount && p.quantity >= p.product.warning_amount);
    })
  }

  message =  "Order can be delivered by parts due to the large amount of items";

  render() {
    return (
        <div className="checkout_container_main">
          {this.props.currentUser ?
                <div className="checkout_container">
                  <ToastMessage isVisible={this.shouldShowNotification()} message={this.message}/>
                  <CheckoutData {...this.props}/>
                  <CartContainer size="small" {...this.props}/>
                </div>
              :
              <div className="checkout_container">
                <CheckoutLogin {...this.props}/>
                <CheckoutSignUp {...this.props}/>
              </div>
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.sessionReducer, ...state.cartReducer}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signIn: usersActions.signIn, ...cartActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
