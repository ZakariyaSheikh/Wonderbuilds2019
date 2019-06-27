import React, { Component } from 'react';
import './FAQ.css'

class FAQ extends Component {
	render() {
		return (
			<div className="faq_block">
				<div className="faq_text">
					<div className="faq_title">Frequently asked questions</div>
					<div className="faq_additional_text">
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
						<div className="line_breaker"/>
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
						<div className="line_breaker"/>
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
						<div className="line_breaker"/>
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
						<div className="line_breaker"/>
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
						<div className="line_breaker"/>
						<FAQtext question="How do I get in touch with you to get a custom delivery proposal?"
						         answer="It is unlikely that our delivery will be delayed, but if it is please contact us and we will certainly make it worth the wait. We are happy to help with any needs you may have surrounding your order."/>
					</div>
				</div>
			</div>
		);
	}
}

class FAQtext extends Component {
	constructor(props) {
		super(props);
		this.state = { toggled: false };
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({ toggled: !this.state.toggled})
	};
	
	render() {
		return (
			<span onClick={ this.handleClick } className="faq_text_span">
				<i className={ this.state.toggled ? "arrow up" : "arrow down"} /> { this.props.question }
				<div className={ this.state.toggled ? "faq_text_answer" : "faq_text_answer_none" }>{ this.props.answer }</div>
			</span>
		);
	}
}

export default FAQ;