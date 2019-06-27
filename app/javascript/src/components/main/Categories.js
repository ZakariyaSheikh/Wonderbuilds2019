import React, { Component } from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';


class Categories extends Component {
    render() {
        return (
			<div className="categories_block">
				
				<CategoriesTable categories={this.props.categories}/>
			</div>
        );
    }
}


class CategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        const id = this.props.id;

        return (
			<Link to={ { pathname: '/products', state: { category: category } } }>
				<div className={(id % 4 === 0) ? "category new_line" : "category"}>
					<img src={category.url}/>
                    {category.name}
				</div>
			</Link>
        );
    }
}

class CategoriesTable extends React.Component {
    render() {
        const rows = [];
        const categories = this.props.categories || [];
        categories.forEach((category, id) => {
            rows.push(
				<CategoryRow
					category={category}
					id={id}
                    key={id}
				/>
            );
        });
        
        return (
			<div>
                {rows}
			</div>
        );
    }
}

export default Categories;
