import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCpu, FiAlertTriangle } from "react-icons/fi";

const healthMetrics = [
  { id: 1, label: "AIR QUALITY", value: 95, status: "NOMINAL", desc: "No pollutants detected" },
  { id: 2, label: "STORM PROBABILITY", value: 65, status: "WARN", desc: "Approaching front" },
  { id: 3, label: "HEAT STRESS", value: 20, status: "NOMINAL", desc: "Cooling systems active" },
  { id: 4, label: "RADIATION LEAK", value: 8, status: "NOMINAL", desc: "Within safety limits" }
];

function RadialGauge({ label, value, status, desc, delay }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  let color = "#22d3ee"; // brand-cyan
  let textClass = "text-brand-cyan";
  if (status === "WARN") {
    color = "#facc15"; // warning yellow
    textClass = "text-status-warning";
  } else if (status === "CRITICAL") {
    color = "#ef4444"; // danger red
    textClass = "text-status-danger animate-pulse";
  }

  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
        </svg>
        
        {/* Animated Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_8px_currentColor]" style={{ color }}>
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
          />
        </svg>

        {/* Center Value */}
        <div className={`absolute flex flex-col items-center justify-center ${textClass}`}>
          <span className="text-xl font-orbitron font-bold tracking-tight">{value}</span>
          <span className="text-[8px] font-mono">%</span>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-slate-300 w-full leading-tight">
          {label}
        </span>
        <span className={`text-[8px] font-mono mt-1 transition-opacity ${textClass}`}>
          {desc}
        </span>
      </div>
    </div>
  );
}

const TypewriterLine = ({ text, onComplete, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (index === 0) {
      timeout = setTimeout(() => {
        setIndex(1);
      }, delay);
    } else if (index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index));
        setIndex(index + 1);
      }, 30);
    } else if (index > text.length) {
      onComplete?.();
    }
    return () => clearTimeout(timeout);
  }, [index, text, onComplete, delay]);

  return (
    <div className="font-mono text-[9px] tracking-widest text-slate-400">
      <span className="text-brand-cyan mr-2">›</span>
      {displayedText}
      {index <= text.length && index > 0 && <span className="animate-pulse">_</span>}
    </div>
  );
};

function AICopilot() {
  const [phase, setPhase] = useState(0);
  
  // Sequence phases:
  // 0: Analyzing environmental conditions...
  // 1: Correlating telemetry with weather...
  // 2: Calculating industrial impact...
  // 3: Generating recommendations...
  // 4: Final report fade in
  // 5: Finished

  return (
    <div className="mt-auto p-4 rounded bg-[#050816] border border-brand-cyan/20 flex flex-col gap-3 relative overflow-hidden shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-2xl rounded-full mix-blend-screen pointer-events-none"></div>
      
      <div className="flex items-center gap-2 border-b border-brand-cyan/20 pb-2">
        <FiCpu className={phase < 4 ? "text-brand-cyan animate-pulse" : "text-brand-cyan"} size={14} />
        <span className="text-[10px] font-orbitron font-bold tracking-[0.2em] text-brand-cyan uppercase">
          {phase < 4 ? "AI Copilot: Reasoning" : "AI Copilot: Analysis Complete"}
        </span>
      </div>

      <div className="flex flex-col gap-1 min-h-[60px]">
        {phase >= 0 && <TypewriterLine text="Analyzing environmental conditions..." onComplete={() => setPhase(1)} delay={500} />}
        {phase >= 1 && <TypewriterLine text="Correlating telemetry with weather..." onComplete={() => setPhase(2)} delay={200} />}
        {phase >= 2 && <TypewriterLine text="Calculating industrial impact..." onComplete={() => setPhase(3)} delay={200} />}
        {phase >= 3 && <TypewriterLine text="Generating recommendations..." onComplete={() => setPhase(4)} delay={200} />}
        
        {phase >= 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-3 p-3 bg-brand-cyan/5 border border-brand-cyan/20 rounded flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-status-warning">
              <FiAlertTriangle size={12} />
              <span className="text-[9px] font-mono tracking-widest uppercase font-bold">Storm Probability Elevated</span>
            </div>
            <p className="text-[10px] font-mono text-slate-300 tracking-wider leading-relaxed">
              Recommend preemptive lockdown of external ventilation shafts in Sector 7G within the next 4 hours to prevent moisture ingress.
            </p>
            <div className="flex justify-between items-center mt-2 border-t border-brand-cyan/10 pt-2">
              <span className="text-[8px] font-mono tracking-[0.2em] text-slate-500 uppercase">Affected Zones: 7G, 8A</span>
              <span className="text-[8px] font-mono tracking-[0.2em] text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded">Confidence: 92%</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function EnvironmentalHealth() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-full h-full glass-panel flex flex-col p-6"
    >
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] uppercase text-white">
          Health Index
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-status-success shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
          <span className="text-[10px] font-mono text-status-success tracking-widest">STABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-10 gap-x-4">
        {healthMetrics.map((metric, idx) => (
          <RadialGauge 
            key={metric.id} 
            label={metric.label} 
            value={metric.value} 
            status={metric.status}
            desc={metric.desc}
            delay={0.3 + (idx * 0.1)}
          />
        ))}
      </div>

      <AICopilot />
    </motion.div>
  );
}
