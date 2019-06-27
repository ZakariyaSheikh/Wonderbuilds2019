import React, { Component } from "react";
import "./HeaderProducts.css";
import { Link } from "react-router-dom";

class HeaderProducts extends Component {
  renderCategories(categories) {
    return (
      <React.Fragment>
        <span>
          <Link
            to={{
              pathname: "/products",
              state: {
                categories: {
                  name: categories[1] ? categories[1].name : categories[0].name,
                  category: categories
                }
              }
            }}
          >
            {" "}
            {categories[1] ? categories[1].name : categories[0].name}
          </Link>
        </span>
        <span> / </span>
      </React.Fragment>
    );
  }

  render() {
    const { product, error } = this.props;

    return (
      <div className="product-header-conteiner">
        {error && error.message && (
          <div className="product-header-title">{error.message}</div>
        )}
        {product && product.name && (
          <div className="product-header-title">{product.name}</div>
        )}
        <div className="product-header-href">
          <Link to="/">Home</Link>
          <span> / </span>
          {product && this.renderCategories([...(product.category || []).reverse()])}
          {product && (
            <span className="product-header-name">{product.name}</span>
          )}
        </div>
      </div>
    );
  }
}

export default HeaderProducts;
