import { motion } from "framer-motion";

export default function TelemetryCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = "normal", 
  delay = 0 
}) {
  
  const statusColors = {
    normal: "text-brand-cyan",
    warning: "text-yellow-400",
    critical: "text-red-500",
  };

  const borderColors = {
    normal: "group-hover:border-brand-cyan/50",
    warning: "border-yellow-400/30 group-hover:border-yellow-400/60",
    critical: "border-red-500/50 group-hover:border-red-500 neon-border",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`glass-panel p-5 flex items-center justify-between group transition-colors duration-300 ${borderColors[status]}`}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-slate-500 text-[10px] tracking-[0.2em] font-mono uppercase leading-none">{title}</span>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold font-orbitron tracking-tight ${statusColors[status]}`}>
            {value}
          </span>
          {unit && <span className="text-slate-400 text-sm font-mono mb-1">{unit}</span>}
        </div>
      </div>
      
      {Icon && (
        <div className={`p-2.5 rounded-md bg-white/5 border border-white/5 shadow-inner ${statusColors[status]}`}>
          <Icon className="text-xl" />
        </div>
      )}
    </motion.div>
  );
}
