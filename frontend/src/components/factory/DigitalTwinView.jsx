import { motion } from "framer-motion";
import { FiHexagon, FiZap, FiUsers } from "react-icons/fi";
import { FaIndustry } from "react-icons/fa";

export default function DigitalTwinView({
  riskLevel = "ELEVATED",
  coreLoad = "2.4",
  personnel = 148,
  status = "LIVE TWIN",
  pulseColor = "rgba(34,211,238,0.2)",
  ringColor = "brand-cyan",
  warningLevel = "status-warning"
}) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[120%] h-[120%] animate-pulse" style={{ background: `radial-gradient(circle at center, ${pulseColor} 0%, transparent 60%)` }} />
      </div>

      {/* Hologram Rings */}
      <div className="relative flex items-center justify-center w-64 h-64">
        
        {/* Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute w-full h-full rounded-full border border-${ringColor}/20 border-dashed`}
        />

        {/* Middle Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute w-4/5 h-4/5 rounded-full border border-${ringColor}/40`}
          style={{ borderTopStyle: 'dashed', borderBottomStyle: 'dotted' }}
        />

        {/* Inner Ring (Pulsing) */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute w-3/5 h-3/5 rounded-full border-2 border-${ringColor} flex items-center justify-center`}
          style={{ boxShadow: `0 0 15px var(--color-${ringColor}, rgba(34,211,238,0.5))` }}
        >
          {/* Inner glowing core */}
          <div className={`absolute w-full h-full bg-${ringColor}/10 rounded-full blur-md`} />
        </motion.div>

        {/* Center Factory Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`relative z-10 text-${ringColor} flex flex-col items-center justify-center`}
        >
          <FaIndustry size={40} style={{ filter: `drop-shadow(0 0 10px var(--color-${ringColor}, #22d3ee))` }} />
        </motion.div>
        
        {/* Orbiting Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full pointer-events-none"
        >
          <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-${ringColor} rounded-full`} style={{ boxShadow: `0 0 8px var(--color-${ringColor}, #22d3ee)` }} />
        </motion.div>

        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-4/5 h-4/5 pointer-events-none"
        >
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,1)]" />
        </motion.div>

      </div>

      {/* Floating HUD Elements */}
      
      {/* Top Left: Live Status */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 glass-panel px-3 py-1.5 flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${ringColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${ringColor}`}></span>
        </span>
        <span className={`text-[10px] font-mono text-${ringColor} tracking-widest uppercase`}>{status}</span>
      </motion.div>

      {/* Top Right: Risk Level */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-4 right-4 glass-panel px-3 py-1.5 flex flex-col items-end"
      >
        <span className="text-[10px] font-mono text-slate-400 tracking-wider">RISK LEVEL</span>
        <div className="flex items-center gap-1.5">
          <FiHexagon className={`text-${warningLevel}`} size={12} />
          <span className={`text-xs font-bold text-${warningLevel} ${warningLevel === 'status-danger' ? 'neon-text-danger' : ''} shadow-none tracking-widest`}>{riskLevel}</span>
        </div>
      </motion.div>

      {/* Bottom Left: Power Draw */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-4 left-4 glass-panel px-3 py-2 flex flex-col"
      >
        <div className="flex items-center gap-1.5 mb-1 text-slate-400">
          <FiZap size={10} />
          <span className="text-[10px] font-mono tracking-wider">CORE LOAD</span>
        </div>
        <span className="text-sm font-orbitron font-bold text-slate-200">{coreLoad} <span className="text-xs text-brand-cyan">TW</span></span>
      </motion.div>

      {/* Bottom Right: Active Personnel */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 right-4 glass-panel px-3 py-2 flex flex-col items-end"
      >
        <div className="flex items-center gap-1.5 mb-1 text-slate-400">
          <FiUsers size={10} />
          <span className="text-[10px] font-mono tracking-wider">PERSONNEL</span>
        </div>
        <span className="text-sm font-orbitron font-bold text-slate-200">{personnel} <span className="text-xs text-brand-cyan">ACTIVE</span></span>
      </motion.div>

    </div>
  );
}
