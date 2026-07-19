import { motion } from "framer-motion";

export default function FactoryCore() {
  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      
      {/* Outer Holographic Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[320px] h-[320px] rounded-full border border-brand-cyan/20 border-dashed"
      />
      
      {/* Inner Holographic Ring (Counter Rotate) */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[240px] h-[240px] rounded-full border border-brand-cyan/30 border-dotted"
      />

      {/* Core Energy Pulse Base */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[180px] h-[180px] rounded-full bg-brand-cyan/10 blur-xl"
      />

      {/* The Factory Digital Twin SVG */}
      <motion.div 
        animate={{ 
          scale: [1, 1.02, 1],
          filter: ['drop-shadow(0 0 10px rgba(34,211,238,0.3))', 'drop-shadow(0 0 20px rgba(34,211,238,0.6))', 'drop-shadow(0 0 10px rgba(34,211,238,0.3))']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[160px] h-[160px] text-brand-cyan"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90 drop-shadow-md">
          {/* Futuristic Base */}
          <path d="M10 80 L90 80 L80 90 L20 90 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1"/>
          
          {/* Main Building Structure */}
          <rect x="25" y="45" width="50" height="35" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1"/>
          
          {/* Industrial Pipes / Pillars */}
          <rect x="35" y="30" width="8" height="15" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1"/>
          <rect x="57" y="25" width="8" height="20" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1"/>
          
          {/* Roof Line */}
          <path d="M20 45 L50 35 L80 45 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1"/>
          
          {/* Scanning Line overlay */}
          <motion.line 
            x1="10" y1="20" x2="90" y2="20" 
            stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.5"
            animate={{ y: [20, 85, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Grid lines inside */}
          <line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="40" y1="45" x2="40" y2="80" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="60" y1="45" x2="60" y2="80" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"/>
        </svg>
      </motion.div>

      {/* Center Anchor Point for connection lines */}
      <div id="factory-core-anchor" className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0"></div>
    </div>
  );
}
