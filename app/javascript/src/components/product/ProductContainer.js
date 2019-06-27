import React, { Component } from 'react';
import Product from "./Product";
import RelatedProducts from "./RelatedProducts";
import HeaderProducts from "./HeaderProducts";
import PlaceholderProduct from "./PlaceholderProduct"
import SideBar from '../main/SideBar.js'
import { bindActionCreators } from 'redux';
import cartActions from '../../actions/cart';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import {getProduct} from "../../api/products";


class ProductContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            error: null,
            product: null,
        }
    }

    componentDidMount() {
        const id =  this.props.match.params.id
        getProduct(id).then((product)=> {
            this.setState({product: product, loading: false})
        }).catch((error)=> {
            this.setState({error: error})
        })
    }

    componentWillReceiveProps(newProps) {
        if(this.props.match.params.id != newProps.match.params.id) {
            this.props.history.go(0);
        }
    }
    
    render(){
        const {product, error, loading} = this.state

        return (
            <div>
                <div className="product-header">
                    <HeaderProducts
                        product={product}
                        error={error}
                    />
                </div>
                <div className="main-container">
                    <div className="main-container-left">
                        <SideBar
                            openCategories={{category: product ? product.category : null}}
                        />
                    </div>
                    {product ?
                        <div className="main-container-right">
                            <Product
                                { ...this.props }
                                product={product}
                                loading={loading}
                            />
                            <RelatedProducts { ...this.props } />
                        </div>
                        :
                        <div className="main-container-right">
                            <PlaceholderProduct />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.cartReducer }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addProduct: cartActions.addProduct, setQuantity: cartActions.setQuantity }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
