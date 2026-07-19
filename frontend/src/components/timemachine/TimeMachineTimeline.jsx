import { motion } from "framer-motion";
import { FiPlay, FiPause, FiClock, FiAlertTriangle, FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TimeMachineTimeline({ snapshots, selectedIndex, setSelectedIndex, isPlaying, setIsPlaying }) {
  
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="glass-panel w-full px-6 py-4 flex flex-col gap-4 pointer-events-auto"
    >
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/mission-control" className="text-slate-400 hover:text-brand-cyan transition-colors flex items-center gap-1 text-xs font-mono uppercase tracking-widest border border-white/10 px-2 py-1 rounded hover:bg-white/5">
            <FiChevronLeft /> Exit
          </Link>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <FiClock className="text-brand-cyan animate-pulse" />
            <h3 className="text-brand-cyan font-bold tracking-widest uppercase font-orbitron text-sm">Time Machine</h3>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest ml-2 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              HISTORICAL PLAYBACK
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/50 px-4 py-1.5 rounded-full transition-all hover-scale"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          <span className="text-[10px] font-mono font-bold tracking-widest">{isPlaying ? 'PAUSE' : 'REPLAY'}</span>
        </button>
      </div>

      {/* Scrub Line */}
      <div className="relative flex items-center w-full h-12 mt-2">
        {/* Base Line */}
        <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full"></div>
        {/* Progress Line */}
        <motion.div 
          className="absolute left-0 h-1 bg-brand-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          initial={false}
          animate={{ width: `${(selectedIndex / (snapshots.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        ></motion.div>

        {/* Nodes */}
        <div className="absolute inset-0 flex justify-between items-center z-10 px-[2px]">
          {snapshots.map((snap, i) => {
            const isSelected = i === selectedIndex;
            const isPast = i < selectedIndex;
            return (
              <div 
                key={snap.id} 
                onClick={() => setSelectedIndex(i)}
                className="relative flex flex-col items-center cursor-pointer group"
              >
                {/* Node Point */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isSelected ? 1.5 : 1,
                    backgroundColor: isSelected ? "#22d3ee" : isPast ? "#0891b2" : "#1e293b",
                    borderColor: snap.risk === 'CRITICAL' && !isSelected ? "#ef4444" : isSelected ? "#22d3ee" : "#334155"
                  }}
                  className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    isSelected ? "shadow-[0_0_15px_rgba(34,211,238,1)]" : 
                    snap.risk === 'CRITICAL' ? "shadow-[0_0_10px_rgba(239,68,68,0.5)]" : ""
                  }`}
                >
                  {/* Pulse for critical unselected */}
                  {snap.risk === 'CRITICAL' && !isSelected && (
                    <span className="absolute inset-0 rounded-full animate-ping border border-status-danger opacity-75"></span>
                  )}
                </motion.div>
                
                {/* Time Label */}
                <span className={`absolute top-6 text-[10px] font-mono tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  isSelected ? "text-brand-cyan font-bold neon-text" : "text-slate-500 group-hover:text-slate-300"
                }`}>
                  {snap.time}
                </span>
                
                {/* Risk Icon */}
                <div className="absolute bottom-6 flex justify-center">
                  {snap.risk === 'CRITICAL' ? (
                    <FiAlertTriangle className="text-status-danger text-xs drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                  ) : snap.risk === 'WARN' ? (
                    <FiAlertTriangle className="text-status-warning text-xs" />
                  ) : (
                    <FiCheckCircle className="text-status-success/50 text-xs" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
