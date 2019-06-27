import React, { Component } from 'react';
import './Search.css';
import { searchProducts } from '../../actions/products';
import Product from './Product';


class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = { searchProducts: [] }
    }
    
    componentWillMount() {
        searchProducts(this.props.match.params.value, this);
    }
    
    render() {
        return (
            <div className="products_page search_page">
                <div className="products_page_header search_products_page_header">{ "Search results for '" + this.props.match.params.value + "'" }</div>
                {
                    this.state.searchProducts ? this.state.searchProducts.map((product, id) => {
                        return (
                            <Product
                                product={ product }
                                id={ id }
                            />
                        )
                    }) : null
                }
            </div>
        );
    }
}

export default Search;