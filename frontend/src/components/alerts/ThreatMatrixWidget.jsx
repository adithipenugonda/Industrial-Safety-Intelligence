import { motion } from "framer-motion";
import { FiTarget, FiActivity, FiRadio, FiCrosshair } from "react-icons/fi";

export default function ThreatMatrixWidget({
  threatLevel = "DEFCON 4",
  riskBadge = "ELEVATED",
  riskBadgeClass = "text-status-danger neon-text-danger",
  riskColor = "status-danger",
  customThreats = null,
  customAlerts = null,
}) {
  const threats = customThreats || [
    { id: 1, type: "Thermal", risk: "CRITICAL", pos: { top: "30%", left: "60%" } },
    { id: 2, type: "Pressure", risk: "WARN", pos: { top: "65%", left: "25%" } },
    { id: 3, type: "Perimeter", risk: "WARN", pos: { top: "75%", left: "75%" } },
  ];

  const alerts = customAlerts || [
    { time: "T-01:24", msg: "Thermal spike Sec-7G", level: "critical" },
    { time: "T-04:12", msg: "Unauthorized drone near perimeter", level: "warn" },
    { time: "T-12:50", msg: "Pressure valve 42 calibration offset", level: "warn" },
  ];

  return (
    <div className="glass-panel p-5 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-factory-bg-base to-status-danger/5">
      
      {/* Header: Threat Level & Risk Ring */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-status-danger/20">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10">
            {/* Risk Ring */}
            <motion.svg className="absolute inset-0 w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="2" strokeDasharray="4 4" />
            </motion.svg>
            <motion.svg className="absolute inset-0 w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
              <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="1" strokeDasharray="10 2" />
            </motion.svg>
            <FiTarget className="text-status-danger z-10 animate-pulse" />
          </div>
          <div>
            <h3 className={`text-${riskColor} font-bold tracking-widest uppercase font-orbitron text-sm`}>Threat Matrix</h3>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">{threatLevel}</span>
          </div>
        </div>
        <div className={`bg-${riskColor}/10 px-2 py-1 rounded border border-${riskColor}/30 flex items-center gap-2`}>
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${riskColor} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 bg-${riskColor}`}></span>
          </span>
          <span className={`text-[10px] font-mono font-bold tracking-widest ${riskBadgeClass}`}>{riskBadge}</span>
        </div>
      </div>

      {/* Radar Section */}
      <div className="relative w-full h-48 flex items-center justify-center mb-4 bg-black/20 rounded-lg border border-white/5 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Radar Rings */}
        <div className="absolute w-40 h-40 rounded-full border border-brand-cyan/20"></div>
        <div className="absolute w-24 h-24 rounded-full border border-brand-cyan/20"></div>
        <div className="absolute w-8 h-8 rounded-full border border-brand-cyan/20 bg-brand-cyan/5"></div>
        
        {/* Crosshairs */}
        <div className="absolute w-full h-px bg-brand-cyan/20 top-1/2 -translate-y-1/2"></div>
        <div className="absolute h-full w-px bg-brand-cyan/20 left-1/2 -translate-x-1/2"></div>

        {/* Sweeping Scanner */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 origin-bottom-right bottom-1/2 right-1/2 bg-gradient-to-tl from-brand-cyan/40 to-transparent pointer-events-none"
          style={{ borderTop: "2px solid rgba(34,211,238,0.8)" }}
        />

        {/* Threat Pulses */}
        {threats.map((threat) => (
          <motion.div
            key={threat.id}
            className="absolute flex items-center justify-center"
            style={threat.pos}
          >
            {/* Ping Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: threat.id * 0.4 }}
              className={`absolute w-4 h-4 rounded-full border-2 ${
                threat.risk === "CRITICAL" ? "border-status-danger" : "border-status-warning"
              }`}
            />
            {/* Blip */}
            <div className={`w-2 h-2 rounded-full relative z-10 shadow-[0_0_8px_currentColor] ${
              threat.risk === "CRITICAL" ? "bg-status-danger text-status-danger" : "bg-status-warning text-status-warning"
            }`} />
            {/* Label */}
            <div className={`absolute top-3 left-3 text-[8px] font-mono whitespace-nowrap bg-black/60 px-1 py-0.5 rounded border ${
              threat.risk === "CRITICAL" ? "text-status-danger border-status-danger/30" : "text-status-warning border-status-warning/30"
            }`}>
              {threat.type}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert Timeline */}
      <div className="flex-1 overflow-hidden flex flex-col gap-2 mb-3">
        <h4 className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
          <FiActivity /> Recent Alerts
        </h4>
        <div className="flex flex-col gap-2">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/5 p-2 rounded border border-white/5 hover:border-white/10 transition-colors">
              <span className={`text-[9px] font-mono font-bold mt-0.5 ${
                alert.level === 'critical' ? 'text-status-danger' : 'text-status-warning'
              }`}>
                {alert.time}
              </span>
              <p className="text-[10px] text-slate-300 font-mono leading-tight flex-1">
                {alert.msg}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Sensors Status */}
      <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 mt-auto">
        <div className="flex items-center gap-2">
          <FiCrosshair className="text-status-success text-xs" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 font-mono tracking-wider">PERIMETER</span>
            <span className="text-[10px] text-status-success font-mono font-bold">SECURE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiRadio className="text-status-danger text-xs animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 font-mono tracking-wider">THERMALS</span>
            <span className="text-[10px] text-status-danger font-mono font-bold neon-text-danger">UNSTABLE</span>
          </div>
        </div>
      </div>

    </div>
  );
}
