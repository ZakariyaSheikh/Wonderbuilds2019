import axios from 'axios';

export function getCategories(object) {
    const url = '/api/v1/categories';
    
    axios.get(url)
        .then(response => {
            object.setState({ categories: response.data.categories });
        })
        .catch(error => {
            console.error(error);
            return(error)
        });
}

