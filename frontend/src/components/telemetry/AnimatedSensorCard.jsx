import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedSensorCard({ 
  name, 
  type, 
  currentValue, 
  unit, 
  status, 
  icon: Icon,
  sparklineData = []
}) {
  const [prevValue, setPrevValue] = useState(currentValue);
  const [isUpdating, setIsUpdating] = useState(false);

  // Trigger update animation when value changes
  useEffect(() => {
    if (currentValue !== prevValue) {
      setIsUpdating(true);
      const timeout = setTimeout(() => setIsUpdating(false), 500);
      setPrevValue(currentValue);
      return () => clearTimeout(timeout);
    }
  }, [currentValue, prevValue]);

  // Determine colors based on status
  let glowColor, borderColor, textColor, bgColor;
  switch (status) {
    case 'CRITICAL':
      glowColor = 'rgba(239, 68, 68, 0.6)'; // red-500
      borderColor = 'border-status-danger';
      textColor = 'text-status-danger';
      bgColor = 'bg-status-danger/10';
      break;
    case 'WARN':
      glowColor = 'rgba(250, 204, 21, 0.4)'; // yellow-400
      borderColor = 'border-status-warning';
      textColor = 'text-status-warning';
      bgColor = 'bg-status-warning/10';
      break;
    case 'NOMINAL':
    default:
      glowColor = 'rgba(34, 211, 238, 0.2)'; // cyan-400
      borderColor = 'border-brand-cyan/30';
      textColor = 'text-brand-cyan';
      bgColor = 'bg-brand-cyan/5';
      break;
  }

  return (
    <motion.div
      layout
      className={`relative glass-panel p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 ${borderColor} hover-scale`}
      style={{
        boxShadow: status !== 'NOMINAL' ? `0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}` : 'none'
      }}
    >
      {/* Background Pulse on Update */}
      <motion.div 
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isUpdating ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase">{type}</span>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{name}</h3>
        </div>
        <div className={`p-2.5 rounded-md ${bgColor} ${borderColor} border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`}>
          <Icon className={textColor} size={18} />
        </div>
      </div>

      <div className="mt-8 z-10">
        <div className="flex items-end gap-2">
          <motion.span 
            key={currentValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl font-orbitron font-bold tracking-tight ${isUpdating ? textColor : 'text-white'}`}
          >
            {currentValue}
          </motion.span>
          <span className="text-sm text-slate-400 font-mono mb-1.5">{unit}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between z-10">
        <span className={`text-[10px] font-mono font-bold tracking-[0.2em] px-2 py-1 rounded-sm border ${bgColor} ${borderColor} ${textColor}`}>
          {status}
        </span>
        
        {/* Simple Sparkline Representation */}
        <div className="flex items-end gap-1 h-6">
          {sparklineData.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ delay: i * 0.05 }}
              className={`w-1 rounded-t-sm ${i === sparklineData.length - 1 ? textColor : 'bg-slate-700'}`}
            />
          ))}
        </div>
      </div>

    </motion.div>
  );
}
