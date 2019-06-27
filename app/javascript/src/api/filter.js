import axios from 'axios';

export function getFilters(param) {
    return new Promise((resolve, reject) => {
        const url = '/api/v1/filters';
        const categories = param ? [param.category.name] : []

        let categoryToFilter = [];
        if(categories) {
            categories.forEach((category) => {
                categoryToFilter.push({ 'Category': category })
            });
        }
        //
        axios.get(url, categories)
            .then(response => {
                resolve(response.data.filters)
            })
            .catch(error => {
                reject(error)

            });
    })
}
