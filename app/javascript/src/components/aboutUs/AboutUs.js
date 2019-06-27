import React, { Component } from 'react';
import './AboutUs.css'
import about_image from '../../images/about_us.jpg'

class AboutUs extends Component {
	render() {
		return (
			<div className="about_us_block">
				<div className="about_us_back">
					<div className="about_us_text">
						<img src={about_image} className="about_us_image"/>
						<div className="about_us_title">
							About us
						</div>
						<div className="about_us_additional_text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							<br/>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutUs;