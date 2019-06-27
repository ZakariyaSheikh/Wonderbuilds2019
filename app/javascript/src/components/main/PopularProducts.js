import React, { Component } from 'react';
import './PopularProducts.css';
import { getPopularProducts } from "../../api/products";
import Product, {ProductPlaceholder} from "../common/Product";
import Error from "../common/Error";

class PopularProducts extends Component {
    state = {
        loading: true,
        products: [],
        error: null
    };

    componentDidMount() {
        getPopularProducts().then(products => {
            this.setState({products, error: null, loading: false})
        }).catch(error => {
            this.setState({error, products: [], loading: false})
        })
    }

    renderPlaceholder () {
        return (<React.Fragment>
            {[1,1,1,1,1,1,1,1,1].map((item, i) => (<ProductPlaceholder key = {i}/>))}
        </React.Fragment>)
    }

    render() {
        const {loading, products, error} = this.state;
        return (
            <div className="popular-container">
                {loading && this.renderPlaceholder()}
                {error && <Error error={error} />}
                {!loading && !error && products.map((product, i) => <Product product={product} key = {i}/>) }
                {!loading && !error && products.length === 0 &&
                    <div>
                        No results found for your request.
                    </div>}
            </div>
        );
    }
}

export default PopularProducts;
