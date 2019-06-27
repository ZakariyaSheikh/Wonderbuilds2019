import React, {Component} from 'react'
import './style.css'
import onClickOutside from "react-onclickoutside";

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false
        }
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    handleClickOutside = evt => {
        this.setState({listOpen: false})
    };

    toggleSelected(item) {
        this.props.onChange(item);
        this.toggleList()
    }

    render() {
        const {items, selected, className} = this.props
        const {listOpen} = this.state

        return (
            <div className={`dropdown-wrapper ${className}`}>
                <div className="dropdown-header" onClick={() => this.toggleList()}>
                    <div className="dropdown-header-title">{selected}</div>
                    {listOpen ?
                        <div className="angle angle-up"></div>
                        :
                        <div className="angle angle-down"></div>
                    }
                </div>
                {
                    listOpen && <ul className="dropdown-list">
                        {
                            items && items.map((item, index) => {
                                return (
                                    <li key={index} className="dropdown-list-item" onClick={() =>this.toggleSelected(item) }>
                                        {item}</li>)
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
}

export default onClickOutside(Dropdown)
