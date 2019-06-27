import React, { Component } from 'react';
import Modal from 'react-modal';
import './ModalAlert.css';


class ModalAlert extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalIsOpen: false
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    componentWillReceiveProps(props) {
        this.setState({modalIsOpen: props.modalIsOpen});
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        if(this.props.parent) {
            this.props.parent.setState({modalIsOpen: false})
        }
    }
    
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="_modal"
                    overlayClassName="_modal_overlay"
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    
                    <div onClick={this.closeModal} className="_modal_close">&#10060;</div>
                    <div className="_modal_content_wrapper">
                        <div className="_modal_content">{this.props.alert} <br/> {this.props.message}</div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalAlert;
