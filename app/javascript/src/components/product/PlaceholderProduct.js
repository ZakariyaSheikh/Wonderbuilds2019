import React, {Component} from 'react';
import './PlaceholderProduct.css';
import Dropdown from '../common/Dropdown/index';


class PlaceholderProduct extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="product-info">
                <div className="product-info-left">
                    <div className='product-image-left product-image-left-placeholder'>
                    </div>
                </div>
                <div className="product-info-right">
                    <div>
                        <div className="product-info-right-title product-info-placeholder"> </div>
                    </div>
                    <div>
                        <div className="product-info-right-title product-info-placeholder"> </div>
                    </div>
                    <div>
                        <div className="product-info-right-title product-info-placeholder"> </div>
                    </div>
                    <div>
                        <div className="product-info-right-title product-info-placeholder"> </div>
                    </div>
                    <div>
                        <div className="price-info">£ </div>
                        <div className="bottom-price-info disabled-card">
                            <Dropdown
                                className="price-dropdown"
                                selected="1"
                                items={[]}
                            />
                            <div className="btn-cart disabled-card" onClick={this.addToCart}>
                                <div className="btn-cart-icon"></div>
                                <div className="btn-cart-title">ADD TO CART</div>
                            </div>
                        </div>
                    </div>
                    <div className="documentation-container">
                        <div className="characteristic-bold">DOCUMENTATION</div>
                        <div className="documentation-item">
                            <div className="pdf-image"></div>
                            <div className="pdf-name">Installation Guide</div>
                        </div>
                        <div className="documentation-item">
                            <div className="pdf-image"></div>
                            <div className="pdf-name">Certification</div>
                        </div>
                        <div className="documentation-item">
                            <div className="pdf-image"></div>
                            <div className="pdf-name">Tech Sheet</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceholderProduct;