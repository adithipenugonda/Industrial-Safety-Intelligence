import { motion } from "framer-motion";
import { FiSun, FiCloudRain, FiWind, FiCloudLightning, FiAlertCircle, FiArrowRight } from "react-icons/fi";

const forecastData = [
  { day: "TODAY", temp: 18, condition: "Acid Rain", icon: FiCloudRain, risk: "HIGH", confidence: 92, impact: "Corrosive Hazard", action: "Limit Exposure" },
  { day: "TMRW", temp: 21, condition: "Gale Winds", icon: FiWind, risk: "WARN", confidence: 88, impact: "Structural Stress", action: "Secure Cranes" },
  { day: "WED", temp: 24, condition: "Clear", icon: FiSun, risk: "LOW", confidence: 85, impact: "Nominal", action: "None" },
  { day: "THU", temp: 22, condition: "Ion Storm", icon: FiCloudLightning, risk: "CRITICAL", confidence: 75, impact: "EMP Risk", action: "Shield Grids" },
  { day: "FRI", temp: 20, condition: "Clear", icon: FiSun, risk: "LOW", confidence: 70, impact: "Nominal", action: "None" },
];

export default function PredictionStrip() {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar px-2">
      {forecastData.map((day, index) => {
        let riskColor = "text-status-success bg-status-success/10 border-status-success/30";
        if (day.risk === "WARN") riskColor = "text-status-warning bg-status-warning/10 border-status-warning/40 shadow-[0_0_10px_rgba(250,204,21,0.1)]";
        if (day.risk === "HIGH") riskColor = "text-orange-500 bg-orange-500/10 border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.1)]";
        if (day.risk === "CRITICAL") riskColor = "text-status-danger bg-status-danger/10 border-status-danger/40 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse";

        const Icon = day.icon;

        return (
          <div key={day.day} className="flex items-center shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[220px] glass-panel p-4 flex flex-col gap-3 group hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden rounded-xl border border-white/5"
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(34,211,238,0.1)_50%,transparent_100%)] h-[200%] -top-[100%] group-hover:top-[100%] transition-all duration-1000 ease-in-out pointer-events-none"></div>

              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] uppercase text-white">{day.day}</span>
                <div className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-widest border ${riskColor}`}>
                  RISK: {day.risk}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <Icon size={18} className={day.risk === 'CRITICAL' ? 'text-status-danger' : 'text-brand-cyan'} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-orbitron font-bold text-white leading-none">
                    {day.temp}<span className="text-xs text-brand-cyan">°C</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">{day.condition}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between items-center text-[8px] font-mono tracking-widest uppercase">
                  <span className="text-slate-500">AI Confidence</span>
                  <span className="text-brand-cyan">{day.confidence}%</span>
                </div>
                <div className="w-full h-[1px] bg-white/10 rounded overflow-hidden">
                  <div className="h-full bg-brand-cyan" style={{ width: `${day.confidence}%` }}></div>
                </div>
              </div>

              <div className="mt-1 flex flex-col gap-1.5 border-t border-white/5 pt-2">
                <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-wider text-slate-300">
                  <FiAlertCircle size={10} className={day.risk === 'CRITICAL' || day.risk === 'HIGH' ? 'text-status-danger' : 'text-brand-cyan'} />
                  <span className="truncate uppercase">{day.impact}</span>
                </div>
                <div className="text-[8px] font-mono tracking-wider text-slate-500 uppercase ml-4">
                  Action: <span className="text-white">{day.action}</span>
                </div>
              </div>
            </motion.div>

            {/* Timeline Connector Arrow */}
            {index < forecastData.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="mx-2 text-brand-cyan/40"
              >
                <FiArrowRight size={14} />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
