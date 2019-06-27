import React, {Component} from 'react';
import './style.css';
import CheckFilter from '../CheckFilter'


class SubSubFilter extends Component {
  state = {
    isOpen: false
  };


  handleClick = (event) => {
    this.setState({ isOpen:  !this.state.isOpen })
  };

  render() {
    const {info, title, addFilter, currentFilters, removeFilter} = this.props
    const {isOpen} = this.state;

    return (
      <div>
        <div className="sub_div main_div" onClick={ () => this.handleClick()}>
          <div className="main_title">{title}</div>
        </div>
        <div className={`${isOpen? "": "d-none"}`}>
          <ul className="sub_li">
            {
              info.map(({name})=>{
                let checked = !!currentFilters.find(item => item.name === name && item.type === title)
                let handleChange = checked ?
                () => removeFilter({name, type: title}) : () => addFilter({name, type: title})

                return (<li>
                  <CheckFilter
                  name={name}
                  handleClick={handleChange}
                  removeFilter={() => removeFilter({name, type: title})}
                  checked={checked}
                  />
                </li>)
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default SubSubFilter;


