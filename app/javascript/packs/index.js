import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import "../src/index.css";
import Main from "../src/components/main/Main";
import AboutUs from "../src/components/aboutUs/AboutUs";
import FAQ from "../src/components/faq/FAQ";
import Terms from "../src/components/terms/Terms";
import ContactUs from "../src/components/contactUs/ContactUs";
import registerServiceWorker from "../src/registerServiceWorker";
import store from "../src/store/state";
import { Provider } from "react-redux";
import { Router, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import DefaultLayout from "../src/components/layout/Layout";
import Products from "../src/components/products/Products";
import ProductContainer from "../src/components/product/ProductContainer";
import CartContainer from "../src/components/cart/CartContainer";
import SignUp from "../src/components/signUp/SignUp";
import SignIn from "../src/components/signIn/SignIn";
import ForgotPassword from "../src/components/forgotPassword/ForgotPassword";
import ChangePassword from "../src/components/changePassword/ChangePassword";
import RegistrationSuccess from "../src/components/registrationSuccess/RegistrationSuccess";
import Confirmation from "../src/components/confirmation/Confirmation";
import CheckoutContainer from "../src/components/checkout/CheckoutContainer";
import OrderSuccess from "../src/components/orderSuccess/OrderSuccess";
import OrderError from "../src/components/orderError";
import Search from "../src/components/search/Search";
import Orders from "../src/components/orders/Orders";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo);

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={Main} />
        <DefaultLayout path="/about_us" component={AboutUs} />
        <DefaultLayout path="/faq" component={FAQ} />
        <DefaultLayout path="/terms" component={Terms} />
        <DefaultLayout
          path="/registration_success"
          component={RegistrationSuccess}
        />
        <DefaultLayout path="/order_success" component={OrderSuccess} />
        <DefaultLayout path="/orders" component={Orders} />
        <DefaultLayout path="/confirmation/:id" component={Confirmation} />
        <DefaultLayout path="/contact_us" component={ContactUs} />
        <DefaultLayout path="/checkout" component={CheckoutContainer} />
        <DefaultLayout path="/registration" component={SignUp} />
        <DefaultLayout path="/forgot_password" component={ForgotPassword} />
        <DefaultLayout path="/change_password" component={ChangePassword} />
        <DefaultLayout path="/login" component={SignIn} />
        <DefaultLayout path="/products/:id" component={ProductContainer} />
        <DefaultLayout
          path="/products"
          component={props => {
            return props.location.state ? (
              <Products {...props} />
            ) : (
              <Redirect to="/" {...props} />
            );
          }}
        />
        <DefaultLayout path="/cart" component={CartContainer} />
        <DefaultLayout path="/search/:value" component={Search} />
        <DefaultLayout path="/order_error" component={OrderError} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
