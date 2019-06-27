import React, { Component } from 'react';
import 'react-input-range/lib/css/index.css';
import './style.css';
import SubFilter from '../SubFilter';
import RangeFilter from '../RangeFilter';


class Filters extends Component {
  render() {
    const {
      filtersTree, addFilter, removeFilter, currentFilters, filterPrice, setPrice,
    } = this.props;

    const prices = currentFilters.find(item => item.type === 'prices');
    return (
      <div className="content_new_filter">
        <ul className="main_ul">
          {filtersTree && Object.keys(filtersTree).map(key => (
            <li className="main_li">
              {key !== 'prices' ? (
                <SubFilter
                  info={filtersTree[key]}
                  title={key}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                  currentFilters={currentFilters}
                />
              )
                : currentFilters.find(item => item.type === 'prices') ? (
                  <RangeFilter
                    info={filtersTree[key]}
                    title={key}
                    filterPrice={filterPrice}
                    setPrice={setPrice}
                    currentFilters={prices}
                  />
                ) : null
                    }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Filters;
