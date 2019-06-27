import React, {Component} from 'react';
import './style.css';
import {getPopularProducts, getFilteredProducts} from "../../../../api/products";
import Product, {ProductPlaceholder} from "../../../common/Product";


class ProductsContainer extends Component {
  state = {
    loading: true,
    products: [],
    error: false
  };

  componentDidMount() {
    getPopularProducts()
      .then(products => {
        this.setState({products, error: null, loading: false})
      })
      .catch(error => {
        this.setState({error, products: [], loading: false})
      })
  }


  // componentWillReceiveProps(nextProps, nextContext) {
  //   if(this.props) {
  //     getFilteredProducts(this.props.currentFilters).then(products => {
  //       this.setState({products, error: null, loading: false})
  //     }).catch(error => {
  //       this.setState({error, products: [], loading: false})
  //     });
  //   }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) { //fixe price issues
    if (JSON.stringify(prevProps.currentFilters) !== JSON.stringify(this.props.currentFilters)) {
      getFilteredProducts(this.props.currentFilters).then(products => {
        this.setState({products, error: null, loading: false})
      }).catch(error => {
        this.setState({error, products: [], loading: false})
      });
    }
  }

  renderPlaceholder() {
    return (<React.Fragment>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (<ProductPlaceholder/>))}
    </React.Fragment>)
  }


  render() {
    const {loading, products, error} = this.state;
    return (
      <div className="product-list-container">
        {loading && this.renderPlaceholder()}
        {!loading && !error && products.map(product => <Product product={product}/>)}
      </div>
    );
  }
}

export default ProductsContainer;