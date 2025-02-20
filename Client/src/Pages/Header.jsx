import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaUserAlt, FaHome, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!accountMenuVisible);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.link}>
          <img src="/logo.png" alt="Logo" style={styles.logo} />
          <span style={styles.appName}>SmartLearn</span>
        </Link>
      </div>
      {isMobile ? (
        <button style={styles.menuButton} onClick={toggleMenu}>
          <FaBars size={24} color="#fff" />
        </button>
      ) : (
        <nav style={styles.nav}>
          <Link to="/" style={styles.menuLink}><FaHome size={18} style={styles.icon} /> Home</Link>
          <div style={styles.menuLinkWrapper}>
            <Link to="#" onClick={toggleAccountMenu} style={styles.menuLink}><FaUserAlt size={18} style={styles.icon} /> Account</Link>
            {accountMenuVisible && (
              <div style={styles.dropdownMenu}>
                <Link to="/login" style={styles.dropdownLink}>Login</Link>
                <Link to="/signup" style={styles.dropdownLink}>Sign Up</Link>
              </div>
            )}
          </div>
          <a href="tel:+123456789" style={styles.contactLink}><FaPhoneAlt size={20} /></a>
          <a href="mailto:contact@example.com" style={styles.contactLink}><FaEnvelope size={20} /></a>
        
        </nav>
      )}

      {isMobile && menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.dropdownLink}>Home</Link>
          <a href="tel:+123456789" style={styles.dropdownLink}>Call Us</a>
          <a href="mailto:contact@example.com" style={styles.dropdownLink}>Email</a>
          <Link to="/login" style={styles.dropdownLink}>Login</Link>
          <Link to="/signup" style={styles.dropdownLink}>Sign Up</Link>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#2C3E50', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', color: '#fff' },
  logoContainer: { display: 'flex', alignItems: 'center' },
  link: { display: 'flex', alignItems: 'center', textDecoration: 'none' },
  logo: { height: '40px', marginRight: '12px' },
  appName: { fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '1px' },
  nav: { display: 'flex', alignItems: 'center', gap: '20px' },
  menuButton: { background: 'none', border: 'none', cursor: 'pointer' },
  menuLink: { fontSize: '16px', fontWeight: '500', textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' },
  menuLinkWrapper: { position: 'relative' },
  dropdownMenu: { position: 'absolute', top: '100%', left: 0, backgroundColor: '#2C3E50', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '4px', width: '120px', zIndex: 1001 },
  dropdownLink: { color: '#fff', padding: '10px', textDecoration: 'none', display: 'block', transition: 'background-color 0.3s', cursor: 'pointer' },
  mobileMenu: { position: 'absolute', top: '60px', right: '20px', backgroundColor: '#2C3E50', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '10px', width: '150px', zIndex: 1001, display: 'flex', flexDirection: 'column' },
  contactLink: { textDecoration: 'none', color: '#fff', transition: 'color 0.3s ease' },
  icon: { marginRight: '8px' }
};

export default Header;
