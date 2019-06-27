import React, {Component} from 'react';
import './Product.css';
import Dropdown from '../common/Dropdown/index';
import getFileName from "../../helpers/getFileName";

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: 1,
            available: true,
            range: [],
        }
    }

    componentDidMount() {
        let product = this.props.product
        let productInStore = this.props.products && this.props.products.find(obj => obj.product && (obj.product.id == product.id))

        if (product.quantity <= 0) {
            this.setState({available: false});
        } else {
            let cardQuantity = productInStore ? productInStore.quantity : 0
            this.setState({
                range: range(product.quantity, 1)
            })
        }
    }

    componentWillReceiveProps(props) {
        let product = this.props.product
        let quantity = props.products && props.products.length > 0 &&
            props.products.filter(obj => obj.product.id === product.id)[0].quantity;

            let cardQuantity = quantity || 0
            this.setState({number: 1, range: range(product.quantity, 1), available: true});

        this.props.setQuantity(props.products);
    }

    addToCart = () => {
        if (this.state.available) {
            this.props.addProduct(this.props.product, this.state.number, this.props.products);
        }
    };

    render() {
        const {product, loading} = this.props;
        const {range, number, available} = this.state;
        const {attachments} = product;

        return (
            <div className="product-info">
                <div className="product-info-left">
                    <div className='product-image-left'
                         style={{
                             backgroundImage: `url(${product.url})`,
                             backgroundSize: '100%'
                         }}>
                    </div>
                    <div className="characteristics-info-left">
                        {
                            product.characteristics && product.characteristics.map(function (characteristic, index) {
                                return (
                                    <div id={index} className="characteristic">
                                        <span id={index + "title"}
                                              className="characteristic-bold">{characteristic.name}: </span>
                                        {characteristic.value}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="product-info-right">
                    <div>
                        <span className="product-info-right-title">{product.name}</span>
                    </div>
                    <div>
                        <span>{product.description}</span>
                    </div>
                    <div>
                        <span className="characteristic-bold">Delivery time: </span>{product.delivery_time}
                    </div>
                    <div>
                        <span className="characteristic-bold">Minimum order quantity: </span>{product.minimal_order}
                    </div>
                    <div>
                        <div className="price-info">£{product.price} <span className="vatProd"> + VAT</span></div>
                        <div className="bottom-price-info">
                            <Dropdown
                                className={`price-dropdown ${!available ? 'disabled-card' : ''}`}
                                selected={number}
                                items={range}
                                onChange={(number) => this.setState({number})}
                            />
                            <div className={`btn-cart ${!available ? 'disabled-card' : ''}`} onClick={this.addToCart}>
                                <div className="btn-cart-icon"></div>
                                <div className="btn-cart-title">ADD TO CART</div>
                            </div>
                        </div>
                    </div>
                    <div className="documentation-container">
                        <div className="characteristic-bold">DOCUMENTATION</div>
                        {attachments.map((item, index) => (
                            <a className="documentation-item" key={index} href={item.url} target="_blank">
                                <div className="pdf-image"/>
                                <div className="pdf-name">{getFileName(item.url)}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const range = (size = 1, startAt) => {
    return [...Array(size).keys()].map(i => i + startAt);
};

export default Product;