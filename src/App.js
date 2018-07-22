import React, { Component } from 'react';
import {erc20abi} from './data/erc20abi';
import logo from './logo.svg';
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
        
    }

    hahdleChangeKontrakt = (e) =>  this.setState({tokenContractAddress: e.target.value})

    hahdleChangePurse = (e) =>  this.setState({tokenAccountAddress: e.target.value})








  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Добро пожаловать в Крым! ;-)</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="blockForma">
          <input type="text" value={this.state.tokenContractAddress} onChange={this.hahdleChangeKontrakt}  placeholder="Адрес контракта" /><br />
          <input type="text" value={this.state.tokenAccountAddress} onChange={this.hahdleChangePurse}  placeholder="Адрес Кошелька" /><br />
          <button onClick={this.viewTokens} class="btn btn-light">Tokens</button><br />
        </div>





        

        
        
        <b>Token:</b> {this.state.tokenName} <br /><br />
  			Account: {this.state.tokenAccountAddress}<br />
        Quantity: {this.state.tokenBalance}<br />
        Percentage: {this.state.tokenPercent}%
        





      </div>
    );
  }
}

export default App;
