import React from 'react';
import { Hourglass } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'user' | 'business';
  setView: (view: 'home' | 'user' | 'business') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="navbar glass">
      <div className="navbar-logo" onClick={() => setView('home')}>
        <Hourglass size={28} color="var(--accent-gold)" />
        Chronos<span>.</span>
      </div>
      <div className="navbar-links">
        <span 
          className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          Home
        </span>
        <span 
          className={`nav-link ${currentView === 'user' ? 'active' : ''}`}
          onClick={() => setView('user')}
        >
          For Earners
        </span>
        <span 
          className={`nav-link ${currentView === 'business' ? 'active' : ''}`}
          onClick={() => setView('business')}
        >
          For Business
        </span>
        <button 
          className="nav-cta"
          onClick={() => setView('user')}
        >
          Launch App
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
