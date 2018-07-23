import React, { Component } from 'react';
import './inputForm.css';

class InputForm extends Component {

    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <div className="inputForm">                
                <input type="text" value={this.props.tokenContractAddress} onChange={this.props.hahdleChangeKontrakt}  placeholder="Contract adress" /><br />
                <input type="text" value={this.props.tokenAccountAddress} onChange={this.props.hahdleChangePurse}  placeholder="Account adress" /><br />
                <button onClick={this.props.viewTokens}>Tokens</button><br />      

            </div>
        )
    }
}

export default InputForm;