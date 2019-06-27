import React, {Component} from 'react'
import './styles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'


class ToastMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forceClose: false,
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({forceClose: false})
  }

  closeToast = () => {
    this.setState({forceClose: true})
  };

  render() {
    const {isVisible, message} = this.props;
    const {forceClose} = this.state;
    return (
        <React.Fragment>
          {
            isVisible ?
                <div id="toastCont"
                     className={isVisible && !forceClose ? 'show' : 'hidden'}
                >
      <span className={"exclSpan"}>
      <FontAwesomeIcon icon={faExclamationCircle}/>
      </span>
                  {this.props.message}
                  <span
                      className={"closeSpan"}
                      onClick={() => this.closeToast()}><FontAwesomeIcon icon={faTimes}/></span>
                </div>
                : null
          }
        </React.Fragment>
    )
  }
}

export default ToastMessage
