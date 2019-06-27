import React, { Component } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'


class Footer extends Component {
	render() {
		return (
			<div className="footer-block">
				<div className="center-block">
					<Menu/>
				</div>
                <div className="copyrights-block">WonderBuilds © 2019 All Rights Reserved</div>
			</div>
		);
	}
}

class Menu extends Component {
	render() {
		return (
			<div className="menu">
				<div className='menu-row'>
					<h3 className="menu-title">CONTACT US:</h3>
					<div className="menu-item">
						<span className="menu-title">Address: </span>
						16 Hampden Gurney Street,
						London, W1H 5AL
					</div>
					<div className="menu-item">
						<span className="menu-title">Phone: </span>
						0208 208 2121</div>

					<div className="menu-item">
						<span className="menu-title">Business Hours: </span>
						8AM-5PM Monday to Friday
					</div>

					<div className="menu-item">
						We would love to create a custom proposal
                        for your roofing and insulation needs
                        today!
					</div>
				</div>
				<div className='menu-row'>
                    <h3 className="menu-title">LINKS:</h3>
                    <Link className="menu-item" to={{pathname: '/products', state: { category:  { name: "Mastics and Primers" } } }}>PRIMERS AND MASTICS</Link>
                    <Link className="menu-item" to={{pathname: '/products', state: { category:  { name: "Breather Membranes" } } }}>BREATHABLE MEMBRANES</Link>
                    <Link className="menu-item" to={{pathname: '/products', state: { category:  { name: "GRP" } } }}>FIRESTOP 20 GRP</Link>
                    <Link className="menu-item" to={{pathname: '/products', state: { category:  { name: "Stone Wool Insulation" } } }}>STONE WOOL INSULATION</Link>
				</div>
                <div className='menu-row'>
                    <h3 className="menu-title">ABOUT US:</h3>
                    <div className="menu-item">
						For more information about our roofing
                        felts, liquid membranes, shingles, flashing
                        bands and insulation products contact us at
                    </div>
                    <div className="menu-item">HUNDREDS OF STOCKISTS</div>
                    <div className="menu-item">PRICE MATCH GUARANTEE</div>
                    <div className="menu-item">GUARANTES BY</div>
				</div>
			</div>
		)
	}
}

export default Footer;
