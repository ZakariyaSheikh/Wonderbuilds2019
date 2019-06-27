import React, { Component } from "react";
import "./Products.css";
import { ProductPlaceholder } from "../common/Product";
import Product from "../common/Product";
import SideBar from "../main/SideBar";
import { getProductsByCateogory } from "../../api/products";

class Products extends Component {
  state = {
    currentFilters: [],
    products: [],
    error: false,
    loading: true
  };

  componentDidMount() {
    getProductsByCateogory(this.props.location.state.categories.name)
      .then(products => {
        console.log(products);
        this.setState({
          products: products,
          loading: false
        });
      })
      .catch(error => console.log(error));
  } 

  componentDidUpdate(prevProps) {
    if (prevProps.location.state.categories.name !== this.props.location.state.categories.name) {
      this.setState({...this.state, loading: true})
      getProductsByCateogory(this.props.location.state.categories.name).then(
        products => {
          console.log(products);
          this.setState({
            products: products,
            loading: false
          });
        }
      );
    }
  }

  renderPlaceholder() {
    return (
      <React.Fragment>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
          <ProductPlaceholder key = {i}/>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { loading, products, error, category } = this.state;
    return (
      <div className="main-container filter-main">
        <div className="filter_product_content">
          <div className="new_filters_side">
            <SideBar 
              openCategories = {{category: this.props.location.state.categories.category}}
            />
          </div>
          <div className="new_products_side">
            <div className="product-list-container">
              {loading && this.renderPlaceholder()}
              {!loading && !error && products.map(product => <Product product={product} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
