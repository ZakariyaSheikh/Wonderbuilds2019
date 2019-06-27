import React, {Component} from 'react';
import './style.css';
import  Filter from "../Filter"


class ActiveFilters extends Component {

  render() {
    const {currentFilters, removeFilter, removePrice} = this.props

    return (
      <div className="active-filter-container">
        {currentFilters && currentFilters.map((item, i) => (
            <Filter
              key = {i}
              info={item}
              remove={item.type === "prices" ? removePrice :removeFilter}
            />
          ))}
      </div>);
  }
}

export default ActiveFilters