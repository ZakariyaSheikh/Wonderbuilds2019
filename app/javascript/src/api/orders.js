import axios from 'axios';

export function createOrder(data, token) {
    const url = '/api/v1/orders';
    return new Promise((resolve, reject) => {
        axios.post(url, data, { headers: { Authorization: token } })
            .then(response => {
                resolve("sucsses")
            })
            .catch(error => {
                reject(error);
            });
    })
}