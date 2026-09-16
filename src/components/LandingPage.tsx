import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, MonitorPlay, ShieldCheck, Coins } from 'lucide-react';

interface LandingPageProps {
  setView: (view: 'home' | 'user' | 'business') => void;
}

// ----------------- 3D MODELS -----------------

const HourglassModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshPhysicalMaterial color="#FEF3C7" transparent opacity={0.4} roughness={0.1} metalness={0.1} transmission={0.9} ior={1.5} />
      </mesh>
      <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshPhysicalMaterial color="#FEF3C7" transparent opacity={0.4} roughness={0.1} metalness={0.1} transmission={0.9} ior={1.5} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.8} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 1, 32]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI * (2/3)) * 1.1, 0, Math.sin(i * Math.PI * (2/3)) * 1.1]}>
          <cylinderGeometry args={[0.05, 0.05, 4.3, 16]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const GoldCoinModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 1;
    }
  });
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const CrystalModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8;
      ref.current.rotation.z += delta * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={3} floatIntensity={3}>
      <mesh ref={ref}>
        <octahedronGeometry args={[1.2]} />
        <meshPhysicalMaterial color="#3B82F6" transparent opacity={0.8} roughness={0} metalness={0.1} transmission={1} />
      </mesh>
    </Float>
  );
};

const TorusModel = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
    }
  });
  return (
    <Float speed={2} rotationIntensity={4} floatIntensity={2}>
      <mesh ref={ref}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#10B981" metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

// ----------------- MAIN COMPONENT -----------------

const LandingPage: React.FC<LandingPageProps> = ({ setView }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax calculations for floating objects
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div className="landing-page" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* ----- BACKGROUND FLOATING 3D OBJECTS ----- */}
      <motion.div style={{ position: 'absolute', top: '20%', left: '5%', width: '200px', height: '200px', zIndex: 0, y: yParallax1 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GoldCoinModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '60%', right: '5%', width: '250px', height: '250px', zIndex: 0, y: yParallax2 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <CrystalModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '140%', left: '10%', width: '200px', height: '200px', zIndex: 0, y: yParallax3 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <TorusModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>


      {/* ----- HERO SECTION ----- */}
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '0 10%', position: 'relative', zIndex: 10 }}>
        
        <motion.div 
          className="hero-content" 
          style={{ flex: 1, y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--accent-gold-light)', color: 'var(--accent-gold-hover)', borderRadius: '50px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            THE FUTURE OF ATTENTION 🚀
          </div>
          <h1 style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Turn Your <br /> Time Into a <br />
            <span>Tradeable Asset</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '500px', lineHeight: 1.6 }}>
            Chronos acts as a time arbitrage engine. We buy your surplus time with digital rewards, and sell guaranteed, high-intent audiences to experiential businesses.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '1.5rem' }}>
            <button className="btn-primary" onClick={() => setView('user')} style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Start Earning
            </button>
            <button className="btn-secondary" onClick={() => setView('business')} style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Boost My Business
            </button>
          </div>
        </motion.div>

        {/* Hero Interactive 3D Hourglass */}
        <motion.div 
          className="hero-3d" 
          style={{ flex: 1, height: '80vh', position: 'relative' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PresentationControls 
              global 
              config={{ mass: 2, tension: 500 }} 
              snap={{ mass: 4, tension: 1500 }} 
              rotation={[0, 0.3, 0]} 
              polar={[-Math.PI / 3, Math.PI / 3]} 
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <HourglassModel />
              </Float>
            </PresentationControls>
            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <Environment preset="city" />
          </Canvas>
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, opacity: 0.6, pointerEvents: 'none' }}>
            [ Click & Drag to Rotate ]
          </div>
        </motion.div>
      </section>

      {/* ----- HOW IT WORKS SECTION ----- */}
      <section style={{ padding: '8rem 10%', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>How Chronos Works</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
            We've built a dual-sided engine that validates human engagement across both physical spaces and digital platforms seamlessly.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          
          {/* Physical Track */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ padding: '3rem', background: 'white', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-gold-light)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>The Physical Engine</h3>
            </div>
            
            <div className="steps" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--border-color)' }}>01</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Accept a Geofenced Bounty</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Find an empty local cafe or real estate open house on the map that needs immediate footfall.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--border-color)' }}>02</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verify Presence</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Scan the rotating, time-decayed QR code at the venue door to securely check-in without GPS spoofing.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--border-color)' }}>03</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Provide Visual Proof</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Stay for the required "Dwell Time" (e.g. 45 mins) to build organic hype and earn your TimeCoins.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Digital Track */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ padding: '3rem', background: '#0F172A', color: 'white', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MonitorPlay size={24} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>The Digital Engine</h3>
            </div>
            
            <div className="steps" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>01</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>Trigger the Algorithm</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Select a digital bounty like a new OTT series premiere or a multiplayer game needing server liquidity.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>02</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>Attention Checks</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Prevent "AFK Farming" by passing randomized screen prompts or post-stream quizzes to prove engagement.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>03</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>Seed the Network</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Help creators hit the "Top 10 Trending" lists organically in the critical first 24-hours and get paid.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----- REWARDS SECTION ----- */}
      <section style={{ padding: '8rem 10%', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ background: 'var(--accent-gold-light)', borderRadius: '32px', padding: '5rem 3rem', border: '1px solid var(--accent-gold)' }}
        >
          <Coins size={64} color="var(--accent-gold)" style={{ margin: '0 auto 2rem auto' }} />
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Redeem for Real World Utilities</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-main)', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Convert your earned TimeCoins into micro-utilities that matter. Mobile data, Zomato fee waivers, subsidized movie tickets, or premium upskilling courses.
          </p>
          <button className="btn-primary" onClick={() => setView('user')} style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
            View Earner Dashboard
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;
