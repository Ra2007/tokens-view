import React, { Component } from 'react';
import {erc20abi} from './data/erc20abi';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '0x94e4d6158e17a681dc8a8326e64578b3c12ba3a3',       
      tokenName: '',
      tokenAccountAddress: '',
      tokenBalance:'',
      tokenPercent: ''
      
     }

   
  }

 viewTokens = (e) => {
  			e.preventDefault();
        
        const accountAddress = this.state.value;
        const contractAdress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d';
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
                const perrToken = +percentOwned.round(5);
                console.log('perr', percentOwned.round(5))
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

  hahdleChange = (e) =>  this.setState({value: e.target.value})








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

        <input type="text" value={this.state.value} onChange={this.hahdleChange}  placeholder="Введите текст для поиска" /><br />
        <button onClick={this.viewTokens}>Tokens</button><br />
        
        <b>Token:</b> {this.state.tokenName} <br /><br />
  			Account: {this.state.tokenAccountAddress}<br />
        Quantity: {this.state.tokenBalance}<br />
        Percentage: {this.state.tokenPercent}%
        





      </div>
    );
  }
}

export default App;
