import React, {Component} from 'react';
import {formatNumber} from "../../../helpers/format";
import './style.css'

class Product extends Component {
    static defaultProps = {
        className: ''
    }

    render () {
        const { product, className } = this.props
        return (<a href={`/products/${product.id}`} className={`product ${className}`}>
            <div className='product-image'
                 style={product.url ? {backgroundImage: `url(${product.url})`, backgroundSize: '100%'} : null}
            />
            <div className="product-desc">
                <div className="product-title">
                    {product.name}
                </div>
                <div className="product-price">
                   £ {formatNumber(product.price)}<span className = "vat" > + VAT </span>
                </div>
            </div>
        </a>)
    }
}


export class ProductPlaceholder extends Component {
    static defaultProps = {
        className: ''
    }

    render() {
        const {className} = this.props

        return <div className={`product-placeholder ${className}`}>
            <div className="product-placeholder-image" />
            <div className="product-placeholder-title" />
            <div className="product-placeholder-price" />
        </div>;
    }
}

export default Product;
