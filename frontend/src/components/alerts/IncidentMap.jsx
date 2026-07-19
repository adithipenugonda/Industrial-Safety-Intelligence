import { motion } from "framer-motion";
import { FiMap } from "react-icons/fi";

export default function IncidentMap({ incident }) {
  const isCritical = incident?.severity === "CRITICAL";
  const hazardColor = isCritical ? "#ef4444" : "#f59e0b"; // Red or Amber
  
  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden">
      <h3 className="text-brand-cyan text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2 z-10">
        <FiMap />
        Sector Topography
      </h3>
      
      <div className="flex-1 w-full relative flex items-center justify-center">
        {/* Background Grid Pattern inside the map */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMCAwaC0xTTAgMjB2LTFsMTktMTlWMHoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==')] opacity-50"></div>

        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px] z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          {/* Base Layout Outlines */}
          <g stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" fill="none">
            {/* Safe Zones */}
            <path d="M 50 50 L 150 50 L 150 150 L 50 150 Z" fill="rgba(34, 211, 238, 0.05)" />
            <path d="M 250 50 L 350 50 L 350 120 L 250 120 Z" fill="rgba(34, 211, 238, 0.05)" />
            <path d="M 50 180 L 180 180 L 180 280 L 50 280 Z" fill="rgba(34, 211, 238, 0.05)" />
          </g>

          {/* Connection Lines */}
          <g stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" strokeDasharray="4 4">
            <line x1="150" y1="100" x2="250" y2="100" />
            <line x1="115" y1="150" x2="115" y2="180" />
            <line x1="180" y1="230" x2="220" y2="230" />
          </g>

          {/* Affected Zone (Zone 4) */}
          <motion.g
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          >
            <path d="M 220 160 L 350 160 L 350 280 L 220 280 Z" fill={`${hazardColor}33`} stroke={hazardColor} strokeWidth="2" />
            
            {/* Pulsing center point */}
            <circle cx="285" cy="220" r="15" fill="none" stroke={hazardColor} strokeWidth="1" className="animate-ping" />
            <circle cx="285" cy="220" r="4" fill={hazardColor} />
            
            <text x="285" y="240" fill={hazardColor} fontSize="10" fontFamily="monospace" textAnchor="middle" className="uppercase tracking-widest font-bold">
              {incident?.sector || "SECTOR 7"}
            </text>
          </motion.g>

          {/* Safe Zone Labels */}
          <text x="100" y="105" fill="rgba(34, 211, 238, 0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">SECTOR 1</text>
          <text x="300" y="90" fill="rgba(34, 211, 238, 0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">SECTOR 2</text>
          <text x="115" y="235" fill="rgba(34, 211, 238, 0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">SECTOR 3</text>
          
          {/* Animated Propagation Lines from Affected Zone */}
          <motion.path 
            d="M 220 220 Q 180 200 150 140" 
            fill="none" 
            stroke={hazardColor} 
            strokeWidth="2"
            strokeDasharray="100"
            animate={{ strokeDashoffset: [100, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </svg>
      </div>
    </div>
  );
}
