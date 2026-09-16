import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Coins, MonitorPlay, Users, CheckCircle2, List, Map as MapIcon, ShoppingBag, Home, Gamepad2, Mic, Coffee, Dumbbell, Palette, Cake, BookOpen, GraduationCap, Building2, Ticket, Car, Music, Gift } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { GoldCoinModel, TorusModel, SparkleModel, GearKnotModel, GemModel } from './ThreeModels';

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
  },
  {
    id: 13,
    title: 'VIT FC Canteen Rush',
    description: 'Occupy empty seats at the Food Court to drive early crowd momentum and social proof.',
    reward: 50,
    type: 'physical',
    icon: <Coffee size={24} />,
    location: { lat: 12.9450, lng: 77.6400 } // Placed in central view for prototype visibility
  },
  {
    id: 14,
    title: 'GDSC Tech Club Induction',
    description: 'Attend the GDSC club orientation in the Main Auditorium to guarantee a full house.',
    reward: 100,
    type: 'physical',
    icon: <Users size={24} />,
    location: { lat: 12.9550, lng: 77.6600 }
  },
  {
    id: 15,
    title: 'Faculty AI/ML Guest Lecture',
    description: 'Fill the empty front rows for the visiting professor\'s lecture at SJT building.',
    reward: 80,
    type: 'physical',
    icon: <GraduationCap size={24} />,
    location: { lat: 12.9400, lng: 77.6550 }
  },
  {
    id: 16,
    title: 'Library Study Vibe',
    description: 'Sit in the Central Library reading hall to establish a focused study environment.',
    reward: 70,
    type: 'physical',
    icon: <BookOpen size={24} />,
    location: { lat: 12.9600, lng: 77.6450 }
  },
  {
    id: 17,
    title: 'Riviera Fest App Testing',
    description: 'Download the new campus fest app and keep it open for 10 minutes for server load testing.',
    reward: 45,
    type: 'digital',
    icon: <MonitorPlay size={24} />
  }
];

const mockRewards = [
  { id: 1, title: 'FC Meal Voucher', description: 'Redeem for one free meal at the Food Court.', cost: 200, icon: <Coffee size={24}/>, brand: 'Campus Canteen' },
  { id: 2, title: 'Spotify Premium (1M)', description: 'Ad-free music streaming for a month.', cost: 1200, icon: <Music size={24}/>, brand: 'Spotify' },
  { id: 3, title: 'Zomato Free Delivery', description: 'Free delivery on your next 3 orders.', cost: 300, icon: <ShoppingBag size={24}/>, brand: 'Zomato' },
  { id: 4, title: 'Alumni Mentorship', description: '30-minute resume review with a top-tier alumni.', cost: 800, icon: <Users size={24}/>, brand: 'Chronos Exclusive' },
  { id: 5, title: 'Tech Fest VIP Pass', description: 'Skip the lines at the pro-shows.', cost: 2500, icon: <Ticket size={24}/>, brand: 'Campus Fest' },
  { id: 6, title: 'Uber 20% Off', description: 'Discount on your next ride to the railway station.', cost: 400, icon: <Car size={24}/>, brand: 'Uber' },
];

