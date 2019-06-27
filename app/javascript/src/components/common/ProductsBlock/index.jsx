import React, {Component} from 'react';
import './style.css'
import Product, {ProductPlaceholder} from "../../../components/common/Product";

class ProductsBlock extends Component {

    renderPlaceholder = () => {
        return (<React.Fragment>
            {Array.from( Array(9)).map(() => (<ProductPlaceholder/>))}
        </React.Fragment>)
    };

    render() {
        return (<div className='products_list_content'>
            {
                this.props.products ? this.props.products.map((product, id) => {
                    return (
                        <Product
                            product={product}
                            id={id}
                        />
                    )
                }) : this.renderPlaceholder()
            }
        </div>)
    }
}

export default ProductsBlock;
