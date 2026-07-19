import { motion } from "framer-motion";
import { FiAlertTriangle, FiClock, FiMapPin, FiShield, FiCrosshair, FiZap } from "react-icons/fi";

export default function HeroIncident({ incident }) {
  if (!incident) return null;

  const isCritical = incident.severity === "CRITICAL";
  const glowColor = isCritical ? "rgba(239, 68, 68, 0.3)" : incident.severity === "WARN" ? "rgba(245, 158, 11, 0.3)" : "rgba(34, 211, 238, 0.3)";
  const borderColor = isCritical ? "border-status-danger/60" : incident.severity === "WARN" ? "border-status-warning/60" : "border-brand-cyan/60";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel-deep p-6 relative overflow-hidden flex flex-col justify-between border-l-4 ${borderColor}`}
      style={{ boxShadow: `inset 0 0 40px ${glowColor}, 0 8px 32px rgba(0,0,0,0.6)` }}
    >
      {/* Background Pulse Effect for Critical */}
      {isCritical && (
        <div className="absolute inset-0 bg-status-danger/5 animate-pulse pointer-events-none"></div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded flex items-center gap-2 ${
              isCritical ? "bg-status-danger text-white animate-pulse" : 
              incident.severity === "WARN" ? "bg-status-warning text-black" : "bg-brand-cyan text-black"
            }`}>
              <FiZap /> {incident.severity}
            </div>
            <span className="text-xs font-mono text-slate-400">ID: {incident.id}</span>
          </div>
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wide uppercase drop-shadow-md">
            {incident.title}
          </h2>
          <p className="text-slate-300 mt-2 text-sm leading-relaxed max-w-xl">
            {incident.description}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-orbitron font-bold text-white tracking-widest">{incident.elapsed || "00:04:12"}</div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-1">Elapsed Time</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mt-6 z-10">
        <div className="bg-black/40 border border-white/5 p-4 rounded backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2 uppercase">
            <FiMapPin className="text-brand-cyan" /> Sector
          </div>
          <div className="text-lg font-bold text-white">{incident.sector || "SECTOR 7G"}</div>
        </div>

        <div className="bg-black/40 border border-white/5 p-4 rounded backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2 uppercase">
            <FiClock className="text-brand-cyan" /> Detection
          </div>
          <div className="text-lg font-bold text-white">{incident.time}</div>
        </div>

        <div className="bg-black/40 border border-white/5 p-4 rounded backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2 uppercase">
            <FiShield className="text-brand-cyan" /> Affected Workers
          </div>
          <div className="text-lg font-bold text-white">{incident.affectedWorkers || "12 Personnel"}</div>
        </div>

        <div className="bg-black/40 border border-white/5 p-4 rounded backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-2 uppercase">
            <FiAlertTriangle className={isCritical ? "text-status-danger animate-bounce" : "text-status-warning"} /> Current Risk
          </div>
          <div className={`text-lg font-bold ${isCritical ? "text-status-danger" : "text-status-warning"}`}>
            {isCritical ? "SEVERE" : "ELEVATED"}
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="mt-6 p-4 bg-brand-cyan/10 border border-brand-cyan/30 rounded flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <FiCrosshair className="text-brand-cyan text-2xl animate-spin-slow" />
          <div>
            <div className="text-xs font-mono text-brand-cyan tracking-widest mb-1 uppercase">AI Recommended Action</div>
            <div className="text-white font-bold">{incident.recommendedAction || "Initiate Protocol Alpha. Evacuate Zone 4."}</div>
          </div>
        </div>
        <div>
          <button className="px-6 py-2 bg-brand-cyan/20 hover:bg-brand-cyan/40 border border-brand-cyan/50 text-white text-sm font-mono tracking-widest uppercase transition-colors rounded">
            Execute
          </button>
        </div>
      </div>
    </motion.div>
  );
}
