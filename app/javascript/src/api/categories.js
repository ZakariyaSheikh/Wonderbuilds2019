import axios from 'axios';

const mockCategories = {
    "categories": [
        {
            "name": "Test Hardcoded",
            "description": "",
            "url": "/goose.jpg"
        },
        {
            "name": "Test Hardcoded",
            "description": "",
            "url": "/chrome_dynosaur.png"
        },
        {
            "name": "Test Hardcoded",
            "description": "",
            "url": "/chrome_dynosaur.png"
        }
    ]
}
export function getCategories(object) {
    return new Promise((resolve, reject) => {
        const url = '/api/v1/categories';
        axios.get(url)
            .then(response => {
                if (response.data && response.data.categories.length) {
                    resolve(response.data.categories)
                } else {
                    resolve(mockCategories.categories)
                }

            })
            .catch(error => {
                reject(error)
            })
    })
}

export default {
    getCategories
}