import { motion } from "framer-motion";

export default function IncidentTimeline({ incident }) {
  if (!incident) return null;

  // Mock timeline events based on the incident
  const events = [
    { time: "10:32:00", description: "Anomaly detected by Risk Engine.", type: "system" },
    { time: "10:32:45", description: incident.title + " triggered.", type: "alert" },
    { time: "10:33:15", description: "AI Assessment: High probability of escalation.", type: "ai" },
    { time: "10:34:00", description: "Automated counter-measures initiated.", type: "action" },
  ];

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
      <h3 className="text-brand-cyan text-sm font-mono tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-brand-cyan/20 pb-2">
        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
        Incident Lifecycle
      </h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar relative pl-4">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-brand-cyan/20"></div>

        <div className="flex flex-col gap-6 relative">
          {events.map((event, index) => {
            const isLatest = index === events.length - 1;
            let dotColor = "bg-slate-500";
            let textColor = "text-slate-300";
            
            if (event.type === "alert") { dotColor = "bg-status-danger"; textColor = "text-status-danger"; }
            else if (event.type === "ai") { dotColor = "bg-brand-blue"; textColor = "text-brand-blue"; }
            else if (event.type === "action") { dotColor = "bg-brand-cyan"; textColor = "text-white"; }
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-4 relative"
              >
                {/* Timeline Dot */}
                <div className="relative mt-1 z-10">
                  <div className={`w-3 h-3 rounded-full ${dotColor} shadow-[0_0_10px_${dotColor}]`}></div>
                  {isLatest && (
                    <div className={`absolute inset-0 rounded-full ${dotColor} animate-ping opacity-50`}></div>
                  )}
                </div>
                
                {/* Content */}
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">{event.time}</div>
                  <div className={`text-sm ${textColor}`}>{event.description}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
