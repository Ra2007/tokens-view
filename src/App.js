import React, { Component } from 'react';
import Header from './components/header/header';
import InputForm from './components/inputForm/inputForm';
import OutputForm from './components/outputForm/outputForm';
import {erc20abi} from './data/erc20abi';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tokenContractAddress: '',
      tokenName: '',
      tokenAccountAddress: '',
      tokenBalance: '',
      tokenPercent: ''      
     }  
  }

 viewTokens = (e) => {

  			e.preventDefault();
        
        const accountAddress = this.state.tokenAccountAddress;
        const contractAdress = this.state.tokenContractAddress;
        const simpleContract = window.web3.eth.contract(erc20abi);
        const contractInterface = simpleContract.at(contractAdress);

        if (this.checkAdress(accountAddress) && this.checkAdress(contractAdress)) {       
        
          contractInterface.totalSupply.call((err, totalSupply) => {
          
            contractInterface.decimals.call( (err, decimals) => {
            
              contractInterface.name.call((err, name) => {
              
                contractInterface.balanceOf.call(accountAddress, (err, balance) => {

  							  const percentOwned = balance.div(totalSupply).mul(100);
  							  const divisor = new window.web3.BigNumber(10).toPower(decimals);
  							  totalSupply = totalSupply.div(divisor);
                  balance = balance.div(divisor);

                    this.setState({                   
                      tokenName: name,
                      tokenAccountAddress: accountAddress,
                      tokenBalance: +balance.round(5),
                      tokenPercent: +percentOwned.round(5)
                    });              

  						    });
  					    });
  				    });
            });
          } else { alert('Incorrect address.')}        
    }

  hahdleChangeKontrakt = (e) =>  this.setState({tokenContractAddress: e.target.value})

  hahdleChangePurse = (e) =>  this.setState({tokenAccountAddress: e.target.value})

  checkAdress = (adress) => {
    if (adress.length === 42 && adress[0] === '0' && adress[1] === 'x') {
     return true
    } else {
      return false
    }
  }
    
  render() {
    return (
       <div className="App">
          <Header />
          <InputForm 
            tokenContractAddress={this.state.tokenContractAddress}
            tokenAccountAddress={this.state.tokenAccountAddress}
            hahdleChangePurse={this.hahdleChangePurse}
            hahdleChangeKontrakt={this.hahdleChangeKontrakt}
            viewTokens={this.viewTokens}
            /> 
          <OutputForm 
          tokenName={this.state.tokenName}
          tokenAccountAddress={this.state.tokenAccountAddress}
          tokenBalance={this.state.tokenBalance}
          tokenPercent={this.state.tokenPercent}
          />       
      </div>
    );
  }
}

export default App;
