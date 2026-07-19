import { FiActivity, FiServer, FiWifi, FiAlertTriangle, FiCheckCircle, FiCpu, FiHardDrive } from "react-icons/fi";
import { motion } from "framer-motion";

export function TelemetryLeftPanel({ sensors }) {
  const activeCount = sensors.filter(s => s.status === 'NOMINAL').length;
  const warningCount = sensors.filter(s => s.status === 'WARN').length;
  const criticalCount = sensors.filter(s => s.status === 'CRITICAL').length;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full glass-panel flex flex-col p-6"
    >
      <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] uppercase text-white mb-6 flex items-center gap-2">
        <FiServer className="text-brand-cyan" /> Network Status
      </h3>
      
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
          <span className="text-xs font-mono tracking-widest text-slate-400">TOTAL NODES</span>
          <span className="text-sm font-mono font-bold text-white">{sensors.length}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 rounded bg-brand-cyan/5 border border-brand-cyan/20">
          <span className="text-xs font-mono tracking-widest text-brand-cyan">ONLINE</span>
          <span className="text-sm font-mono font-bold text-brand-cyan">{activeCount}</span>
        </div>

        {warningCount > 0 && (
          <div className="flex justify-between items-center p-3 rounded bg-status-warning/10 border border-status-warning/30">
            <span className="text-xs font-mono tracking-widest text-status-warning">WARNINGS</span>
            <span className="text-sm font-mono font-bold text-status-warning">{warningCount}</span>
          </div>
        )}

        {criticalCount > 0 && (
          <div className="flex justify-between items-center p-3 rounded bg-status-danger/10 border border-status-danger/40 animate-pulse">
            <span className="text-xs font-mono tracking-widest text-status-danger">CRITICAL</span>
            <span className="text-sm font-mono font-bold text-status-danger">{criticalCount}</span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] uppercase text-slate-300 mb-4 mt-auto">
        Recent Activity
      </h3>
      
      <div className="flex flex-col gap-3">
        {sensors.slice(0, 3).map((sensor, idx) => (
          <div key={idx} className="flex items-start gap-3 border-l-2 border-brand-cyan/30 pl-3">
            <div className={`mt-0.5 ${sensor.status === 'CRITICAL' ? 'text-status-danger' : sensor.status === 'WARN' ? 'text-status-warning' : 'text-brand-cyan'}`}>
              {sensor.status === 'CRITICAL' ? <FiAlertTriangle size={12} /> : <FiCheckCircle size={12} />}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-white tracking-widest">{sensor.name}</span>
              <span className="text-[9px] font-mono text-slate-500 tracking-wider">Sync {Math.floor(Math.random() * 5)}s ago</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function TelemetryRightPanel({ sensors }) {
  // Simple overall health calc
  const health = Math.max(0, 100 - (sensors.filter(s => s.status === 'CRITICAL').length * 20) - (sensors.filter(s => s.status === 'WARN').length * 5));
  let healthColor = "text-status-success";
  let healthGlow = "shadow-[0_0_15px_rgba(16,185,129,0.3)] border-status-success/40";
  if (health < 60) {
    healthColor = "text-status-danger";
    healthGlow = "shadow-[0_0_20px_rgba(239,68,68,0.4)] border-status-danger/50";
  } else if (health < 90) {
    healthColor = "text-status-warning";
    healthGlow = "shadow-[0_0_15px_rgba(250,204,21,0.3)] border-status-warning/40";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-full h-full glass-panel flex flex-col p-6"
    >
      <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] uppercase text-white mb-6 flex items-center gap-2">
        <FiActivity className="text-brand-cyan" /> Diagnostics
      </h3>

      <div className={`p-6 rounded-lg bg-white/5 border flex flex-col items-center justify-center mb-8 ${healthGlow} transition-colors`}>
        <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 mb-2 uppercase">System Health</span>
        <span className={`text-5xl font-orbitron font-bold tracking-tighter ${healthColor}`}>
          {health}%
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-cyan/10 rounded border border-brand-cyan/20">
            <FiCpu className="text-brand-cyan" size={14} />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] font-mono text-slate-400 tracking-[0.2em]">CPU LOAD</span>
              <span className="text-[10px] font-mono text-white">24%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-cyan w-[24%]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-cyan/10 rounded border border-brand-cyan/20">
            <FiHardDrive className="text-brand-cyan" size={14} />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] font-mono text-slate-400 tracking-[0.2em]">MEMORY</span>
              <span className="text-[10px] font-mono text-white">61%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-cyan w-[61%]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-cyan/10 rounded border border-brand-cyan/20">
            <FiWifi className="text-brand-cyan" size={14} />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] font-mono text-slate-400 tracking-[0.2em]">PACKET LOSS</span>
              <span className="text-[10px] font-mono text-status-success">0.01%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-status-success w-[2%]"></div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
