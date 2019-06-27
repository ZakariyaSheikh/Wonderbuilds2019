import React, {Component} from 'react';
import '../../index.css';
import './Main.css';
import MainSlider from './MainSlider.js'
import Categories from './Categories.js'
import PopularProducts from './PopularProducts.js'
import roofing_felts from '../../images/categories/roofing_felts.png';
import { getCategories } from '../../actions/categories';
import { getFilters } from '../../actions/filters';
import SideBar from './SideBar.js'
import Subheader from "./components/Subheader";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] }
        this.state = { filters: [] }
    }
    
    componentDidMount() {
        getCategories(this);
    }
    
    render() {
        const categories = [
            {name: 'Roofing felts', image: roofing_felts},
            {name: 'Insulation', image: roofing_felts},
            {name: 'Timber', image: roofing_felts},
            {name: 'Roof tiles & slate', image: roofing_felts},
            {name: 'GRP', image: roofing_felts},
            {name: 'Liquid membranes', image: roofing_felts},
            {name: 'Mastics & primes', image: roofing_felts},
            {name: 'Roof shingles', image: roofing_felts}
        ];
        
        const products = [
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
            {name: 'WonderFlax PU', made_in: 'Stockholm', price: '100'},
        ];

        return (
            <div className="main">
                <Subheader />
                    <div className="main-container">
                    <div className="main-container-left">
                        <div className="main-container-title title-product">CHOOSE PRODUCT CATEGORY</div>
                        <SideBar />
                    </div>
                    <div className="main-container-right">
                        <div className="main-container-title">Featured Products</div>
                        <PopularProducts />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
