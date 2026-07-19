import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import { FiCpu, FiChevronDown, FiChevronUp, FiAlertOctagon, FiCheckCircle, FiSearch, FiShield } from "react-icons/fi";

export default function AIAdvisorFeed({ 
  customSequence = null,
  customAnalysis = null
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const defaultSequence = [
    'Anomaly detected in Reactor Core 2.',
    500,
    'Anomaly detected in Reactor Core 2. The cooling manifold pressure has dropped by 4.2% over the last 15 minutes, deviating from expected parameters. Immediate intervention is highly recommended to prevent thermal runaway.',
  ];

  const analysis = customAnalysis || {
    priority: "CRITICAL",
    riskReduction: "94%",
    rootCause: "Micro-fracture detected in tertiary coolant line valve casing. Probable cause: prolonged vibration exposure from adjacent heavy machinery.",
    actions: [
      "Initiate remote bypass of Valve 42.",
      "Reroute 15% coolant flow through secondary manifold.",
      "Dispatch maintenance drone D-4 to Sector 7G."
    ]
  };

  // Simulate thinking then typing
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 6000); // Wait for the typing animation to finish
    return () => clearTimeout(timer);
  }, [customSequence]);

  return (
    <div className="glass-panel p-5 flex flex-col w-full text-slate-200 pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-brand-cyan/20 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-cyan/10 rounded border border-brand-cyan/30 flex items-center justify-center">
            <FiCpu className="text-brand-cyan text-lg animate-pulse" />
          </div>
          <div>
            <h3 className="text-brand-cyan font-bold tracking-widest uppercase font-orbitron text-sm">AI Advisor</h3>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">MODEL: GPT-FACTORY-4</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isTyping ? (
            <div className="flex gap-1 items-center bg-white/5 px-2 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <span className="text-[10px] text-status-success font-mono tracking-wider bg-status-success/10 px-2 py-1 rounded-full border border-status-success/30">
              ANALYSIS COMPLETE
            </span>
          )}
        </div>
      </div>

      {/* Main Message Body */}
      <div className="font-mono text-sm leading-relaxed mb-4 min-h-[80px]">
        <TypeAnimation
          key={customSequence ? customSequence[0] : 'default'} // Force re-render on sequence change
          sequence={customSequence || defaultSequence}
          wrapper="p"
          cursor={true}
          speed={70}
          className="text-slate-300"
        />
      </div>

      {/* Expandable Details */}
      <div className="bg-factory-bg-base/50 rounded border border-white/5 overflow-hidden">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400 hover:text-brand-cyan hover:bg-white/5 transition-colors"
        >
          <span className="tracking-widest uppercase">View Detailed Analysis</span>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 flex flex-col gap-3"
            >
              
              {/* Badges Row */}
              <div className="flex items-center gap-2 pt-2">
                <div className={`flex items-center gap-1.5 px-2 py-1 ${analysis.priority === 'CRITICAL' ? 'bg-status-danger/10 border-status-danger/30 text-status-danger' : 'bg-status-warning/10 border-status-warning/30 text-status-warning'} border rounded text-[10px] font-bold tracking-wider`}>
                  <FiAlertOctagon /> PRIORITY: {analysis.priority}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-cyan/10 border border-brand-cyan/30 rounded text-[10px] font-bold text-brand-cyan tracking-wider">
                  <FiShield /> RISK REDUCTION: {analysis.riskReduction}
                </div>
              </div>

              {/* Root Cause */}
              <div className="bg-white/5 p-3 rounded border-l-2 border-status-warning mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <FiSearch className="text-status-warning" size={14} />
                  <h4 className="text-xs text-status-warning font-bold font-mono uppercase tracking-wider">Root Cause</h4>
                </div>
                <p className="text-xs text-slate-400 font-mono">{analysis.rootCause}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-white/5 p-3 rounded border-l-2 border-status-success">
                <div className="flex items-center gap-2 mb-2">
                  <FiCheckCircle className="text-status-success" size={14} />
                  <h4 className="text-xs text-status-success font-bold font-mono uppercase tracking-wider">Recommended Actions</h4>
                </div>
                <ul className="text-xs text-slate-400 font-mono flex flex-col gap-1 list-disc pl-4">
                  {analysis.actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
