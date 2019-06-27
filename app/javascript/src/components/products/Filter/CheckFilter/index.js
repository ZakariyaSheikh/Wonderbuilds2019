import React, {Component} from 'react';
import './style.css';


class CheckFilter extends Component {

  render() {
    const {name, handleClick, checked} = this.props

    return (
      <div className="styled-input-container styled-input--square">
          <div className="styled-input-single" onClick={handleClick}>
            <input type="checkbox"
                   checked={checked}/>
            <label for="checkbox2-example-one">{name}</label>
          </div>
        </div>
    );
  }
}

export default CheckFilter;
