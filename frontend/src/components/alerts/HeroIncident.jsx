import { useState } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiClock, FiMapPin, FiShield, FiCrosshair, FiZap, FiCheckCircle } from "react-icons/fi";

export default function HeroIncident({ incident, onExecuteAction }) {
  const [executed, setExecuted] = useState(false);

  if (!incident) return null;

  const isCritical = incident.severity === "CRITICAL";
  const glowColor = isCritical ? "rgba(239, 68, 68, 0.3)" : incident.severity === "WARN" ? "rgba(245, 158, 11, 0.3)" : "rgba(34, 211, 238, 0.3)";
  const borderColor = isCritical ? "border-status-danger/60" : incident.severity === "WARN" ? "border-status-warning/60" : "border-brand-cyan/60";

  const handleExecute = () => {
    setExecuted(true);
    if (onExecuteAction) onExecuteAction(incident);
    setTimeout(() => setExecuted(false), 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel-deep p-4 rounded-xl relative overflow-hidden flex flex-col justify-between border-l-4 ${borderColor} border-t border-r border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 h-full select-none font-mono`}
      style={{ boxShadow: `inset 0 0 30px ${glowColor}, 0 8px 30px rgba(0,0,0,0.7)` }}
    >
      {/* Background Pulse Effect for Critical */}
      {isCritical && (
        <div className="absolute inset-0 bg-status-danger/5 animate-pulse pointer-events-none rounded-xl"></div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start z-10 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <div className={`px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded flex items-center gap-1 shadow-md ${
              isCritical ? "bg-status-danger text-white animate-pulse" : 
              incident.severity === "WARN" ? "bg-status-warning text-black" : "bg-brand-cyan text-black"
            }`}>
              <FiZap className="text-[10px]" /> {incident.severity}
            </div>
            
            <span className="text-[10px] text-[#00E5FF] font-bold bg-[#00E5FF]/10 px-2.5 py-0.5 rounded border border-[#00E5FF]/30">
              🛡 Detected by Risk Engine
            </span>

            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              ID: {incident.id}
            </span>
          </div>

          <h2 className="text-xl font-orbitron font-bold text-white tracking-wide uppercase drop-shadow-md">
            {incident.title}
          </h2>
          <p className="text-slate-300 mt-1 text-xs leading-relaxed max-w-xl truncate">
            {incident.description}
          </p>
        </div>
        
        <div className="text-right shrink-0 bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
          <div className="text-xl font-orbitron font-bold text-white tracking-widest">{incident.elapsed || "00:04:12"}</div>
          <div className="text-[9px] text-slate-400 uppercase tracking-widest">Elapsed Time</div>
        </div>
      </div>

      {/* Clean Single Risk Metric Row */}
      <div className="grid grid-cols-4 gap-2.5 mt-3 z-10 text-xs">
        <div className="bg-slate-950/60 border border-white/10 p-2.5 rounded-lg backdrop-blur-md">
          <div className="text-slate-400 text-[9.5px] mb-1 uppercase">Sector</div>
          <div className="font-bold text-white">{incident.sector || "SECTOR 7G"}</div>
        </div>

        <div className="bg-slate-950/60 border border-white/10 p-2.5 rounded-lg backdrop-blur-md">
          <div className="text-slate-400 text-[9.5px] mb-1 uppercase">Risk Score</div>
          <div className="font-bold text-red-400 font-orbitron">92% Critical</div>
        </div>

        <div className="bg-slate-950/60 border border-white/10 p-2.5 rounded-lg backdrop-blur-md">
          <div className="text-slate-400 text-[9.5px] mb-1 uppercase">Threshold Exceeded</div>
          <div className="font-bold text-amber-400">Temp &gt; 900°C</div>
        </div>

        <div className="bg-slate-950/60 border border-white/10 p-2.5 rounded-lg backdrop-blur-md">
          <div className="text-slate-400 text-[9.5px] mb-1 uppercase">Severity</div>
          <div className="font-bold text-red-400 uppercase">
            {incident.severity}
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="mt-3 p-2.5 bg-brand-cyan/10 border border-brand-cyan/30 rounded-lg flex justify-between items-center gap-2 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-brand-cyan/20 text-brand-cyan">
            <FiCrosshair className="text-sm animate-spin-slow" />
          </div>
          <div>
            <div className="text-[9px] text-brand-cyan tracking-widest uppercase">AI Recommended Action</div>
            <div className="text-white font-bold text-xs">{incident.recommendedAction || "Initiate Protocol Alpha. Evacuate Zone 4."}</div>
          </div>
        </div>

        <button 
          onClick={handleExecute}
          className={`px-3.5 py-1.5 font-bold text-[10px] font-mono tracking-widest uppercase transition-all duration-200 rounded shadow-md shrink-0 flex items-center gap-1.5 ${
            executed 
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_#10b981]" 
              : "bg-brand-cyan text-slate-950 hover:bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)] cursor-pointer"
          }`}
        >
          {executed ? (
            <>
              <FiCheckCircle size={13} /> Executed
            </>
          ) : (
            "Execute"
          )}
        </button>
      </div>
    </motion.div>
  );
}
