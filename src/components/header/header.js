import React, { Component } from 'react';
import logo from './logo.svg';
import './header.css';

class Header extends Component {
    render() {
        return(
            <div>
                <header className="header">
                    <img src={logo} className="logoHeader" alt="logo" />
                    <h1 className="titleHeader">Shows tokens of the standard ERC20</h1>
                </header>
                <p className="introHeader">
                    Must be installed and logged <a href="https://metamask.io/">Metamask</a>.
                </p>
            </div>
        )
    }
}

export default Header;