import React, {Component} from 'react';
import {getCategories} from "../../../../api/categories";
import {Link} from "react-router-dom";
import './SearchCategory.css';
import onClickOutside from "react-onclickoutside";

class SearchCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {categories: null, value: ""}
    };

    componentDidMount() {
        getCategories().then((categori) => this.setState({categories: categori}));
    }

    handleClickOutside = evt => {
        this.props.closeWindow();
    };

    liClick = (nameValue) => {
        this.props.nameValue(nameValue);
        document.getElementById("Category_" + nameValue).click();
    };

    listSelect = () => {
        const list = this.state ? this.state.categories : [];
        let result = [];

        list && list.forEach(item => {
            if (item.parent_name) {
                result.push(<li className="parent_search">{"» " + item.parent_name}</li>);
                item.arr.forEach(categori => {
                    result.push(<li onClick={() => this.liClick(categori.name)} className="categori_parent_search">
                        <Link to={{
                            pathname: '/products',
                            state: {category: {name: categori.name}}
                        }}>{"› " + categori.name}</Link>
                    </li>);
                });
            } else {
                result.push(<li onClick={() => this.liClick(item.name)} className="categori_search">
                    <Link to={{
                        pathname: '/products',
                        state: {category: {name: item.name}}
                    }}>{"› " + item.name}</Link></li>);
            }
        });
        return result;
    };

    render() {
        return (
            <div className={"select-categories-container"}>
                <ul id="select-header-categories">
                    {this.listSelect()}
                </ul>
            </div>
        );
    }
}

export default onClickOutside(SearchCategory);
