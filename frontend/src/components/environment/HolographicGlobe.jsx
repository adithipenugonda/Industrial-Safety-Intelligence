import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HolographicGlobe() {
  const [heatNodes, setHeatNodes] = useState([]);
  const [windVectors, setWindVectors] = useState([]);
  const [rainStreaks, setRainStreaks] = useState([]);
  
  useEffect(() => {
    // Heat signatures
    setHeatNodes(Array.from({ length: 5 }, (_, i) => ({
      id: `heat-${i}`,
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
      scale: 1 + Math.random(),
      delay: Math.random() * 5
    })));

    // Wind vectors (small curved lines that move across)
    setWindVectors(Array.from({ length: 8 }, (_, i) => ({
      id: `wind-${i}`,
      top: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 5
    })));

    // Rain streaks inside the globe
    setRainStreaks(Array.from({ length: 15 }, (_, i) => ({
      id: `rain-${i}`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.5
    })));
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-brand-cyan/10 blur-2xl"></div>

      {/* Pulsing Energy Waves */}
      <motion.div 
        animate={{ scale: [1, 1.4, 2], opacity: [0.5, 0.2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-brand-cyan/30 pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.4, 2], opacity: [0.5, 0.2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
        className="absolute inset-0 rounded-full border border-brand-cyan/20 pointer-events-none"
      />

      {/* Orbit Rings (Scan lines) */}
      <motion.div 
        animate={{ rotateX: 75, rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[120%] h-[120%] rounded-full border border-brand-cyan/30 border-dashed pointer-events-none drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
      />
      <motion.div 
        animate={{ rotateX: 65, rotateY: 20, rotateZ: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[110%] h-[110%] rounded-full border border-brand-cyan/20 pointer-events-none drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]"
      />

      {/* The Globe Sphere */}
      <div className="relative w-full h-full rounded-full border border-brand-cyan/50 overflow-hidden shadow-[inset_0_0_60px_rgba(34,211,238,0.3)] bg-factory-bg-base">
        
        {/* Animated Latitude/Longitude Grid Pattern */}
        <motion.div 
          className="absolute inset-0 w-[200%] h-full opacity-40"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        />

        {/* Pseudo-Curvature (Inner Shadow) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_-30px_-30px_60px_rgba(0,0,0,0.9),inset_20px_20px_40px_rgba(255,255,255,0.1)] pointer-events-none z-20"></div>

        {/* Pollution Dispersion Overlay */}
        <motion.div 
          className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4 bg-[radial-gradient(circle,rgba(100,116,139,0.2)_0%,transparent_60%)] mix-blend-screen pointer-events-none"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Environmental Heat Maps (Shimmering) */}
        {heatNodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute w-24 h-24 bg-status-danger/40 rounded-full blur-2xl mix-blend-screen z-10"
            style={{ top: node.top, left: node.left }}
            animate={{ 
              opacity: [0.2, 0.7, 0.2],
              scale: [node.scale, node.scale * 1.5, node.scale],
              x: [0, 30, 0],
              filter: ["blur(16px)", "blur(24px)", "blur(16px)"] // Heat shimmer
            }}
            transition={{ duration: 6, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Wind Vector Particles */}
        {windVectors.map(wind => (
          <motion.div
            key={wind.id}
            className="absolute h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-cyan/80 to-transparent z-10"
            style={{ top: wind.top }}
            animate={{ 
              left: ["-20%", "120%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: wind.duration, repeat: Infinity, delay: wind.delay, ease: "linear" }}
          />
        ))}

        {/* Rain Streaks */}
        {rainStreaks.map(rain => (
          <motion.div
            key={rain.id}
            className="absolute w-[1px] h-8 bg-gradient-to-b from-transparent to-blue-400/60 z-10"
            style={{ left: rain.left }}
            animate={{ 
              top: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: rain.duration, repeat: Infinity, delay: rain.delay, ease: "linear" }}
          />
        ))}

        {/* Lightning Flashes */}
        <motion.div 
          className="absolute inset-0 bg-white/20 mix-blend-overlay z-10 pointer-events-none"
          animate={{ opacity: [0, 0, 0, 0.8, 0, 0.4, 0, 0, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", times: [0, 0.8, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 1] }}
        />

        {/* Animated Cloud Layers */}
        <motion.div 
          className="absolute inset-0 w-[200%] h-full opacity-30 z-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.2) 0%, transparent 30%)',
            backgroundSize: '100% 100%'
          }}
        />

        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60 z-20"></div>
      </div>

      {/* Central Anchor for Data Lines */}
      <div id="globe-anchor" className="absolute top-1/2 left-1/2 w-1 h-1 bg-transparent -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
