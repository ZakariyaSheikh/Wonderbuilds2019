import React, {Component} from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import wanderbuildsLogo from '../../images/header/wanderbuilds_logo.png';
import cardNew from '../../images/header/card_new.png';
import cartActions from '../../actions/cart';
import sessionActions from '../../actions/users';
import {bindActionCreators} from 'redux';
import {searchProducts} from '../../actions/products';
import SearchInput from '../common/SearchInput'
import CartMini from "../common/CartMini";
import SearchCategory from "./components/searchCategory/SearchCategory";

const Navigation = () => {
  return (
    <div className="header-main-navbar">
      <Link to='/about_us'>ABOUT US</Link>
      <Link to='/faq'>FAQ</Link>
      <Link to='/contact_us' className="navigation_link like_link">CONTACT US</Link>
    </div>
  );
};

class LoggedMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {cartVisible: false, searchVisible: false, userMenuVisible: false};
  }

  toggleHeaderCart = () => {
    this.setState({cartVisible: !this.state.cartVisible})
  };

  toggleHeaderSearch = () => {
    this.setState({searchVisible: !this.state.searchVisible})
  };

  toggleUserMenu = () => {
    this.setState({userMenuVisible: !this.state.userMenuVisible})
  };
  handleClickOutside = evt => {
    this.setState({isOpen: false})
  };

  render() {
    return (
      <div className="header-main-cart">
        <div className="header-main-cart-pick" onClick={this.toggleHeaderCart}>
          <img src={cardNew} alt="cart"/>
          <div className="header-main-cart-pick-quantity">
            {this.props.quantity || 0}
          </div>
        </div>
        <HeaderCart visible={this.state.cartVisible} parent={this} {...this.props}/>
      </div>
    )
  }
}

class HeaderCart extends Component {
  constructor(props) {
    super(props);

    this.state = {visible: this.props.visible};
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    console.log("i rendered during did mount action");

    const script = document.createElement("script");

    script.src = "script.js";
    script.async = true;

    document.body.appendChild(script);

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.cartVisible) {
      this.props.parent.setState({cartVisible: false})
      this.setState({visible: false})
    }
  }

  closeWindow() {
    this.props.parent.setState({cartVisible: false})
    this.setState({visible: false})
  }

  render() {
    console.log("logging right after render");

    return (
      <div className={this.state.visible ? "cart_in_header" : "cart_in_header hidden"} ref={this.setWrapperRef}>
        <div className="cart_in_header_products">
          {this.props.products && this.props.products.length > 0 ?
            this.props.products.map((product, index) => (
              <HeaderCartProduct productContainer={product} index={index} {...this.props}/>
            )) : "No one product at the card!"
          }

        </div>
        {this.props.products && this.props.products.length > 0 &&
        <div>
          <Link to='/cart' onClick={this.closeWindow}>
            <div className="cart_back_to_shop_button cart_in_header_button">VIEW MY BAG</div>
          </Link>
          <Link to='/checkout' onClick={this.closeWindow}>
            <div className="cart_checkout_button cart_in_header_button">CHECKOUT</div>
          </Link>
        </div>
        }
      </div>
    )
  }
}

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {visible: this.props.visible};
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.parent.setState({userMenuVisible: false});
      this.setState({visible: false})
    }
  }

  closeWindow() {
    this.props.parent.setState({userMenuVisible: false});
    this.setState({visible: false})
  }

  logout = () => {
    this.props.logout(this.props.token);
    this.closeWindow();
  };

  render() {
    let menu = null;

    if (this.props.currentUser) {
      menu =
        <div className={this.state.visible ? "user_menu_in_header" : "user_menu_in_header hidden"}
             ref={this.setWrapperRef}>
          <Link to='/orders' onClick={this.closeWindow} className="user_menu_element">
            Orders history
          </Link>
          <div className="user_menu_element" onClick={this.logout}>
            Log out
          </div>
        </div>
    } else {
      menu =
        <div className={this.state.visible ? "user_menu_in_header" : "user_menu_in_header hidden"}
             ref={this.setWrapperRef}>
          <Link to='/login' onClick={this.closeWindow} className="user_menu_element">
            Sign in
          </Link>
          <Link to='/registration' onClick={this.closeWindow} className="user_menu_element">
            Sign up
          </Link>
        </div>
    }

    return (
      <div>
        {menu}
      </div>
    )
  }
}

class HeaderSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {visible: this.props.visible};
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.parent.setState({searchVisible: false})
      this.setState({visible: false})
    }
  }

  closeWindow() {
    this.props.parent.setState({searchVisible: false})
    this.setState({visible: false})
  }

  doFilter = (event) => {
    this.setState({value: event.target.value});

    setTimeout((value, obj) => {
      if (obj.state.value === value) {
        searchProducts(value, obj, 4);
      }
    }, 500, event.target.value, this)
  };

  render() {
    return (
      <div className={this.state.visible ? "search_in_header" : "search_in_header hidden"} ref={this.setWrapperRef}>
        <div className="search_input_wrapper">
          <input className="search_input" value={this.state.value} onChange={this.doFilter}/>
          <Link className="search_input_button" to={"/search/" + this.state.value} onClick={this.closeWindow}/>
          {
            this.state.searchProducts ?
              this.state.searchProducts.map((product) => {
                return <Link to={'/products/' + product.id} onClick={this.closeWindow}>
                  <HeaderSearchProduct product={product}/>
                </Link>
              }) : null
          }
        </div>
      </div>
    )
  }
}

class HeaderSearchProduct extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {product, visible} = this.props;

    return (
      <div className="cart_in_header_product">
        <img src={product.url} className=" cart_in_header_product_image"/>
        <div className="cart_in_header_item  search_in_header_product_names">
          <div className="cart_in_header_product_name">
            {product.name}
          </div>
        </div>
        <div className="cart_in_header_item cart_in_header_product_price">
          ${product.price}
        </div>
      </div>
    )
  }
}


class HeaderCartProduct extends Component {
  constructor(props) {
    super(props)
  }

  remove = () => {
    this.props.remove(this.props.index);
  };

  render() {
    const {productContainer, visible} = this.props;

    return (
      <div className="cart_in_header_product">
        <img src={productContainer.product.url} className=" cart_in_header_product_image"/>
        <div className="cart_in_header_item  cart_in_header_product_names">
          <div className="cart_in_header_product_name">
            {productContainer.product.name}
          </div>
          <div className="cart_in_header_product_quantity">
            QUANTITY: {productContainer.quantity}
          </div>
        </div>
        <div className="cart_in_header_item cart_in_header_product_price">
          £{productContainer.product.price * productContainer.quantity}
        </div>
        <span className='cart_product_remove cart_in_header_remove cart_in_header_item'
              onClick={this.remove}>&#10060;</span>
      </div>
    )
  }
}

class Top extends Component {
  constructor(props) {
    super(props);

    this.state = {categories: null, isOpen: false, value: "", handleCloses: false}
  };

  handleClick = (event) => {
    this.state.handleCloses ? this.setState({handleCloses: false}) : this.setState({isOpen: true});
  };

  handleClosesWindow = () => {
    this.setState({isOpen: false, handleCloses: true});
  };

  returnLabel = (name) => {
    this.setState({value: name, isOpen: false});
  };

  render() {
    return (
      <div className="header-top">
        <div className="header-top-container">
          <div>Call us: +35 94756408 | Email: SuppliersHub@gmail.com</div>
          <div className="header-top-container-inputs-container">
            <div className="header-top-container-select-category">
              <div onClick={this.handleClick}
                   className="select-categories">{this.state.value || "Select Category"}</div>
              {this.state.isOpen &&
              <SearchCategory nameValue={this.returnLabel} closeWindow={this.handleClosesWindow}/>}
            </div>
            <SearchInput/>
          </div>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Top/>
        <div className="header-main">
          <div className="header-main-logo">
            <Link to='/'>
              <img src={wanderbuildsLogo} alt='logo'/>
            </Link>
          </div>
          <Navigation/>
          <CartMini/>
          {/*<LoggedMenu {...this.props}/>*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.cartReducer, ...state.sessionReducer}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({remove: cartActions.remove, logout: sessionActions.signOut}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
