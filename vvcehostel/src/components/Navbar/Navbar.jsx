import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/vvce-logo.png';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo-title">
        <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Vidyavardhaka College of Engineering</span>
      </div>

      <div className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
      <button
  className="nav-button"
  onClick={() => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsNavOpen(false);
  }}
>
  Home
</button>

        <button className="nav-button" onClick={() => scrollToSection('about')}>About</button>
        <button className="nav-button" onClick={() => scrollToSection('facilities')}>Facilities</button>
        <button className="nav-button" onClick={() => scrollToSection('guidelines')}>Guidelines</button>
        <button className="nav-button" onClick={() => scrollToSection('food-menu')}>Food Menu</button>
        <button className="nav-button" onClick={() => scrollToSection('gallery')}>Gallery</button>
        <button className="nav-button" onClick={() => scrollToSection('complaints')}>Complaints</button>
        <button className="nav-button" onClick={() => scrollToSection('contact')}>Contact</button>
        <Link to="/admin-login" onClick={() => setIsNavOpen(false)}>Admin Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
