import { useState } from "react";
import { 
  FiActivity, 
  FiServer, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiCpu, 
  FiHardDrive, 
  FiWifi, 
  FiThermometer, 
  FiX, 
  FiList, 
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function TelemetryLeftPanel({ sensors = [] }) {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState("ALL");
  const [expandedSensorId, setExpandedSensorId] = useState(null);

  const filteredSensors = sensors.filter(s => {
    if (activityFilter === "CRITICAL") return s.status === "CRITICAL";
    if (activityFilter === "NOMINAL") return s.status === "NOMINAL";
    return true;
  });

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full glass-panel flex flex-col p-6 bg-[#050B14]/95 border border-[#00E5FF]/30 shadow-[0_12px_40px_rgba(0,0,0,0.7)] rounded-xl justify-between select-none font-mono"
      >
        <div>
          <h3 className="text-xs font-orbitron font-bold tracking-[0.2em] uppercase text-white mb-5 flex items-center gap-2.5">
            <FiServer className="text-[#00E5FF]" size={16} /> NETWORK STATUS
          </h3>
          
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] tracking-widest text-slate-400">TOTAL NODES</span>
              <span className="text-sm font-orbitron font-bold text-white">{sensors.length || 8}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.15)]">
              <span className="text-[11px] tracking-widest text-[#00E5FF]">ONLINE</span>
              <span className="text-sm font-orbitron font-bold text-[#00E5FF]">
                {sensors.filter(s => s.status !== 'CRITICAL').length || 7}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg bg-[#FF4040]/15 border border-[#FF4040]/50 shadow-[0_0_15px_rgba(255,64,64,0.3)] animate-pulse">
              <span className="text-[11px] tracking-widest text-[#FF4040]">CRITICAL</span>
              <span className="text-sm font-orbitron font-bold text-[#FF4040]">
                {sensors.filter(s => s.status === 'CRITICAL').length || 1}
              </span>
            </div>
          </div>

          <h3 className="text-xs font-orbitron font-bold tracking-[0.2em] uppercase text-slate-200 mb-3 flex items-center gap-2">
            <FiActivity className="text-[#00E5FF]" size={15} /> SENSOR NODES
          </h3>
          
          {/* Minimal Sensor Cards with Progressive Disclosure Accordion */}
          <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
            {sensors.slice(0, 4).map((sensor) => {
              const isCritical = sensor.status === 'CRITICAL';
              const isExpanded = expandedSensorId === sensor.id;

              return (
                <div 
                  key={sensor.id} 
                  onClick={() => setExpandedSensorId(isExpanded ? null : sensor.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isCritical ? 'bg-red-500/10 border-red-500/40' : 'bg-white/5 border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {/* Clean Minimal Summary Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {isCritical ? (
                        <FiAlertTriangle size={14} className="text-red-400 animate-bounce" />
                      ) : (
                        <FiCheckCircle size={14} className="text-cyan-400" />
                      )}
                      <span className="text-xs font-bold text-white tracking-wide">{sensor.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-300">{sensor.value} {sensor.unit}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        isCritical ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {sensor.status}
                      </span>
                      {isExpanded ? <FiChevronUp size={12} className="text-slate-400" /> : <FiChevronDown size={12} className="text-slate-400" />}
                    </div>
                  </div>

                  {/* PROGRESSIVE DISCLOSURE: Detailed Risk Breakdown on Click */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-2.5 border-t border-white/10 text-[10px] space-y-1.5 text-slate-300"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">Threshold:</span>
                          <span className="text-white font-bold">900°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Risk Impact:</span>
                          <span className="text-red-400 font-bold">+25 Points</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Current Risk:</span>
                          <span className="text-amber-400 font-bold">HIGH</span>
                        </div>
                        <div className="pt-1 text-[9px] text-cyan-400 font-bold text-right">
                          Calculated by Risk Engine
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Action Button */}
        <button 
          onClick={() => setShowActivityModal(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-[11px] font-orbitron font-bold tracking-widest uppercase hover:bg-[#00E5FF]/20 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.15)] mt-4 cursor-pointer"
        >
          VIEW ALL ACTIVITY &rarr;
        </button>
      </motion.div>

      {/* FULL ACTIVITY MODAL OVERLAY */}
      <AnimatePresence>
        {showActivityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 pointer-events-auto"
            onClick={() => setShowActivityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#050B14] border border-[#00E5FF]/40 rounded-2xl p-6 text-white shadow-[0_0_50px_rgba(0,229,255,0.25)] relative max-h-[85vh] flex flex-col justify-between font-mono"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
                    <FiList size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-orbitron font-bold text-white tracking-wider">
                      TELEMETRY ACTIVITY LOGS
                    </h2>
                    <p className="text-xs text-slate-400">Real-time sensor event stream</p>
                  </div>
                </div>
                <button onClick={() => setShowActivityModal(false)} className="text-slate-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs">
                {['ALL', 'CRITICAL', 'NOMINAL'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActivityFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-lg border font-bold uppercase transition-all ${
                      activityFilter === tab 
                        ? 'bg-[#00E5FF] text-slate-950 border-[#00E5FF]' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {filteredSensors.map((sensor) => {
                  const critical = sensor.status === 'CRITICAL';
                  const accent = critical ? '#FF4040' : '#00E5FF';

                  return (
                    <div 
                      key={sensor.id}
                      className="p-4 rounded-xl border bg-slate-900/60 flex items-center justify-between"
                      style={{ borderColor: `${accent}40` }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div 
                          className="p-2.5 rounded-full"
                          style={{ background: `${accent}20`, color: accent }}
                        >
                          {critical ? <FiAlertTriangle size={18} /> : <FiCheckCircle size={18} />}
                        </div>

                        <div>
                          <div className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
                            {sensor.name}
                            <span 
                              className="px-2 py-0.5 rounded text-[9px] font-mono font-bold"
                              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}50` }}
                            >
                              {sensor.type}
                            </span>
                          </div>
                          {critical ? (
                            <div className="text-xs text-red-400 mt-1 font-bold">
                              Threshold Breached (900°C) &bull; Risk Impact +25 &bull; Severity HIGH
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 mt-1">
                              Telemetry Nominal &bull; Evaluated by Risk Engine
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-orbitron font-bold text-lg text-white">
                          {sensor.value} <span className="text-xs text-cyan-300">{sensor.unit}</span>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                          {sensor.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Calculated by Risk Engine</span>
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function TelemetryRightPanel() {
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full h-full glass-panel flex flex-col p-6 bg-[#050B14]/95 border border-[#00E5FF]/30 shadow-[0_12px_40px_rgba(0,0,0,0.7)] rounded-xl justify-between select-none font-mono"
      >
        <div>
          <h3 className="text-xs font-orbitron font-bold tracking-[0.2em] uppercase text-white mb-5 flex items-center gap-2.5">
            <FiActivity className="text-[#00E5FF]" size={16} /> DIAGNOSTICS
          </h3>

          <div className="p-5 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/30 flex flex-col items-center justify-center mb-6 relative overflow-hidden shadow-[inset_0_0_20px_rgba(251,191,36,0.1)]">
            <span className="text-[10px] tracking-[0.3em] text-slate-400 mb-1.5 uppercase">SYSTEM HEALTH</span>
            <span className="text-5xl font-orbitron font-bold tracking-tighter text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              80%
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FiCpu className="text-[#00E5FF]" size={15} />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-slate-300 tracking-[0.2em]">CPU LOAD</span>
                  <span className="text-[10px] font-bold text-white">24%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[24%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiHardDrive className="text-[#00E5FF]" size={15} />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-slate-300 tracking-[0.2em]">MEMORY</span>
                  <span className="text-[10px] font-bold text-white">61%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[61%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiWifi className="text-[#00E5FF]" size={15} />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-slate-300 tracking-[0.2em]">PACKET LOSS</span>
                  <span className="text-[10px] font-bold text-emerald-400">0.01%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[2%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FiThermometer className="text-[#00E5FF]" size={15} />
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] text-slate-300 tracking-[0.2em]">TEMP STABILITY</span>
                  <span className="text-[10px] font-bold text-white">91%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] w-[91%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowDiagnosticsModal(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-[11px] font-orbitron font-bold tracking-widest uppercase hover:bg-[#00E5FF]/20 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.15)] mt-4 cursor-pointer"
        >
          VIEW FULL DIAGNOSTICS &rarr;
        </button>
      </motion.div>

      <AnimatePresence>
        {showDiagnosticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 pointer-events-auto"
            onClick={() => setShowDiagnosticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-[#050B14] border border-[#00E5FF]/40 rounded-2xl p-6 text-white shadow-[0_0_50px_rgba(0,229,255,0.25)] relative max-h-[85vh] flex flex-col justify-between overflow-y-auto font-mono"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
                    <FiCpu size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-orbitron font-bold text-white tracking-wider">
                      SCADA DIAGNOSTICS
                    </h2>
                    <p className="text-xs text-slate-400">Hardware performance & server load</p>
                  </div>
                </div>
                <button onClick={() => setShowDiagnosticsModal(false)} className="text-slate-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border border-white/10 bg-slate-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">OCTA-CORE CPU SPECTRUM</span>
                    <span className="text-xs font-bold text-[#00E5FF]">24.2%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mt-2">
                    {[18, 32, 22, 45, 12, 28, 19, 25].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="w-full bg-white/10 h-12 rounded-sm relative overflow-hidden">
                          <div className="absolute bottom-0 w-full bg-[#00E5FF]" style={{ height: `${val}%` }} />
                        </div>
                        <span className="text-[8px] text-slate-500">C{idx+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-slate-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">MEMORY BUFFER</span>
                    <span className="text-xs font-bold text-sky-400">19.5 GB / 32 GB</span>
                  </div>
                  <div className="space-y-2 text-xs mt-3">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Telemetry Stream Cache</span>
                      <span className="text-white font-bold">4.2 GB</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#00E5FF] h-full w-[40%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Calculated by Risk Engine</span>
                <button
                  onClick={() => setShowDiagnosticsModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs"
                >
                  Close Diagnostics
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
