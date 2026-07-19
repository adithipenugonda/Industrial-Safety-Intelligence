import { motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

export default function AlertRegistry({ alerts, activeIncidentId, onSelectAlert }) {
  
  const getIcon = (severity) => {
    switch(severity) {
      case "CRITICAL": return <FiAlertCircle className="text-status-danger" />;
      case "WARN": return <FiAlertCircle className="text-status-warning" />;
      case "INFO": return <FiInfo className="text-brand-blue" />;
      default: return <FiCheckCircle className="text-status-success" />;
    }
  };

  return (
    <div className="glass-panel p-4 h-full flex flex-col">
      <h3 className="text-slate-400 text-xs font-mono tracking-widest uppercase mb-4 border-b border-white/5 pb-2">
        Historical Alert Registry
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-2">
        {alerts.map((alert, idx) => {
          const isActive = alert.id === activeIncidentId;
          const isResolved = alert.status === "RESOLVED";
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectAlert(alert)}
              className={`p-3 rounded border cursor-pointer transition-all duration-300 ${
                isActive 
                  ? "bg-brand-cyan/10 border-brand-cyan/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                  : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-black/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg">
                    {getIcon(alert.severity)}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                      {alert.title}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1 flex gap-3">
                      <span>{alert.time}</span>
                      <span className={isResolved ? "text-status-success" : "text-slate-400"}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded ${
                  alert.severity === "CRITICAL" ? "bg-status-danger/20 text-status-danger border border-status-danger/30" : 
                  alert.severity === "WARN" ? "bg-status-warning/20 text-status-warning border border-status-warning/30" : 
                  "bg-slate-800 text-slate-400"
                }`}>
                  {alert.sector || "SEC-7G"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
