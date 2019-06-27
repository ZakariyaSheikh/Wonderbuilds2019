import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';

class Orders extends Component {
    constructor(props) {
        super(props);
        
        this.state = { orders: null };
    }
    
    componentWillMount() {
        getOrders(this.props.token, this)
    }
    
    render() {
        let content = null;
        if(this.state.orders && this.state.orders.length > 0) {
            content = <OrdersTable orders={this.state.orders}/>
        } else {
            content = <div className="orders_empty">No orders yet</div>
        }
        return (
            <div className="orders">
                <div className="orders_header">Orders History</div>
                { content }
            </div>
        );
    }
}

class OrdersTable extends Component {
    render() {
        return (
            <div>
                <div className="order_table_headers">
                    <div className="order_table_products">PRODUCTS</div>
                    <div className="order_table_date">ORDER DATE (DMY)</div>
                    <div className="order_table_address">SHIPPING ADDRESS</div>
                    <div className="order_table_total">TOTAL PRICE</div>
                    <div className="order_table_status">ORDER STATUS</div>
                </div>
                <hr className="cart_out_table_separator order_table_top_hr"/>
                {
                    this.props.orders.map((order, key) => {
                        return <Order order={order} key={key}/>
                    })
                }
            </div>
        )
    }
}

class Order extends Component {
    render() {
        let order = this.props.order;
        let shipping_info = this.props.order.shipping_info;
        let cart_products =  this.props.order.cart_products;
        
        return (
            <div className="order_table_order">
                <div className="order_table_order_content">
                    <div className="order_table_products order_table_item">
                        { cart_products.map((cart_product) => {
                            return (
                                <div>
                                    <span className="order_table_products_quantity">
                                        { parseInt(cart_product.quantity) } x </span>
                                    { cart_product.name }
                                </div>
                            )
                        }) }
                    </div>
                    <div className="order_table_date order_table_item">
                        <div>
                            { convertToDate(order.created_at) }
                        </div>
                        <div className="order_table_order_small_text">
                            { convertToTime(order.created_at) }
                        </div>
                    </div>
                    <div className="order_table_address order_table_item">
                        <div>{ shipping_info.name + " " + shipping_info.surname }</div>
                        <div className="order_table_order_small_text">{ shipping_info.address }, { shipping_info.zip }</div>
                        <div className="order_table_order_small_text">{ shipping_info.city } { shipping_info.province }</div>
                        <div className="order_table_order_small_text">{ shipping_info.country }, { shipping_info.telephone }</div>
                    </div>
                    <div className="order_table_total order_table_item">
                        <div>£{ order.total }</div>
                    </div>
                    <div className="order_table_status order_table_item">
                        <div>{ order.status }</div>
                    </div>
                </div>
                <hr className="cart_out_table_separator order_table_order_hr"/>
            </div>
        )
    }
}

function convertToDate(timestamp) {
    return timestamp.slice(8,10) + '.' + timestamp.slice(5,7) + '.' + timestamp.slice(0,4);
}

function convertToTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

const mapStateToProps = (state) => {
    return { ...state.sessionReducer }
};

export default connect(mapStateToProps)(Orders);