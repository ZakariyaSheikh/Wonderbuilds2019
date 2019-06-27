import React, { Component } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


class Product extends Component {
    render() {
        const { product, id } = this.props;
        return (
            <div className={ id % 4 == 3 ? "product object in_product_list last_in_row" : "product object in_product_list"}>
                <Link to={'/products/' + product.id}>
                    <div className="product_img_container">
                        <img src={product.url}/>
                    </div>
                    <div className="product_text in_product_list_text">
                        <div className="product_name in_product_list_name">{product.name}</div>
                        <div className="product_made in_product_list_made">{product.made_in}</div>
                        <div className="product_price in_product_list_price">£{product.price}</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Product;