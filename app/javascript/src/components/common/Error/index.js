import React, {Component} from 'react'
import './style.css'

class Error extends Component {
    defaultProps = {
        error: 'Something went wrong',
        className: ''
    }

    render () {
        const {error, className} = this.props;
        const message = error.message ? error.message : error;
        return (
        <div className='error-component'>
            {message}
        </div>)
    }
}

export default Error
