import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCpu, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const TypewriterText = ({ text, onComplete, delay = 0 }) => {
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
      }, 20); // Faster typing for analytics
    } else if (index > text.length) {
      onComplete?.();
    }
    return () => clearTimeout(timeout);
  }, [index, text, onComplete, delay]);

  return (
    <span>
      {displayedText}
      {index <= text.length && index > 0 && <span className="animate-pulse opacity-50">_</span>}
    </span>
  );
};

export default function AIBriefing() {
  const [phase, setPhase] = useState(0);

  // Phases:
  // 0: Init
  // 1: Generating What Changed
  // 2: Generating Why
  // 3: Generating Correlation
  // 4: Generating Recommendation
  // 5: Complete

  useEffect(() => {
    setPhase(1);
  }, []);

  return (
    <div className="glass-panel p-6 flex flex-col h-full relative overflow-hidden border-brand-cyan/20 bg-[#050816]/80">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="flex items-center gap-3 border-b border-brand-cyan/20 pb-4 mb-4">
        <div className="p-2 bg-brand-cyan/10 rounded-lg">
          <FiCpu className={phase < 5 ? "text-brand-cyan animate-pulse" : "text-brand-cyan"} size={18} />
        </div>
        <div>
          <h3 className="text-sm font-orbitron font-bold tracking-[0.2em] text-white uppercase">AI Executive Briefing</h3>
          <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase">
            {phase < 5 ? "Synthesizing Data..." : "Analysis Complete"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* What Changed */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase">Primary Event</span>
          <p className="text-xs font-mono text-slate-300 leading-relaxed min-h-[20px]">
            {phase >= 1 && (
              <TypewriterText 
                text="Humidity levels in Sector 7 increased by 18% over the last 45 minutes." 
                onComplete={() => setPhase(2)} 
              />
            )}
          </p>
        </div>

        {/* Why it changed */}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase">Root Cause</span>
            <p className="text-xs font-mono text-slate-300 leading-relaxed min-h-[20px]">
              <TypewriterText 
                text="Approaching storm front caused rapid pressure drop and condensation buildup." 
                onComplete={() => setPhase(3)} 
              />
            </p>
          </motion.div>
        )}

        {/* Correlations */}
        {phase >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 p-3 bg-status-warning/5 border border-status-warning/20 rounded">
            <span className="text-[9px] font-mono text-status-warning tracking-[0.2em] uppercase flex items-center gap-2">
              <FiAlertTriangle size={10} /> Critical Correlation
            </span>
            <p className="text-xs font-mono text-status-warning/90 leading-relaxed min-h-[30px]">
              <TypewriterText 
                text="Combined with rising methane levels from Valve 4, this increases localized explosion probability by 12%." 
                onComplete={() => setPhase(4)} 
              />
            </p>
          </motion.div>
        )}

        {/* Recommendation */}
        {phase >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1 mt-auto pt-4 border-t border-white/5">
            <span className="text-[9px] font-mono text-brand-cyan tracking-[0.2em] uppercase flex items-center gap-2">
              <FiCheckCircle size={10} /> Recommended Action
            </span>
            <p className="text-xs font-mono text-white leading-relaxed min-h-[20px]">
              <TypewriterText 
                text="Dispatch maintenance crew to inspect Sector 7 ventilation and seal Valve 4." 
                onComplete={() => setPhase(5)} 
              />
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
