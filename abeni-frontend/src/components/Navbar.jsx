import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import '../App.css';

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/help', label: 'Help' },
    { path: '/cart', label: `Cart (${cartCount})` },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={closeMobileMenu}>Abeni Perfumes</Link>
      </div>
      
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
      </button>
      
      <div className="nav-center">
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={handleNavLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="nav-right">
        {user ? (
          <div className="user-menu">
            {(user.role === 'admin' || user.role === 'owner') && (
              <Link to="/admin" className="admin-link" onClick={closeMobileMenu}>
                Admin
              </Link>
            )}
            <Link to="/profile" className="profile-link" onClick={closeMobileMenu}>
              👤 Profile
            </Link>
            <span className="user-email">{user.firstName || user.email}</span>
            <button 
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
            Account
          </Link>
        )}
      </div>
    </nav>
  );
}