import React, {Component} from 'react';
import './style.css';
import CheckFilter from '../CheckFilter';
import SubSubFilter from '../SubSubFilter';

class SubFilter extends Component {
  state = {
    isOpen: false
  }

  handleClick = (event) => {
    this.setState({isOpen: !this.state.isOpen})
  };

  render() {
    const {info, title, addFilter, currentFilters, removeFilter} = this.props
    const {isOpen} = this.state

    return (
      <div>
        <div className={`${isOpen? "div_bolder": ""} main_div`} onClick={() => this.handleClick()}>
          <span className="main_title">{title}</span>
          {isOpen ? <div className="angle_filter angle_filter_up"></div> : <div className="angle_filter angle_filter_down"></div>}
        </div>
        <div className={`content_new_filter ${isOpen ? "" : "d-none"}`}>
          <ul className="main_ul">
            {info && info.map(({name, parent_name, arr}) => {
              let checked = !!currentFilters.find(item => item.name === name && item.type === title)
              let handleChange = checked ?
                () => removeFilter({name, type: title}) : () => addFilter({name, type: title})
              return (<li className="main_li">
                {parent_name ?
                  <SubSubFilter
                    title={parent_name}
                    info={arr}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    currentFilters={currentFilters}
                  /> :
                  <CheckFilter
                    name={name}
                    handleClick={handleChange}
                    removeFilter={() => removeFilter({name, type: title})}
                    checked={checked}
                  />
                }
              </li>)
            })}
          </ul>
        </div>
      </div>);
  }
}

export default SubFilter;
