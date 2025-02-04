import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        <p style={footerTextStyles}>&copy; 2025 SmartLearn. All rights reserved.</p>
        <div style={footerLinksStyles}>
          <a href="/privacy-policy" style={footerLinkStyles}>Privacy Policy</a>
          <a href="/terms-of-service" style={footerLinkStyles}>Terms of Service</a>
          <a href="/contact" style={footerLinkStyles}>Contact Us</a>
        </div>
        <div style={contactInfoStyles}>
          <p style={contactTextStyles}>Contact: +91-860-613-5965</p>
          <p style={contactTextStyles}>Email: 20git05@meaec.edu.in</p>
        </div>
      </div>
    </footer>
  );
}

const footerStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#2C3E50',
  color: '#ecf0f1',
  padding: '10px 0',  // Reduced padding for smaller height
  textAlign: 'center',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
  zIndex: '9999',
  overflow: 'hidden',  // Prevent scrollbars from appearing
}

const footerContentStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  overflow: 'hidden',  // Ensure content doesn't overflow horizontally
}

const footerTextStyles = {
  fontSize: '12px',  // Reduced font size
  marginBottom: '5px',  // Reduced margin
  fontWeight: '400',
}

const footerLinksStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',  // Reduced gap between links
  marginBottom: '5px',  // Reduced margin between links and contact info
}

const footerLinkStyles = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '12px',  // Reduced font size
  fontWeight: '500',
  transition: 'color 0.3s ease',
}

footerLinkStyles[':hover'] = {
  color: '#3498DB',
}

const contactInfoStyles = {
  marginTop: '5px',  // Reduced margin-top
  fontSize: '10px',  // Reduced font size
  fontWeight: '300',
}

const contactTextStyles = {
  marginBottom: '3px',  // Reduced margin-bottom
}

export default Footer;
