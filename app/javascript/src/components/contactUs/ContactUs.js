import React, { Component } from 'react';
import './ContactUs.css'
import { sendContactUs } from '../../actions/contactUs';
import TextField from '../shared/TextField';
import ModalAlert from '../shared/ModalAlert';
import { StaticGoogleMap, Marker } from "react-static-google-map";

class ContactUs extends Component {
    constructor(props) {
        super(props);
        
        this.state = { nameFocus: false, emailFocus: false, messageFocus: false, modalIsOpen: false };
    }
    
    validate = () => {
        return false;
    };
    
    contactReq = () => {
        sendContactUs(this.state, this)
    };
    
    render() {
        return (
            <div className="contact_us">
                <div className="contact_us_left">
                    <div className="contact_us_header">Contact Us</div>
                    <div className="contact_us_address contact_us_text">Unit 3, Streakes Field Road Staples Corner, London, NW2 7GD</div>
                    <div className="contact_us_email contact_us_text">contact@wonderbuilds.com</div>
                    <div className="contact_us_phone contact_us_text">0208 208 2121</div>
                    <div className="contact_us_user_data">
                        <TextField
                            parent={this}
                            type="name"
                            className="contact_us_user_name"
                            labelName="Name"
                        />
                        <TextField
                            parent={this}
                            type="email"
                            className="contact_us_user_email"
                            labelName="E-mail"
                        />
                    </div>
                    <div className="contact_us_user_data">
                        <TextField
                            parent={this}
                            type="message"
                            isTextarea={true}
                            className="contact_us_message"
                            labelName="Message"
                        />
                    </div>
                    <div className="contact_us_button" onClick={this.contactReq}>SUBMIT</div>
                    <ModalAlert modalIsOpen={this.state.modalIsOpen} parent={this} alert={'Thank you,'} message={'we got your message!'}/>
                </div>
                <div className="contact_us_right">
                    <StaticGoogleMap
                        className="contact_us_map"
                        center="Unit 3, Streakes Field Road Staples Corner, London, NW2 7GD"
                        zoom={16}
                        size={"340x441"}
                    >
                        <Marker
                            location="Unit 3, Streakes Field Road Staples Corner, London, NW2 7GD"
                            color="red"
                        />
                    </StaticGoogleMap>
                </div>
            </div>
        );
    }
}

export default ContactUs;