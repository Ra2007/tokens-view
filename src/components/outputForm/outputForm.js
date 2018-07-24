import React, { Component } from 'react';

import './outputForm.css';

class OutputForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="outputForm">
                <form className="formView">        
                    <label><b>Token name: </b><input type="text" value={this.props.tokenName}/></label><br />
                    {/* <label><b>Account: </b><input type="text" value={this.props.tokenAccountAddress}/></label><br /> */}
                    <label><b>Quantity: </b><input type="text" value={this.props.tokenBalance}/></label><br />
                    <label><b>Percentage: </b><input type="text" value={this.props.tokenPercent}/></label><br />
                </form>
            </div>
        )
    }
}

export default OutputForm; 