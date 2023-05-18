import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faHome, faPerson, faStore } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo/logo1.png';

const Sidebar = () => {
  return (
    <div className="navbar">
      <Link className='logo' to='/'>
        <img className='logo' src={logo} alt="logo" />
      </Link>
      <nav className='icon' to='/'>
      <NavLink exact="true" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHome} className='colorIcon'/>
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="about-link" to="/addProduct">
        <FontAwesomeIcon icon={faAdd} className='colorIcon'/>
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="contact-link" to="/store">
        <FontAwesomeIcon icon={faStore} className='colorIcon'/>
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="contact-link" to="/login">
        <FontAwesomeIcon icon={faPerson} className='colorIcon'/>
      </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;



