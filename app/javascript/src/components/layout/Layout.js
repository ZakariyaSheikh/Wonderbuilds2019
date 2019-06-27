import React from 'react';
import { Route } from 'react-router'
import Header from "../shared/Header";
import Footer from "../shared/Footer";


const DefaultLayout = ({component: Component, ...rest}) => {
    return (
		<Route {...rest} render={ matchProps => (
			<div className="main_wrapper">
				<div className="main_content_wrapper">
					<Header/>
					<Component { ...matchProps } { ...this.props }  />
				</div>
				<Footer/>
			</div>
        )} />
    )
};

export default DefaultLayout;
