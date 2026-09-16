import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Coins, MapPin, MonitorPlay, Users, CheckCircle2, List, Map as MapIcon, ShoppingBag, Home, Gamepad2, Mic, Coffee, Dumbbell, Palette, Cake } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { GoldCoinModel, CrystalModel, TorusModel, SparkleModel } from './ThreeModels';

// Fix Leaflet's default icon issue with React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom gold marker for Chronos vibe
const goldMarkerHtml = `
  <div style="
    background-color: var(--accent-gold);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    border: 2px solid white;
  ">
    <div style="transform: rotate(45deg); color: white; width: 14px; height: 14px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    </div>
  </div>
`;

const customIcon = L.divIcon({
  html: goldMarkerHtml,
  className: 'custom-leaflet-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  tooltipAnchor: [0, -35]
});

const mockBounties = [
  {
    id: 1,
    title: 'Third Wave Coffee - Dead-Hour',
    description: 'Occupy a table at Third Wave Coffee, Indiranagar to provide visual social proof.',
    reward: 50,
    type: 'physical',
    icon: <Coffee size={24} />,
    location: { lat: 12.9784, lng: 77.6408 }
  },
  {
    id: 2,
    title: 'OTT "Binge-Booster"',
    description: 'Watch the first episode of "Neon Dreams" within the launch window.',
    reward: 30,
    type: 'digital',
    icon: <MonitorPlay size={24} />
  },
  {
    id: 3,
    title: 'Tech Startup Seminar Buffer',
    description: 'Attend the "Future of AI" guest lecture at Koramangala Club.',
    reward: 100,
    type: 'physical',
    icon: <Users size={24} />,
    location: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: 4,
    title: 'Puma "Dwell Time" Activation',
    description: 'Spend 15 minutes interacting with the new sneaker line at the Brigade Road store.',
    reward: 75,
    type: 'physical',
    icon: <ShoppingBag size={24} />,
    location: { lat: 12.9716, lng: 77.6066 }
  },
  {
    id: 5,
    title: 'Prestige "Open House" Hype',
    description: 'Attend the luxury apartment open house in Whitefield to build hype.',
    reward: 150,
    type: 'physical',
    icon: <Home size={24} />,
    location: { lat: 12.9698, lng: 77.7499 }
  },
  {
    id: 6,
    title: 'Startup Pitch Audience',
    description: 'Be part of the live audience for a seed-funding pitch event in HSR Layout.',
    reward: 120,
    type: 'physical',
    icon: <Users size={24} />,
    location: { lat: 12.9121, lng: 77.6446 }
  },
  {
    id: 7,
    title: 'Boutique Cafe Patron',
    description: 'Provide footfall at the newly opened Blue Tokai in Jayanagar.',
    reward: 45,
    type: 'physical',
    icon: <Coffee size={24} />,
    location: { lat: 12.9299, lng: 77.5824 }
  },
  {
    id: 8,
    title: 'New Gym Open House',
    description: 'Tour the new Cult.fit center in Bellandur to create buzz.',
    reward: 80,
    type: 'physical',
    icon: <Dumbbell size={24} />,
    location: { lat: 12.9304, lng: 77.6784 }
  },
  {
    id: 9,
    title: 'Art Gallery Opening',
    description: 'Attend the contemporary art exhibition launch on MG Road.',
    reward: 90,
    type: 'physical',
    icon: <Palette size={24} />,
    location: { lat: 12.9738, lng: 77.6119 }
  },
  {
    id: 10,
    title: 'Bakehouse Line Simulation',
    description: 'Stand in line for 15 minutes at a new artisanal bakery in JP Nagar.',
    reward: 60,
    type: 'physical',
    icon: <Cake size={24} />,
    location: { lat: 12.9063, lng: 77.5855 }
  },
  {
    id: 11,
    title: 'Battle Royale Server Liquidity',
    description: 'Play 3 matches in the new "Apex Legends" season to boost matchmaking times.',
    reward: 60,
    type: 'digital',
    icon: <Gamepad2 size={24} />
  },
  {
    id: 12,
    title: 'Podcast "Listen-to-Earn"',
    description: 'Stream the 45-minute episode of "The Daily Hustle" and complete a 3-question quiz.',
    reward: 40,
    type: 'digital',
    icon: <Mic size={24} />
  }
];

