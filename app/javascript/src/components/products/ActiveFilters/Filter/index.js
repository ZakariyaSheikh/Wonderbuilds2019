import React, { Component } from 'react';
import './style.css';


class Filter extends Component {
  render() {
    const { info, remove } = this.props;

    return (
      <div className={`filter-active ${info.disabled ? 'd-none' : ''}`}>
        <div className="filter_active_title">{info.name ? info.name : `£${info.min} - £${info.max}`}</div>
        <span className="filter_active_remove" onClick={() => remove(info)}>x</span>
      </div>
    );
  }
}

export default Filter;
