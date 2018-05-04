import React, { Component } from 'react';
import '../css/style.css';
import {
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <header>
            <div className="wrap navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="logo navbar-brand">
                    LOGO1
                </div>
                <nav className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup" >
                    <ul className="menu navbar-nav">
                        <li className="menu_item nav-item nav-link">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu_item nav-item nav-link">
                            <Link to="/Products">Catalog</Link>
                        </li>
                        <li className="menu_item nav-item nav-link">
                            <Link to="/About">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
      );
    }
  }

export default Header;