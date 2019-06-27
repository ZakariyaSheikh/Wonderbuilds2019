import React, { Component } from 'react';
import { confirmEmail } from "../../actions/users";



class Confirmation extends Component {
	constructor(props) {
		super(props);
		
		this.state = { confirmed: true }
	}
	
	componentWillMount() {
        confirmEmail(this.props.match.params.id)
    }
	
	render() {
		return (
			<div className="registration_success_content">
				<div className="registration_success_header">
					Email confirmation successful
				</div>
				<div className="registration_success_text">
					Congratulations and thank you for registering on SuppliersHub.
				</div>
			</div>
		);
	}
}

export default Confirmation;