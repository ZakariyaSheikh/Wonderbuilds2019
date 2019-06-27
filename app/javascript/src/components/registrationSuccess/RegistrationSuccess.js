import React, { Component } from 'react';
import './RegistrationSuccess.css'

class RegistrationSuccess extends Component {
	render() {
		return (
			<div className="registration_success_content">
				<div className="registration_success_header">
					Registration successful
				</div>
				<div className="registration_success_text">
					Congratulations and thank you for registering on SuppliersHub. <br className="registration_success_br"/>
					<b>You will shortly receive an e-mail with a link to confirm your registration (check spam also).</b>
				</div>
			</div>
		);
	}
}

export default RegistrationSuccess;