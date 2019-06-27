import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import { searchProduct } from "../../../api/products";
import {formatNumber} from "../../../helpers/format";
import './style.css'

class SearchInput extends Component {
    state = {
        isOpen: false,
        products: [],
        value: ''
    }

    handleChangeValue (value) {
        window.clearTimeout();

        this.setState({value});

        setTimeout(() => {
            if (value === this.state.value) {
                searchProduct(value).then((products) => {
                    this.setState({products});
                })
            }
        }, 2000)
    }

    handleFocus () {
        this.setState({isOpen: true})
    }

    handleClickOutside = evt => {
        // ..handling code goes here...
        this.setState({isOpen: false})
    };

    renderProduct (products) {
        return (<React.Fragment>
            {products.length == 0 && "Not found!"}
            {products.map(product => (
                <a className="product-result" href={`/products/${product.id}`}>
                    <div className='product-result-image'
                         style={product.url ? {backgroundImage: `url(${product.url})`, backgroundSize: '100%'} : null}
                    />
                    <div className="product-result-title">
                        {product.name}
                    </div>
                    <div className="product-result-price">
                        £ {formatNumber(product.price)}
                    </div>
                </a>
            ))}
        </React.Fragment>)
    }

    render () {
        const { value, isOpen, products } = this.state;

        return (<div className="search-input">
            <input
                placeholder="Search" type="text" value={value}
                onChange={(e) => this.handleChangeValue(e.target.value)}
                onClick={(e) => this.handleClick(e)}
                onFocus={() => this.handleFocus()}
            />
            <span className="search-input-icon" />
            {isOpen && <div className="search-input-result">
                {this.renderProduct(products)}
            </div>}
        </div>)
    }
}

export default onClickOutside(SearchInput)