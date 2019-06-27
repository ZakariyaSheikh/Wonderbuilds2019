import axios from 'axios';

export function sendContactUs(data, object) {
    const url = '/api/v1/contact_us';
    
    axios.post(url, data)
        .then(response => {
            object.setState({ modalIsOpen: true });
        })
        .catch(error => {
            console.error(error);
            return(error)
        });
}