const UserDashboard: React.FC = () => {
  const [balance, setBalance] = useState(120);
  const [accepted, setAccepted] = useState<number[]>([]);
  const [redeemed, setRedeemed] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards'>('tasks');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [verifyingBounty, setVerifyingBounty] = useState<typeof mockBounties[0] | null>(null);
  const [verificationStep, setVerificationStep] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleAcceptClick = (bounty: typeof mockBounties[0]) => {
    if (!accepted.includes(bounty.id)) {
      setVerifyingBounty(bounty);
      setVerificationStep('idle');
    }
  };

  const handleConfirmVerification = () => {
    setVerificationStep('processing');
    setTimeout(() => {
      setVerificationStep('success');
      setTimeout(() => {
        if (verifyingBounty) {
          setAccepted(prev => [...prev, verifyingBounty.id]);
          setBalance(prev => prev + verifyingBounty.reward);
        }
        setVerifyingBounty(null);
      }, 1500);
    }, 2000);
  };

  const handleRedeem = (rewardId: number, cost: number) => {
    if (balance >= cost && !redeemed.includes(rewardId)) {
      setBalance(prev => prev - cost);
      setRedeemed(prev => [...prev, rewardId]);
    }
  };

  const physicalBounties = mockBounties.filter(b => b.type === 'physical' && b.location);

  const { scrollYProgress } = useScroll();
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yParallax4 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yParallax5 = useTransform(scrollYProgress, [0, 1], [0, -150]);

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

      <motion.div style={{ position: 'absolute', top: '70%', left: '2%', width: '160px', height: '160px', zIndex: 0, opacity: 0.5, y: yParallax4 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GearKnotModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', bottom: '5%', left: '40%', width: '140px', height: '140px', zIndex: 0, opacity: 0.4, y: yParallax5 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GemModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <div className="dashboard-header" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Earner Dashboard</h2>
            <p style={{ color: 'var(--text-muted)' }}>Find active tasks and earn TimeCoins.</p>
          </div>
          
          <div className="wallet-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-primary)', padding: '0.75rem 1.5rem', borderRadius: '15px', border: '1px solid var(--accent-gold-light)' }}>
            <Coins color="var(--accent-gold)" size={28} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>TimeCoin Balance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{balance} TC</div>
            </div>
          </div>
        </div>

        {/* --- TABS: TASKS vs REWARDS --- */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('tasks')}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeTab === 'tasks' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: activeTab === 'tasks' ? '3px solid var(--accent-gold)' : '3px solid transparent',
              marginBottom: '-10px',
              transition: 'all 0.2s'
            }}
          >
            Available Tasks
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: activeTab === 'rewards' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: activeTab === 'rewards' ? '3px solid var(--accent-gold)' : '3px solid transparent',
              marginBottom: '-10px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Gift size={20}/> Rewards Marketplace
          </button>
        </div>
        
        {activeTab === 'tasks' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
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
                  color: viewMode === 'list' ? 'var(--text-main)' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer'
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
                  color: viewMode === 'map' ? 'var(--text-main)' : 'var(--text-muted)',
                  border: 'none', cursor: 'pointer'
                }}
              >
                <MapIcon size={18} /> Map
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === 'rewards' ? (
        <motion.div 
          key="rewards-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bounty-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {mockRewards.map((reward, index) => (
            <motion.div 
              key={reward.id}
              className="bounty-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--accent-gold-light)', padding: '0.5rem', borderRadius: '12px', color: 'var(--accent-gold)' }}>
                  {reward.icon}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {reward.brand}
                </div>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{reward.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>{reward.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 800, color: 'var(--accent-gold)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {reward.cost} TC
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => handleRedeem(reward.id, reward.cost)}
                  disabled={redeemed.includes(reward.id) || balance < reward.cost}
                  style={{ 
                    background: redeemed.includes(reward.id) ? '#10B981' : (balance < reward.cost ? 'var(--border-color)' : 'var(--text-main)'),
                    color: balance < reward.cost && !redeemed.includes(reward.id) ? 'var(--text-muted)' : 'white',
                    border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: balance < reward.cost ? 'not-allowed' : 'pointer'
                  }}
                >
                  {redeemed.includes(reward.id) ? 'Redeemed' : (balance < reward.cost ? 'Need more TC' : 'Redeem')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div 
              key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bounty-grid"
          >
            {[...mockBounties].reverse().map((bounty, index) => (
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
                    onClick={() => handleAcceptClick(bounty)}
                    disabled={accepted.includes(bounty.id)}
                    style={{ 
                      backgroundColor: accepted.includes(bounty.id) ? '#10B981' : 'var(--text-main)'
                    }}
                  >
                    {accepted.includes(bounty.id) ? (
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><CheckCircle2 size={16}/> Accepted</span>
                    ) : (
                      'Accept Task'
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
                          onClick={() => handleAcceptClick(bounty)}
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
      )}
      
      {/* ----- VERIFICATION MODAL ----- */}
      <AnimatePresence>
        {verifyingBounty && (
          <motion.div 
            className="verification-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div 
              className="verification-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
                {verifyingBounty.type === 'physical' ? <MapIcon size={40} /> : <MonitorPlay size={40} />}
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{verifyingBounty.title}</h3>
              
              {verificationStep === 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    {verifyingBounty.type === 'physical' 
                      ? 'To start earning TimeCoins for this location, please scan the venue\'s unique Chronos QR Code to verify your presence.'
                      : 'To start earning TimeCoins, please connect your platform ID so we can verify your engagement metrics.'}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                      className="btn-secondary" 
                      onClick={() => setVerifyingBounty(null)}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn-primary" 
                      onClick={handleConfirmVerification}
                      style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: 'var(--text-main)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      {verifyingBounty.type === 'physical' ? 'Scan QR Code' : 'Connect Account'}
                    </button>
                  </div>
                </motion.div>
              )}

              {verificationStep === 'processing' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem 0' }}>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ width: '40px', height: '40px', border: '4px solid #FEF3C7', borderTopColor: 'var(--accent-gold)', borderRadius: '50%', margin: '0 auto 1.5rem' }}
                  />
                  <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>
                    {verifyingBounty.type === 'physical' ? 'Verifying geo-location...' : 'Authenticating profile...'}
                  </p>
                </motion.div>
              )}

              {verificationStep === 'success' && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ padding: '2rem 0' }}
                >
                  <div style={{ color: '#10B981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle2 size={64} />
                  </div>
                  <h3 style={{ color: '#10B981', marginBottom: '0.5rem' }}>Verified!</h3>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>+{verifyingBounty.reward} TC secured.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserDashboard;
