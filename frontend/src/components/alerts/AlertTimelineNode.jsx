import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiInfo } from "react-icons/fi";

export default function AlertTimelineNode({ alert }) {
  const isResolved = alert.status === "RESOLVED";
  const isCritical = alert.severity === "CRITICAL" && !isResolved;
  const isWarning = alert.severity === "WARN" && !isResolved;

  // Determine styling based on state
  let markerColor = "bg-brand-cyan";
  let markerIcon = <FiInfo className="text-[#0B101E]" size={12} />;
  let cardBorder = "border-brand-cyan/20";
  let cardGlow = "hover-glow";
  let textColor = "text-slate-200";

  if (isResolved) {
    markerColor = "bg-slate-600";
    markerIcon = <FiCheckCircle className="text-[#0B101E]" size={12} />;
    cardBorder = "border-slate-700/50";
    cardGlow = "";
    textColor = "text-slate-500";
  } else if (isCritical) {
    markerColor = "bg-status-danger";
    markerIcon = <FiAlertTriangle className="text-[#0B101E]" size={12} />;
    cardBorder = "border-status-danger/50";
    cardGlow = "shadow-[0_0_15px_rgba(239,68,68,0.3)]";
    textColor = "text-white";
  } else if (isWarning) {
    markerColor = "bg-status-warning";
    markerIcon = <FiAlertTriangle className="text-[#0B101E]" size={12} />;
    cardBorder = "border-status-warning/40";
    cardGlow = "shadow-[0_0_10px_rgba(250,204,21,0.2)]";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isResolved ? 0.6 : 1, x: 0 }}
      layout
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`relative pl-12 py-4 ${isResolved ? 'grayscale-[50%]' : ''}`}
    >
      {/* Timeline Line Connector */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-white/10"></div>

      {/* Timeline Marker */}
      <div className={`absolute left-3 top-8 w-6 h-6 rounded-full flex items-center justify-center z-10 ${markerColor} ${isCritical ? 'animate-pulse' : ''}`}>
        {markerIcon}
      </div>

      {/* Alert Card */}
      <div className={`glass-panel p-6 transition-all duration-500 ${cardBorder} ${cardGlow}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded-sm border ${isResolved ? 'bg-slate-800/50 text-slate-500 border-slate-700/50' : isCritical ? 'bg-status-danger/10 text-status-danger border-status-danger/40 shadow-[0_0_8px_rgba(239,68,68,0.2)]' : isWarning ? 'bg-status-warning/10 text-status-warning border-status-warning/40' : 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30'}`}>
              {isResolved ? 'RESOLVED' : alert.severity}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-[0.2em]">{alert.time}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">ID: {alert.id}</span>
        </div>

        <h3 className={`text-lg font-orbitron font-bold uppercase tracking-wider mb-2 ${textColor}`}>
          {alert.title}
        </h3>
        
        <p className={`text-sm ${isResolved ? 'text-slate-600' : 'text-slate-400'}`}>
          {alert.description}
        </p>

        {alert.resolution && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2">
            <FiCheckCircle className="text-status-success mt-0.5" size={14} />
            <p className="text-xs text-status-success font-mono">
              <span className="tracking-widest uppercase opacity-70">Action Taken: </span>
              {alert.resolution}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
