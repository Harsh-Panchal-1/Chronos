import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CrystalModel, TorusModel, SparkleModel, GearKnotModel, GlassOrbModel } from './ThreeModels';
import { BarChart3, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const BusinessDashboard: React.FC = () => {
  const [launched, setLaunched] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax for 3D elements
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallax4 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yParallax5 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunched(true);
    setTimeout(() => setLaunched(false), 3000);
  };

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh' }}
    >
      {/* ----- FLOATING 3D BACKGROUND DECORATIONS ----- */}
      <motion.div style={{ position: 'absolute', top: '5%', right: '5%', width: '180px', height: '180px', zIndex: 0, opacity: 0.7, y: yParallax1 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <CrystalModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '50%', left: '-5%', width: '220px', height: '220px', zIndex: 0, opacity: 0.4, y: yParallax2 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <TorusModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>
      
      <motion.div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '100px', height: '100px', zIndex: 0, opacity: 0.8, y: yParallax3 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <SparkleModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '70%', left: '8%', width: '160px', height: '160px', zIndex: 0, opacity: 0.6, y: yParallax4 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GearKnotModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      <motion.div style={{ position: 'absolute', bottom: '2%', right: '35%', width: '140px', height: '140px', zIndex: 0, opacity: 0.5, y: yParallax5 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <GlassOrbModel />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      {/* ----- FOREGROUND CONTENT ----- */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={32} color="var(--accent-gold)" /> Partner Dashboard
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Launch campaigns to drive guaranteed audience engagement.</p>
          </div>
        </motion.div>

        <motion.div 
          className="metrics-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div 
            className="metric-card"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <BarChart3 size={20} />
            </div>
            <h4>Active Campaigns</h4>
            <div className="value">2</div>
          </motion.div>

          <motion.div 
            className="metric-card"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderColor: 'var(--accent-gold-light)', background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF3C7 100%)' }}
          >
            <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
              <Users size={20} />
            </div>
            <h4>Footfall Generated</h4>
            <div className="value highlight">1,240</div>
          </motion.div>

          <motion.div 
            className="metric-card"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>
              <Clock size={20} />
            </div>
            <h4>Avg. Dwell Time</h4>
            <div className="value">45m</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form className="campaign-form" onSubmit={handleLaunch} style={{ position: 'relative', overflow: 'hidden' }}>
            
            {/* Background pattern for form */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, var(--accent-gold-light) 0%, transparent 70%)', opacity: 0.5, zIndex: 0, pointerEvents: 'none', transform: 'translate(30%, -30%)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Create New Campaign <ArrowRight size={20} color="var(--accent-gold)" />
              </h3>
              
              <div className="form-group">
                <label>Campaign Type</label>
                <select defaultValue="physical">
                  <option value="physical">Physical Footfall (Venue)</option>
                  <option value="digital">Digital Attention (App/Web)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Target Audience Size</label>
                <input type="number" placeholder="e.g., 50" required />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <input type="text" placeholder="e.g., 2:00 PM - 4:00 PM" required />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', marginTop: '1rem', background: launched ? '#10B981' : 'var(--text-main)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                {launched ? <><CheckCircle2 size={20} /> Campaign Launched!</> : 'Launch Campaign & Fund Task'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusinessDashboard;
