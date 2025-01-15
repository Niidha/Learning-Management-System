import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const Header = () => {
  return (
    <header style={headerStyles}>
      <div style={logoContainerStyles}>
        <Link to="/" style={linkStyles}>
          <img src="/logo.png" alt="Logo" style={logoStyles} />
          <span style={appNameStyles}>SmartLearn</span>
        </Link>
      </div>
      <nav style={navStyles}>
        <div style={contactIconsStyles}>
          <a href="tel:+123456789" style={contactLinkStyles}>
            <FaPhoneAlt size={20} />
          </a>
          <a href="mailto:contact@example.com" style={contactLinkStyles}>
            <FaEnvelope size={20} />
          </a>
        </div>
      </nav>
    </header>
  )
}

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#fff',
  zIndex: 1000,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
}

const linkStyles = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
}

const logoStyles = {
  height: '40px',
  marginRight: '10px',
}

const appNameStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
}

const navStyles = {
  display: 'flex',
  alignItems: 'center',
}

const contactIconsStyles = {
  display: 'flex',
  gap: '15px',
}

const contactLinkStyles = {
  color: '#333',
}

export default Header
