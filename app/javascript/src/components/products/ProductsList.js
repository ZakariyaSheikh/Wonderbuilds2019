import React, {Component} from 'react';
import './ProductsList.css';
import ProductsBlock from "../common/ProductsBlock";
import ReactPaginate from 'react-paginate';
import Dropdown from '../common/Dropdown/index'

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.products,
            currentPage: 0,
            sort: "name"
        };
    }

    loadCommentsFromServer() {
        //need BE for this
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.state.data) {
            this.setState({data: nextProps.products});
        }
    }

    handlePageClick = (page) => {
        this.setState({
            currentPage: page.selected
        })
    };

    render() {
        const {data} = this.state;
        return (
            <div>
                <div className='products_list_heading_block'>
                    <ActiveFilters {...this.props}/>

                    <div className='sort_new_dropdown'>
                        Sort by:
                        <Dropdown
                            selected="Name"
                            items={["Name"]}
                            onChange={(sort) => this.setState({sort})}
                        />
                    </div>
                </div>
                <div className="paginationContainer">
                    <ReactPaginate previousLabel={"«"}
                                   nextLabel={"»"}
                                   breakLabel={"..."}
                                   breakClassName={"break-me"}
                                   pageCount={5}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   forcePage = {this.state.currentPage}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   pageClassName={"waves-effect"}
                                   activeClassName={"active"}/>
                </div>
                <ProductsBlock products={data}/>
                <div className="paginationContainer">
                    <ReactPaginate previousLabel={"«"}
                                   nextLabel={"»"}
                                   breakLabel={"..."}
                                   breakClassName={"break-me"}
                                   pageCount={5}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   forcePage = {this.state.currentPage}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   pageClassName={"waves-effect"}
                                   activeClassName={"active"}/>
                </div>
            </div>
        )
    }
}

class ActiveFilters extends Component {
    render() {
        return (
            <div className='active_filters_wrapper'>
                {
                    this.props.activeFilters ? this.props.activeFilters.map((filter, id) => {
                        return (
                            <ActiveFilter
                                filter={filter}
                                id={id}
                                {...this.props}
                            />
                        );
                    }) : null
                }
            </div>
        )
    }
}

class ActiveFilter extends Component {
    componentDidMount() {
        let checkb = document.getElementById(Object.keys(this.props.filter)[0] + '_' + Object.values(this.props.filter)[0])
        if (checkb) checkb.checked = true;
    }

    handleClick = () => {
        let filters = this.props.activeFilters ? this.props.activeFilters : [];

        filters = filters.filter(item => item != this.props.filter);

        document.getElementById(Object.keys(this.props.filter)[0] + '_' + Object.values(this.props.filter)[0]).checked = false;

        this.props.getProducts(
            filters,
            this.props.prices,
            this.props.categories,
            this.props.sort
        );
    };

    render() {
        return (
            <span className='active_filter'>
                {Object.values(this.props.filter)[0]}
                <span className='remove_filter' onClick={this.handleClick}>&#10060;</span>
            </span>
        )
    }
}

export default ProductsList;