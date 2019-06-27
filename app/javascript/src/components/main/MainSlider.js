import React, { Component } from 'react';
import './MainSlider.css';
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../images/slider_image_1.jpg';

class MainSlider extends Component {
    render() {
        return (
			<div className="container">
				<Carousel dynamicHeight={true}
						  autoPlay={true}
						  showStatus={false}
						  showArrows={false}
						  showThumbs={false}
						  stopOnHover={false}
						  infiniteLoop={true}>
					<div>
						<div className="main_slider_img_wrapper">
							<img src={image1}/>
						</div>
						<p>
							<div className="slide_header">What is SuppliersHub?</div>
							<div className="slide_text">
								SuppliersHub is a wholesale  connecting manufacturers to their clients. We source the materials directly from manufacturers and supply them for wholesale rates.
							</div>
						</p>
						<div className="slider_overlay"/>
					</div>
					<div>
						<div className="main_slider_img_wrapper">
							<img src={image1}/>
						</div>
						<p>
							<div className="slide_header">What we do?</div>
							<div className="slide_text">
								We supply construction materials to over 300 merchants across the UK. We welcome you to benefit from our supplying capabilities and wholesale prices
							</div>
						</p>
						<div className="slider_overlay"/>
					</div>
					<div>
						<div className="main_slider_img_wrapper">
							<img src={image1}/>
						</div>
						<p>
							<div className="slide_header">How to buy from us?</div>
							<div className="slide_text">
								Very simple – just select the category and then the product itself in any quantity you need. Your order might be as small as any minimum quantity dispatched by the manufacturers or as big as multiple lorry loads. You can pay with your credit or debit card at the checkout straight away. Credit options are also available.
							</div>
						</p>
						<div className="slider_overlay"/>
					</div>
				</Carousel>
			</div>
        );
    }
}

export default MainSlider;
