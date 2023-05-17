import React from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faHome, faStore } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo/logo1.png'

const Sidebar = () => {
  return (
    <Router>
      <div className="navbar">
        <Link className='logo' to='/'>
            <img className='logo' src={logo} alt="logo" />
        </Link>
        <nav className='icon'>
          <NavLink exact activeClassName="active" to="/">
            <FontAwesomeIcon icon={faHome} className='colorIcon'/>
          </NavLink>
          <NavLink exact activeClassName="active" className="about-link" to="/addProduct">
            <FontAwesomeIcon icon={faAdd} className='colorIcon'/>
          </NavLink>
          <NavLink exact activeClassName="active" className="contact-link" to="/contact">
            <FontAwesomeIcon icon={faStore} className='colorIcon'/>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
};

export default Sidebar;

