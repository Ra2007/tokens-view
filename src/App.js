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

        if (this.checkAdress(accountAddress) && this.acheckAdress(contractAdress)) {       
        
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
          } else { alert('neprav')}
        
    }

  hahdleChangeKontrakt = (e) =>  this.setState({tokenContractAddress: e.target.value})

  hahdleChangePurse = (e) =>  this.setState({tokenAccountAddress: e.target.value})

  checkAdress = (adress) => {
    if (adress.length === 42 && adress[0] === '0' && adress[1] === 'x') {
     return true
    } else {
      return false
    };
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Shows tokens of the standard ERC20</h1>
        </header>
        <p className="App-intro">
        Must be installed and logged <a href="https://metamask.io/">Metamask</a>.
        </p>
        <div className="blockForma">
          <input type="text" value={this.state.tokenContractAddress} onChange={this.hahdleChangeKontrakt}  placeholder="Contract adress" /><br />
          <input type="text" value={this.state.tokenAccountAddress} onChange={this.hahdleChangePurse}  placeholder="Account adress" /><br />
          <button onClick={this.viewTokens} class="btn btn-light">Tokens</button><br />
        </div>        
       <form className="formView">        
        <label><b>Token name </b><input type="text" value={this.state.tokenName}/></label><br />
        <label><b>Account: </b><input type="text" value={this.state.tokenAccountAddress}/></label><br />
        <label><b>Quantity: </b><input type="text" value={this.state.tokenBalance}/></label><br />
        <label><b>Percentage: </b><input type="text" value={this.state.tokenPercent}/></label><br />
        </form>
      </div>
    );
  }
}

export default App;
