import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiX, FiTrendingUp, FiAlertOctagon, FiCpu } from "react-icons/fi";

export default function AtmosphericNode({ 
  id,
  name, 
  value, 
  unit, 
  status, 
  icon: Icon,
  angle,
  radius
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Convert polar coordinates to cartesian for the fixed orbital position
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  // Simulate random data updates that cause a border pulse
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const impactMapping = {
    'CRITICAL': 'SEVERE OPERATIONAL RISK. MANDATORY LOCKDOWN OF AFFECTED SECTORS.',
    'WARN': 'MODERATE RISK. RESTRICT OUTDOOR MAINTENANCE OPERATIONS.',
    'NOMINAL': 'NO IDENTIFIED HAZARDS. OPTIMAL OPERATING CONDITIONS.'
  };

  return (
    <>
      <motion.div
        layoutId={`atmos-node-${id}`}
        className={`absolute glass-panel cursor-pointer flex items-center justify-center transition-colors hover:bg-white/10 ${borderColor} ${status === 'CRITICAL' || pulse ? 'animate-pulse' : ''}`}
        style={{
          width: '140px',
          height: '48px',
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '24px'
        }}
        onClick={() => setIsExpanded(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: pulse ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center gap-3 w-full px-4">
          <Icon className={statusColor} size={16} />
          <div className="flex flex-col flex-grow text-center">
            <span className={`text-[12px] font-orbitron font-bold leading-none ${statusColor}`}>
              {value}<span className="text-[9px] opacity-70 ml-0.5">{unit}</span>
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              layoutId={`atmos-node-${id}`}
              className={`glass-panel p-8 w-[450px] border ${borderColor} rounded-xl shadow-2xl bg-[#050816]/95`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${bgColor} border border-white/10`}>
                    <Icon className={statusColor} size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{name}</h2>
                    <span className="text-xs text-slate-400 font-mono tracking-[0.2em] uppercase">Atmospheric Node {id}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex justify-between items-end mb-6">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-mono mb-1 uppercase tracking-widest">Live Reading</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-orbitron font-bold tracking-tight ${statusColor}`}>{value}</span>
                    <span className="text-lg text-slate-400 font-mono">{unit}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 text-xs font-mono font-bold tracking-[0.2em] rounded border ${bgColor} ${borderColor} ${statusColor}`}>
                  STATUS: {status}
                </div>
              </div>

              {/* Industrial Impact */}
              <div className="w-full p-4 mb-4 bg-black/40 rounded border border-white/5 flex gap-3 items-start">
                <FiAlertOctagon className={`mt-0.5 ${statusColor}`} />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Industrial Impact</span>
                  <p className={`text-xs font-orbitron tracking-wider ${statusColor}`}>
                    {impactMapping[status]}
                  </p>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="w-full p-4 mb-6 bg-brand-cyan/5 rounded border border-brand-cyan/10 flex gap-3 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
                <FiCpu className="mt-0.5 text-brand-cyan" />
                <div className="flex flex-col gap-1 z-10">
                  <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase flex items-center gap-2">
                    AI Correlation <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                  </span>
                  <p className="text-[10px] font-mono text-slate-300 tracking-wider leading-relaxed">
                    Analyzing historical models indicates a 78% correlation between current {name.toLowerCase()} fluctuations and equipment degradation in Sector 4. Recommend continuous monitoring.
                  </p>
                </div>
              </div>

              {/* Data Visualization Placeholder */}
              <div className="w-full p-4 bg-black/30 rounded border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 tracking-widest">
                  <span>HISTORICAL TREND (24H)</span>
                  <FiTrendingUp className="text-brand-cyan" />
                </div>
                <div className="h-[60px] w-full flex items-end justify-between gap-1">
                  {/* Fake sparkline bars */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${20 + Math.random() * 80}%` }}
                      transition={{ delay: i * 0.02 }}
                      className={`w-full rounded-t-sm ${i > 25 ? statusColor.replace('text-', 'bg-') : 'bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
