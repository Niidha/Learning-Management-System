import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaUserAlt,  FaHome } from 'react-icons/fa';

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  return (
    <header style={headerStyles}>
      <div style={logoContainerStyles}>
        <Link to="/" style={linkStyles}>
          <img src="/logo.png" alt="Logo" style={logoStyles} />
          <span style={appNameStyles}>SmartLearn</span>
        </Link>
      </div>
      <nav style={navStyles}>
        <div style={menuRightStyles}>
     
          <Link
            to="/"
            style={menuLinkStyles}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={handleMouseLeave}
          >
            <FaHome size={18} style={{ marginRight: '8px' }} />
            Home
          </Link>

          <div 
            onMouseEnter={() => handleMouseEnter('account')} 
            onMouseLeave={handleMouseLeave}
            style={menuLinkWrapperStyles}
          >
            <Link
              to="#"
              onClick={toggleAccountMenu} 
              style={{
                ...menuLinkStyles,
                color: hoveredLink === 'account' ? '#3498DB' : '#fff',
              }}
            >
              <FaUserAlt size={18} style={{ marginRight: '8px' }} />
              Account
            </Link>
            {accountMenuVisible && (
              <div style={dropdownMenuStyles}>
                <Link 
                  to="/login" 
                  style={dropdownLinkStyles}
                  onClick={() => setAccountMenuVisible(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  style={dropdownLinkStyles}
                  onClick={() => setAccountMenuVisible(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

         
          <a
            href="tel:+123456789"
            style={{
              ...contactLinkStyles,
              color: hoveredLink === 'phone' ? '#3498DB' : '#fff',
            }}
            onMouseEnter={() => handleMouseEnter('phone')}
            onMouseLeave={handleMouseLeave}
          >
            <FaPhoneAlt size={20} />
          </a>
          <a
            href="mailto:contact@example.com"
            style={{
              ...contactLinkStyles,
              color: hoveredLink === 'email' ? '#3498DB' : '#fff',
            }}
            onMouseEnter={() => handleMouseEnter('email')}
            onMouseLeave={handleMouseLeave}
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 40px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#2C3E50',
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  color: '#fff',
};

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyles = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
};

const logoStyles = {
  height: '40px',
  marginRight: '12px',
};

const appNameStyles = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#fff',
  letterSpacing: '1px',
};

const navStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',  // Align the content to the right
  width: '60%',
};

const menuRightStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',  // Space between icons and links
};

const menuLinkWrapperStyles = {
  position: 'relative',
};

const menuLinkStyles = {
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  letterSpacing: '0.5px',
  transition: 'color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
};

const dropdownMenuStyles = {
  position: 'absolute',
  top: '100%',
  left: '0',
  backgroundColor: '#2C3E50',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  width: '120px',
  zIndex: 1001,
};

const dropdownLinkStyles = {
  color: '#fff',
  padding: '10px',
  textDecoration: 'none',
  display: 'block',
  transition: 'background-color 0.3s',
};

dropdownLinkStyles[':hover'] = {
  backgroundColor: '#3498DB',
};

const contactLinkStyles = {
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

export default Header;
