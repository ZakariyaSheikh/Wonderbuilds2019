import React, { Component } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


class Product extends Component {
    render() {
        const { product, id } = this.props;
        return (
            <div className={ id % 6 == 5 ? "product object search_in_product_list last_in_row" : "product object search_in_product_list"}>
                <Link to={'/products/' + product.id}>
                    <div className="search_product_image_wrapper">
                        <img src={product.url}/>
                    </div>
                    <div className="product_text search_in_product_list_text">
                        <div className="product_name in_product_list_name">{product.name}</div>
                        <div className="product_made in_product_list_made">{product.made_in}</div>
                        <div className="product_price in_product_list_price">{product.price}$</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Product;