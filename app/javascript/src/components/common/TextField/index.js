import React, { Component } from 'react';
import Textarea from "react-textarea-autosize";
import './style.css';
import InputMask from 'react-input-mask';

class TextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false
        };
    }

    handleFocus = () => {
        this.setState({focus: true})
    };

    handleBlur = (type) => {
        this.setState({focus: false})
        this.props.onBlur(type)
    };

    handleInput = (e, type) => {
        let value = e.target.value

        switch(type) {
            case "card_number": {
                this.props.onInput(value.replace(/[^\d|-]/g, "").slice(0,19), type)
                break;
            }
            case "exp_date": {
                this.props.onInput(value.replace(/[^\d|/]/g, "").slice(0,5), type)
                break;
            }
            case "telephone": {
                this.props.onInput(value.replace(/[^\d|+]/g, ""), type)
                break;
            }
            case "cvc_code": {
                this.props.onInput(value.replace(/[^\d]/g, "").slice(0,4), type)
                break;
            }
            default: {
                this.props.onInput(value, type)
            }
        }
    };

    render() {
        const {value, type, labelName, className, isTextarea} = this.props
        const {focus} = this.state

        let props =  { ...this.props };
        let labelClass = 'text_field_label ';

        return (
            <div className={`text_field ${className}`} id={ this.props.type }>
                <label className={
                    value || focus ?
                        labelClass + " higher"
                        :
                        labelClass }>
                    { this.props.labelName }
                </label>

                {
                    isTextarea ?
                        <Textarea className={"text_field_input "}
                                  onFocus={() => this.handleFocus()}
                                  onBlur={() => this.handleBlur(type)}
                                  onInput={(e) => this.props.onInput(e.target.value, type)}
                        />
                        :
                        <InputMask
                            className={"text_field_input"}
                            autoComplete={ "new-" + type }
                            { ...props }
                            type={this.props.inputType}
                            onFocus={() => this.handleFocus()}
                            onBlur={() => this.handleBlur(type)}
                            onInput={(e) => this.handleInput(e, this.props.type)}
                        />
                }
                {/*}*/}
            </div>
        )
    }
}

export default TextField;