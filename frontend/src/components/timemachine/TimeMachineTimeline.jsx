import { motion } from "framer-motion";
import { FiPlay, FiPause, FiClock, FiAlertTriangle, FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TimeMachineTimeline({ 
  snapshots = [], 
  selectedIndex = 0, 
  setSelectedIndex, 
  onSelectSnapshot, 
  isPlaying = false, 
  setIsPlaying, 
  onTogglePlay 
}) {
  const handleSelect = (index) => {
    if (onSelectSnapshot) onSelectSnapshot(index);
    if (setSelectedIndex) setSelectedIndex(index);
  };

  const handlePlayToggle = () => {
    if (onTogglePlay) onTogglePlay();
    if (setIsPlaying) setIsPlaying(!isPlaying);
  };

  const currentSnap = snapshots[selectedIndex] || snapshots[0];
  const currentRisk = currentSnap?.risk || 'LOW';

  // Dynamic bar colors based on risk severity
  const activeColor = currentRisk === 'CRITICAL' 
    ? '#ef4444' 
    : currentRisk === 'WARN' 
    ? '#f59e0b' 
    : '#34d399';

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="glass-panel w-full px-6 py-4 flex flex-col gap-3 pointer-events-auto select-none font-mono border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)] rounded-xl"
    >
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/mission-control" className="text-slate-300 hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 shadow-md">
            <FiChevronLeft size={14} /> Exit
          </Link>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <FiClock style={{ color: activeColor }} className="animate-pulse" size={16} />
            <h3 style={{ color: activeColor }} className="font-bold tracking-widest uppercase font-orbitron text-sm transition-colors">
              Time Machine
            </h3>
            <span className="text-[10px] text-slate-300 font-mono tracking-widest ml-2 bg-white/10 px-2.5 py-0.5 rounded border border-white/10">
              HISTORICAL PLAYBACK
            </span>
          </div>
        </div>
        
        <button 
          type="button"
          onClick={handlePlayToggle}
          style={{ borderColor: activeColor, color: activeColor }}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/15 border px-5 py-1.5 rounded-full transition-all cursor-pointer shadow-md"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          <span className="text-[10px] font-mono font-bold tracking-widest">{isPlaying ? 'PAUSE' : 'REPLAY'}</span>
        </button>
      </div>

      {/* Dynamic Scrub Line */}
      <div className="relative flex items-center w-full h-12 mt-1">
        {/* Base Track */}
        <div className="absolute left-0 right-0 h-1.5 bg-white/10 rounded-full cursor-pointer" />
        
        {/* Dynamic Progress Line with Color matching Severity */}
        <motion.div 
          className="absolute left-0 h-1.5 rounded-full transition-colors duration-500"
          style={{ 
            backgroundColor: activeColor, 
            boxShadow: `0 0 15px ${activeColor}` 
          }}
          initial={false}
          animate={{ width: `${(selectedIndex / Math.max(snapshots.length - 1, 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />

        {/* Interactive Snapshot Nodes */}
        <div className="absolute inset-0 flex justify-between items-center z-10 px-[2px]">
          {snapshots.map((snap, i) => {
            const isSelected = i === selectedIndex;
            const isPast = i < selectedIndex;
            const nodeColor = snap.risk === 'CRITICAL' ? '#ef4444' : snap.risk === 'WARN' ? '#f59e0b' : '#34d399';
            
            return (
              <div 
                key={snap.id || i} 
                onClick={() => handleSelect(i)}
                className="relative flex flex-col items-center cursor-pointer group"
              >
                {/* Risk Icon */}
                <div className="absolute bottom-6 flex justify-center">
                  {snap.risk === 'CRITICAL' ? (
                    <FiAlertTriangle className="text-red-400 text-xs drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-bounce" />
                  ) : snap.risk === 'WARN' ? (
                    <FiAlertTriangle className="text-amber-400 text-xs" />
                  ) : (
                    <FiCheckCircle className="text-emerald-400 text-xs" />
                  )}
                </div>

                {/* Node Dot */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isSelected ? 1.6 : 1,
                    backgroundColor: isSelected ? nodeColor : isPast ? "#0284c7" : "#0f172a",
                    borderColor: nodeColor
                  }}
                  className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    isSelected ? `shadow-[0_0_20px_${nodeColor}]` : ""
                  }`}
                >
                  {snap.risk === 'CRITICAL' && !isSelected && (
                    <span className="absolute inset-0 rounded-full animate-ping border border-red-500 opacity-75" />
                  )}
                </motion.div>
                
                {/* Time Label */}
                <span 
                  style={{ color: isSelected ? nodeColor : undefined }}
                  className={`absolute top-6 text-[10px] font-mono tracking-wider whitespace-nowrap transition-colors duration-300 ${
                    isSelected ? "font-bold font-orbitron" : "text-slate-400 group-hover:text-white"
                  }`}
                >
                  {snap.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
