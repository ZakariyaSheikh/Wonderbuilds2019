import React, { Component } from 'react';
import './RelatedProducts.css'
import { getRelatedProducts } from "../../api/products";
import Product from "../common/Product";



class RelatedProducts extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            relatedProducts: [],
            error: null,
        }
    }
    
    componentWillMount() {
        getRelatedProducts(this.props.match.params.id).then((products)=>{
            this.setState({relatedProducts: products})
        }).catch((error)=>{
            this.setState({error: error.message})
        })
    }
    
    render() {
        const { relatedProducts } = this.state
        return (
            <div className="related-container">
                { relatedProducts && relatedProducts.length > 0 &&
                    <div>
                        <div className="main-container-title">RELATED Products</div>
                        <div className="popular-container related-product-container">
                            {relatedProducts.map(product => <Product product={product}/>)}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default RelatedProducts;