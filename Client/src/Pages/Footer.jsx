import React from 'react'

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div style={footerContentStyles}>
        <p>&copy; 2025 SmartLearn. All rights reserved.</p>
        <div style={footerLinksStyles}>
          <a href="/privacy-policy" style={footerLinkStyles}>Privacy Policy</a>
          <a href="/terms-of-service" style={footerLinkStyles}>Terms of Service</a>
          <a href="/contact" style={footerLinkStyles}>Contact Us</a>
        </div>
        <p style={contactInfoStyles}>Contact: +123-456-7890 | Email: support@smartlearn.com</p>
      </div>
    </footer>
  )
}

const footerStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#f8f9fa',
  textAlign: 'center',
  padding: '10px 0', // Reduced padding
  boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1)', // Lighter shadow
}

const footerContentStyles = {
  margin: '0 auto',
  padding: '0 10px', // Reduced padding
  maxWidth: '1200px',
  color: '#333',
  fontSize: '14px', // Reduced font size
}

const footerLinksStyles = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px', // Reduced gap
  marginBottom: '5px', // Reduced margin
}

const footerLinkStyles = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '13px', // Reduced font size
}

const contactInfoStyles = {
  fontSize: '12px', // Reduced font size for contact info
  marginTop: '5px', // Adjusted margin for contact info
}

export default Footer
