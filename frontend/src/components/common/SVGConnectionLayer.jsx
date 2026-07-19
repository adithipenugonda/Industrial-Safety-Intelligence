import { motion } from "framer-motion";

export default function SVGConnectionLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Center to Top (Status) */}
        <motion.line 
          x1="50%" y1="50%" x2="50%" y2="15%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Center to Left (Telemetry) */}
        <motion.line 
          x1="50%" y1="50%" x2="20%" y2="35%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        {/* Center to Right (Threat Matrix) */}
        <motion.line 
          x1="50%" y1="50%" x2="80%" y2="35%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />

        {/* Center to Bottom Left (Weather) */}
        <motion.line 
          x1="50%" y1="50%" x2="25%" y2="70%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.1, ease: "easeInOut" }}
        />

        {/* Center to Bottom Right (AI Advisor) */}
        <motion.line 
          x1="50%" y1="50%" x2="75%" y2="70%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Center to Bottom (Timeline) */}
        <motion.line 
          x1="50%" y1="50%" x2="50%" y2="85%" 
          stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="5,5" filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
