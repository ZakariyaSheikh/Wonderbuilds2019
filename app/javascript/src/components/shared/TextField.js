import React, { Component } from 'react';
import Textarea from "react-textarea-autosize";
import './TextField.css';
import InputMask from 'react-input-mask';

class TextField extends Component {
    constructor(props) {
        super(props);
    }
    
    handleFocus = (type) => {
        type = type + 'Focus';
        this.props.parent.setState({ [type]: true })
    };

    handleBlur = (type) => {
        this.props.parent.validate(type);

        if(!this.props.parent.state[type] || this.props.parent.state[type].length < 0) {
            type = type + 'Focus';
            this.props.parent.setState({ [type]: false})
        }
    };

    handleInput = (e, type) => {
        this.props.parent.setState({ [type]: e.target.value })
    };

    render() {
        let typeFocus = this.props.type + 'Focus';
        let labelClass = '__text_field_label ';
        let inputClass = '__text_field_input ';
        let className = '__text_field ';

        if(this.props.className) {
            labelClass += this.props.className + "_label";
            inputClass += this.props.className + "_input";
            className += this.props.className;
        }

        let props =  { ...this.props };
        delete props['className'];

        return (
            <div className={ className } id={ this.props.type }>
                <label className={
                    this.props.parent.state[typeFocus] ?
                        labelClass + " higher" :
                        labelClass }>
                    { this.props.labelName }
                </label>
                {
                    this.props.isTextarea ?
                        <Textarea className={ inputClass }
                                  onFocus={() => this.handleFocus(this.props.type)}
                                  onBlur={() => this.handleBlur(this.props.type)}
                                  onInput={(e) => this.handleInput(e, this.props.type)}
                        /> :
                        <InputMask  className={ inputClass }
                                    autoComplete={ "new-" + this.props.type }
                                    { ...props }
                                    type={this.props.inputType}
                                    onFocus={() => this.handleFocus(this.props.type)}
                                    onBlur={() => this.handleBlur(this.props.type)}
                                    onChange={(e) => this.handleInput(e, this.props.type)}
                        />
                }
            </div>
        )
    }
}

export default TextField;