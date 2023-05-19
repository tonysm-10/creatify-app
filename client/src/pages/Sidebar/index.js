import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faHome, faStore } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo/logo1.png';
import './index.scss';

const Sidebar = () => {
  return (
    <div className="navbar">
      <Link className='logo' to='/'>
        <img className='logo' src={logo} alt="logo" />
      </Link>
      <nav className='icon' to='/'>
      <NavLink exact="true" activeclassname="active" to="/" className='colorIcon'>
          <FontAwesomeIcon icon={faHome} />
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="product-link colorIcon" to="/addProduct">
        <FontAwesomeIcon icon={faAdd} />
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="store-link colorIcon" to="/store">
        <FontAwesomeIcon icon={faStore} />
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="login-link" to="/login">
        Login
      </NavLink>
      <NavLink exact="true" activeclassname="active" className="signup-link" to="/signup">
         Signup
      </NavLink>
      </nav>
     </div>
  );
};

export default Sidebar;



