import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function OrbitalSensor({ 
  id,
  name, 
  type, 
  value, 
  unit, 
  status, 
  icon: Icon,
  angle,
  radius
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert polar coordinates to cartesian for the fixed orbital position
  // Assuming the container is centered (50% 50%)
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  // Determine colors based on status
  let statusColor, bgColor, borderColor;
  switch (status) {
    case 'CRITICAL':
      statusColor = 'text-status-danger';
      bgColor = 'bg-status-danger/20';
      borderColor = 'border-status-danger/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      break;
    case 'WARN':
      statusColor = 'text-status-warning';
      bgColor = 'bg-status-warning/20';
      borderColor = 'border-status-warning/40 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
      break;
    case 'NOMINAL':
    default:
      statusColor = 'text-brand-cyan';
      bgColor = 'bg-brand-cyan/10';
      borderColor = 'border-brand-cyan/30';
      break;
  }

  return (
    <>
      {/* Small Orbital Node */}
      <motion.div
        layoutId={`sensor-${id}`}
        className={`absolute glass-panel cursor-pointer flex flex-col items-center justify-center transition-colors hover:bg-white/5 ${borderColor} ${status === 'CRITICAL' ? 'animate-pulse' : ''}`}
        style={{
          width: '80px',
          height: '80px',
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%' // Circular node
        }}
        onClick={() => setIsExpanded(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div id={`sensor-anchor-${id}`} className="absolute w-1 h-1 bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
        
        <Icon className={`${statusColor} z-10 mb-1`} size={24} />
        <span className={`text-[10px] font-mono font-bold tracking-widest z-10 ${statusColor}`}>
          {value}
        </span>
      </motion.div>

      {/* Expanded Detailed View (Overlay) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              layoutId={`sensor-${id}`}
              className={`glass-panel p-8 w-[400px] border ${borderColor} rounded-xl shadow-2xl bg-[#050816]/90`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${bgColor} border border-white/10`}>
                    <Icon className={statusColor} size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{name}</h2>
                    <span className="text-xs text-slate-400 font-mono tracking-[0.2em] uppercase">{type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex justify-between items-end mb-8">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-widest">Current Reading</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-orbitron font-bold tracking-tight ${statusColor}`}>{value}</span>
                    <span className="text-lg text-slate-400 font-mono">{unit}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 text-xs font-mono font-bold tracking-[0.2em] rounded border ${bgColor} ${borderColor} ${statusColor}`}>
                  {status}
                </div>
              </div>

              {/* Placeholder for detailed chart - we could pass sparkline data here in the future */}
              <div className="w-full h-[150px] bg-black/30 rounded border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMCAwaC0xTTAgMjB2LTFsMTktMTlWMHoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
                <span className="text-slate-500 font-mono text-xs tracking-widest">DETAILED METRICS LOADING...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
