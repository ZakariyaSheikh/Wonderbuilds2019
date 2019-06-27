import React, {Component} from "react";
import "./SideBar.css";
import {Link} from "react-router-dom";
import {getCategories} from "../../api/categories";
import Menu, {SubMenu, Item as MenuItem} from "rc-menu";

import "rc-menu/assets/index.css";

class SideBar extends Component {
  state = {
    categories: [],
    error: null,
    loading: true,
    openKeys: ["1"],
    currentProduct: null
  };

  componentDidMount() {
    getCategories()
        .then(categories => {
          this.setState({categories: categories, error: null, loading: false});
        })
        .catch(error => {
          this.setState({categories: [], error: error, loading: false});
        });
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (newProps.openCategories) {
      let keys = ["1"];
      let categories = newProps.openCategories.category;
      if (categories.length > 1) {
        keys.push("p" + categories[0].id);
        keys.push("c" + categories[1].id);
      } else {
        keys.push("c" + categories[0].id);
      }
      this.setState({currentProduct: keys[keys.length - 1], openKeys: keys});
    }
  }

  onOpenChange = openKeys => {
    this.setState({
      openKeys
    });
  };

  renderCategories(categories) {
    const {openCategories} = this.props;
    const {currentProduct} = this.state;

    return categories.map((category, index) => {
      if (category.parent_name) {
        return (
            <SubMenu
                key={`p${category.parent_id}`}
                title={"» " + category.parent_name.toUpperCase()}
                className="parent-test"
            >
              {category.arr.map((item, i) => {
                return (
                    <MenuItem
                        key={`c${item.id}`}
                        className={`child_li ${
                            "c" + item.id == currentProduct ? "red" : ""
                            }`}
                    >
                      <Link
                          to={{
                            pathname: "/products",
                            state: {
                              categories: {
                                name: item.name,
                                category: [
                                  {
                                    name: category.parent_name,
                                    id: category.parent_id
                                  },
                                  {name: item.name, id: item.id}
                                ]
                              }
                            }
                          }}
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                );
              })}
            </SubMenu>
        );
      } else {
        return (
            <MenuItem
                key={`c${category.id}`}
                className={"c" + category.id == currentProduct ? "red" : ""}
            >
              <Link
                  key={"1-" + index}
                  to={{
                    pathname: "/products",
                    state: {
                      categories: {
                        name: category.name,
                        category: [
                          {
                            name: category.name,
                            id: category.id
                          }
                        ]
                      }
                    }
                  }}
              >
                {category.name}
              </Link>
            </MenuItem>
        );
      }
    });
  }

  render() {
    const {categories, error, loading, openKeys} = this.state;

    console.log(openKeys);
    return (
        <Menu
            mode="inline"
            onOpenChange={this.onOpenChange}
            activeKey={"1"}
            openKeys={openKeys}
        >
          {this.renderCategories(categories)}
        </Menu>
    );
  }
}

export default SideBar;
