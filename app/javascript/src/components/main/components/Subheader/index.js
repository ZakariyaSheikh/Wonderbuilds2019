import React, {Component} from 'react';
import cranImg from '../../../../images/kran.png'
import displayImg from '../../../../images/display.png'
import pogruzImg from '../../../../images/pogruz.png'
import './styles.css'

class Subheader extends Component {
    render() {
        return (
            <div className="main-subheader">
                <div className="main-subheader-container">
                    <div className="main-subheader-column">
                        <h2 className="main-subheader-title">WHAT IS SUPPLIERSHUB?</h2>
                        <div className="main-subheader-desc">SuppliersHub is a wholesale connecting manufacturers to
                            their clients. We source the materials directly from manufacturers and supply them for
                            wholesale rates.
                        </div>
                        <div className="main-subheader-image kran"></div>
                        <h2 className="main-subheader-title">HOW TO BUY FROM US?</h2>
                        <div className="main-subheader-desc">Very simple - just sekect the category and then the product
                            itself in any quantity you need dispatched be the manufacturers or as big as multiple lorry
                            loads. You can pay with your credit card at the checkout straight away. Credit options are
                            also available.
                        </div>
                    </div>
                    <div className="main-subheader-column">
                        <div className="main-subheader-image pogruz"></div>
                        {/*<img src={pogruzImg} alt="pogruz"/>*/}
                        <h2 className="main-subheader-title">WHAT WE DO?</h2>
                        <div className="main-subheader-desc">We supply construction materials to over merchants across
                            the UK. We welcome you to benefit from our supplying capabilities and wholesale prices
                        </div>
                        <div className="main-subheader-image display"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subheader
