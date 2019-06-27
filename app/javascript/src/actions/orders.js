import axios from 'axios';

export function createOrder(data, token, object) {
    const url = '/api/v1/orders';
    
    axios.post(url, data, { headers: { Authorization: token } })
        .then(response => {
            object.props.cleanCart();
            object.props.history.push('/order_success')
        })
        .catch(error => {
            console.error(error);
        });
}

export function getOrders(token, object) {
    const url = '/api/v1/orders';
    
    axios.get(url, { headers: { Authorization: token } })
        .then(response => {
            object.setState({ orders: response.data.orders })
        })
        .catch(error => {
            console.error(error);
        });
}