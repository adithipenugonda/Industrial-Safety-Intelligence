import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTarget, FiX, FiThermometer, FiWind, FiCpu, FiSun, FiLayers, FiChevronRight } from "react-icons/fi";

export default function ThreatMatrixWidget({
  threatLevel = "DEFCON 4",
  riskBadge = "HIGH",
  riskScore = "82%",
  riskSeverity = "HIGH",
  riskBreakdown = null,
  customThreats = null,
  customAlerts = null,
}) {
  const [showDrawer, setShowDrawer] = useState(false);

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

  const defaultFactors = [
    { label: "Temperature", percent: 40, icon: FiThermometer, color: "text-red-400" },
    { label: "Gas Concentration", percent: 25, icon: FiWind, color: "text-amber-400" },
    { label: "Pressure Impact", percent: 15, icon: FiCpu, color: "text-[#00E5FF]" },
    { label: "Environment", percent: 10, icon: FiSun, color: "text-emerald-400" },
    { label: "Equipment", percent: 10, icon: FiLayers, color: "text-purple-400" }
  ];

  const activeFactors = riskBreakdown || defaultFactors;

  // Determine dynamic risk colors based on severity & score
  const isCritical = riskSeverity === "CRITICAL" || riskSeverity === "HIGH" || parseInt(riskScore) > 60;
  const isWarn = riskSeverity === "WARN" || riskSeverity === "MODERATE" || (parseInt(riskScore) >= 30 && parseInt(riskScore) <= 60);

  const scoreTextColor = isCritical ? "text-red-400" : isWarn ? "text-amber-400" : "text-emerald-400";
  const badgeBorderColor = isCritical ? "border-red-500/50 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : isWarn ? "border-amber-500/50 bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]";
  const boxGradient = isCritical ? "from-red-500/20 border-red-500/40" : isWarn ? "from-amber-500/20 border-amber-500/40" : "from-emerald-500/20 border-emerald-500/40";

  return (
    <>
      <div className="glass-panel p-5 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-factory-bg-base to-status-danger/5 select-none font-mono">
        
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8">
              <FiTarget className={`${scoreTextColor} text-lg animate-pulse`} />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase font-orbitron text-xs">Threat Matrix</h3>
              <span className="text-[10px] text-slate-400 tracking-wider">{threatLevel}</span>
            </div>
          </div>

          {/* Minimal Clean Risk Badge with Progressive Disclosure Trigger */}
          <button 
            onClick={() => setShowDrawer(true)}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-orbitron tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${badgeBorderColor}`}
          >
            <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500 animate-ping' : isWarn ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span>{riskScore} {riskBadge}</span>
            <span className="text-[10px] font-mono text-cyan-300 ml-1 hover:underline flex items-center">
              View Breakdown <FiChevronRight size={12} />
            </span>
          </button>
        </div>

        {/* Minimal Radar Section */}
        <div className="relative w-full h-44 flex items-center justify-center mb-3 bg-black/30 rounded-lg border border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20" />
          <div className="absolute w-20 h-20 rounded-full border border-cyan-500/20" />
          <div className="absolute w-6 h-6 rounded-full border border-cyan-500/20 bg-cyan-500/10" />

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-18 h-18 origin-bottom-right bottom-1/2 right-1/2 bg-gradient-to-tl from-cyan-400/40 to-transparent pointer-events-none"
            style={{ borderTop: "2px solid rgba(0,229,255,0.8)" }}
          />

          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              className="absolute flex items-center justify-center"
              style={threat.pos}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${threat.risk === "CRITICAL" ? "bg-red-500 animate-ping" : "bg-amber-400"}`} />
            </motion.div>
          ))}
        </div>

        {/* Minimal Clean Audit Feed */}
        <div className="mt-auto space-y-1.5 text-[10px]">
          {alerts.slice(0, 2).map((al, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5">
              <span className="text-slate-400">{al.time}</span>
              <span className="text-slate-200 font-semibold truncate max-w-[170px]">{al.msg}</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold ${al.level === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {al.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SLEEK GLASS SIDE DRAWER: SYSTEM RISK ANALYSIS (Dynamic Severity Colors matching Risk) */}
      <AnimatePresence>
        {showDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[110] w-[420px] bg-[#050B14]/95 border-l border-[#00E5FF]/30 p-6 text-white font-mono shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-sm font-orbitron font-bold text-white tracking-widest uppercase">
                      SYSTEM RISK ANALYSIS
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">Progressive Diagnostic Breakdown</p>
                  </div>
                  <button 
                    onClick={() => setShowDrawer(false)} 
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className={`p-5 rounded-xl bg-gradient-to-b ${boxGradient} flex items-center justify-between mb-6 shadow-md border`}>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Overall Risk</div>
                    <div className={`text-4xl font-orbitron font-bold ${scoreTextColor} drop-shadow-[0_0_15px_currentColor]`}>
                      {riskScore}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Severity</div>
                    <div className={`text-sm font-orbitron font-bold px-3 py-1 rounded border ${badgeBorderColor}`}>
                      {riskSeverity}
                    </div>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-4">
                  // CONTRIBUTING FACTORS
                </h4>

                <div className="space-y-3">
                  {activeFactors.map((factor, idx) => {
                    const Icon = factor.icon || FiThermometer;
                    const factorColor = factor.color || scoreTextColor;
                    return (
                      <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-slate-200">
                            <Icon className={factorColor} size={14} /> {factor.label}
                          </span>
                          <span className={`font-bold ${factorColor}`}>{factor.percent}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${factor.percent}%`,
                              backgroundColor: isCritical ? '#ef4444' : isWarn ? '#f59e0b' : '#34d399'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Deterministic Computation</span>
                <span className="text-cyan-400 font-bold">Generated by Risk Engine</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
