import { motion } from "framer-motion";
import { FiClock, FiThermometer, FiWind, FiAlertOctagon, FiCpu } from "react-icons/fi";

const events = [
  { time: "08:00", text: "Temperature increased by 4°C in Sector 7", icon: FiThermometer, color: "text-slate-400" },
  { time: "08:10", text: "Ambient pressure dropped 12 hPa", icon: FiWind, color: "text-slate-400" },
  { time: "08:15", text: "Methane concentration increased (Valve 4)", icon: FiAlertOctagon, color: "text-status-warning" },
  { time: "08:18", text: "Explosion Risk changed to HIGH", icon: FiAlertOctagon, color: "text-status-danger" },
  { time: "08:19", text: "AI generated lockdown recommendation", icon: FiCpu, color: "text-brand-cyan" },
];

export default function StoryTimeline() {
  return (
    <div className="glass-panel p-6 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] text-white uppercase flex items-center gap-2">
          <FiClock className="text-brand-cyan" /> Event Timeline
        </h3>
        <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">Last 60 Mins</span>
      </div>

      <div className="flex-1 relative pl-2 overflow-y-auto custom-scrollbar pr-2">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-2 bottom-4 w-px bg-white/10"></div>

        <div className="flex flex-col gap-6">
          {events.map((ev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-start gap-4 relative group cursor-pointer"
            >
              <div className={`w-6 h-6 rounded-full bg-[#050816] border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-brand-cyan/50 transition-colors`}>
                <ev.icon size={10} className={ev.color} />
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 mb-1">{ev.time}</span>
                <p className={`text-xs font-mono tracking-wide ${ev.color === 'text-slate-400' ? 'text-slate-300' : ev.color}`}>
                  {ev.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