const UserDashboard: React.FC = () => {
  const [balance, setBalance] = useState(120);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleAccept = (id: number, reward: number) => {
    if (!accepted.includes(id)) {
      setAccepted([...accepted, id]);
      setBalance(prev => prev + reward);
    }
  };

  const physicalBounties = mockBounties.filter(b => b.type === 'physical' && b.location);

  const { scrollYProgress } = useScroll();
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* ----- FLOATING 3D BACKGROUND DECORATIONS ----- */}
      <motion.div style={{ position: 'absolute', top: '10%', right: '-5%', width: '150px', height: '150px', zIndex: 0, opacity: 0.8, y: yParallax1 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GoldCoinModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '40%', left: '-8%', width: '200px', height: '200px', zIndex: 0, opacity: 0.5, y: yParallax2 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <TorusModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>
      
      <motion.div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '120px', height: '120px', zIndex: 0, opacity: 0.6, y: yParallax3 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <SparkleModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <div className="dashboard-header" style={{ position: 'relative', zIndex: 10 }}>
        <div>
          <h2>Earner Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Find active bounties and earn TimeCoins.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="view-toggle" style={{ display: 'flex', background: 'white', borderRadius: '12px', padding: '0.25rem', border: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: viewMode === 'list' ? 'var(--bg-primary)' : 'transparent',
                fontWeight: viewMode === 'list' ? 600 : 400,
                color: viewMode === 'list' ? 'var(--text-main)' : 'var(--text-muted)'
              }}
            >
              <List size={18} /> List
            </button>
            <button 
              onClick={() => setViewMode('map')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: viewMode === 'map' ? 'var(--bg-primary)' : 'transparent',
                fontWeight: viewMode === 'map' ? 600 : 400,
                color: viewMode === 'map' ? 'var(--text-main)' : 'var(--text-muted)'
              }}
            >
              <MapIcon size={18} /> Map
            </button>
          </div>

          <div className="wallet-card" style={{ padding: '1rem 1.5rem', gap: '1rem' }}>
            <Coins size={28} color="var(--accent-gold)" />
            <div>
              <div className="wallet-label" style={{ fontSize: '0.75rem' }}>Balance</div>
              <div className="wallet-amount" style={{ fontSize: '1.5rem' }}>{balance} TC</div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bounty-grid"
          >
            {mockBounties.map((bounty, index) => (
              <motion.div 
                key={bounty.id}
                className="bounty-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bounty-tag">
                  {bounty.type}
                </div>
                <div className="bounty-icon">
                  {bounty.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>{bounty.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{bounty.description}</p>
                
                <div className="bounty-footer">
                  <div className="bounty-reward">
                    <Coins size={16} />
                    {bounty.reward} TC
                  </div>
                  <button 
                    className="btn-accept"
                    onClick={() => handleAccept(bounty.id, bounty.reward)}
                    disabled={accepted.includes(bounty.id)}
                    style={{ 
                      backgroundColor: accepted.includes(bounty.id) ? '#10B981' : 'var(--text-main)'
                    }}
                  >
                    {accepted.includes(bounty.id) ? (
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><CheckCircle2 size={16}/> Accepted</span>
                    ) : (
                      'Accept Bounty'
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            style={{ 
              height: '600px', 
              width: '100%', 
              borderRadius: '20px', 
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <MapContainer 
              center={[12.95, 77.65]} // Adjusted center to show more of Bangalore
              zoom={12} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              {physicalBounties.map(bounty => bounty.location && (
                <Marker 
                  key={bounty.id} 
                  position={[bounty.location.lat, bounty.location.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    }
                  }}
                >
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    <div style={{ fontWeight: 'bold' }}>{bounty.title}</div>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{bounty.reward} TC</div>
                  </Tooltip>
                  <Popup>
                    <div style={{ fontFamily: 'var(--font-family)', minWidth: '200px' }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{bounty.title}</h4>
                      <p style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>{bounty.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>{bounty.reward} TC</span>
                        <button 
                          style={{
                            background: accepted.includes(bounty.id) ? '#10B981' : 'var(--text-main)',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                          }}
                          onClick={() => handleAccept(bounty.id, bounty.reward)}
                          disabled={accepted.includes(bounty.id)}
                        >
                          {accepted.includes(bounty.id) ? 'Accepted' : 'Accept'}
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDashboard;
