import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [view, setView] = useState<'home' | 'user' | 'business'>('home');

  return (
    <div className="app-container">
      <Navbar currentView={view} setView={setView} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          {view === 'home' && <LandingPage key="home" setView={setView} />}
          {view === 'user' && <UserDashboard key="user" />}
          {view === 'business' && <BusinessDashboard key="business" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
