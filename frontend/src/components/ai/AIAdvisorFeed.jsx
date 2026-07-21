import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import { FiCpu, FiChevronDown, FiChevronUp, FiCheckCircle, FiPlay, FiSearch, FiShield } from "react-icons/fi";

export default function AIAdvisorFeed({ 
  customSequence = null,
  customAnalysis = null
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [executedIndex, setExecutedIndex] = useState(null);

  const defaultSequence = [
    'Anomaly detected in Reactor Core 2.',
    500,
    'Cooling manifold pressure dropped by 4.2%. Micro-fracture in valve casing probable due to vibration. Recommended intervention generated.',
  ];

  const analysis = customAnalysis || {
    priority: "CRITICAL",
    riskReduction: "94%",
    rootCause: "Micro-fracture in tertiary coolant line valve casing due to vibration exposure.",
    actions: [
      "Initiate remote bypass of Valve 42.",
      "Reroute 15% coolant flow through secondary manifold.",
      "Dispatch maintenance drone D-4 to Sector 7G."
    ]
  };

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [customSequence]);

  const handleRunAction = (index) => {
    setExecutedIndex(index);
    setTimeout(() => setExecutedIndex(null), 3000);
  };

  return (
    <div className="glass-panel p-4 flex flex-col w-full text-slate-200 pointer-events-auto rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] select-none font-mono">
      
      {/* Clean Minimal Header */}
      <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#00E5FF]/10 rounded border border-[#00E5FF]/30 text-[#00E5FF]">
            <FiCpu size={14} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-[#00E5FF] font-bold tracking-widest uppercase font-orbitron text-xs">Gemini AI Advisor</h3>
            <span className="text-[9.5px] text-emerald-400 font-bold">Analysis Complete</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] text-slate-400 block">Based on Risk Score 82%</span>
          <span className="text-[10px] text-cyan-300 font-bold">Confidence 98%</span>
        </div>
      </div>

      {/* Main Message Typing Animation */}
      <div className="text-[11px] leading-relaxed mb-2 min-h-[44px]">
        <TypeAnimation
          key={customSequence ? customSequence[0] : 'default'}
          sequence={customSequence || defaultSequence}
          wrapper="p"
          cursor={true}
          speed={70}
          className="text-slate-300"
        />
      </div>

      {/* Expandable Details Accordion */}
      <div className="bg-black/30 rounded border border-white/5 overflow-hidden">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-400 hover:text-[#00E5FF] transition-colors cursor-pointer"
        >
          <span className="tracking-widest uppercase font-semibold">View Detailed Analysis</span>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-3 pb-3 flex flex-col gap-2.5 text-xs"
            >
              {/* Root Cause */}
              <div className="p-2.5 rounded bg-white/5 border-l-2 border-amber-400 space-y-1">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <FiSearch size={12} /> Root Cause
                </div>
                <p className="text-[11px] text-slate-300">{analysis.rootCause}</p>
              </div>

              {/* Recommended Actions */}
              <div className="p-2.5 rounded bg-white/5 border-l-2 border-emerald-400 space-y-2">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <FiCheckCircle size={12} /> Recommended Action
                </div>
                <div className="space-y-1.5">
                  {analysis.actions.map((act, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 p-1.5 rounded bg-black/40 border border-white/5 text-[10.5px]">
                      <span className="truncate">{act}</span>
                      <button
                        onClick={() => handleRunAction(i)}
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          executedIndex === i
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-slate-950'
                        }`}
                      >
                        {executedIndex === i ? 'Executed' : 'Run'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
