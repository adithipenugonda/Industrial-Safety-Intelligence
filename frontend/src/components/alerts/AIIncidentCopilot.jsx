import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCpu, FiTerminal, FiShield } from "react-icons/fi";

export default function AIIncidentCopilot({ incident }) {
  const [typedText, setTypedText] = useState("");
  const fullText = incident?.aiSummary || "Analysis complete. The current anomaly is highly correlated with recent temperature spikes in the secondary cooling loop. The risk of thermal runaway is calculated at 14%. Immediate isolation of Sector 7G is recommended to prevent cascade failure.";

  useEffect(() => {
    setTypedText("");
    if (!incident) return;
    
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      currentText += fullText[i];
      setTypedText(currentText);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 15);
    
    return () => clearInterval(interval);
  }, [incident, fullText]);

  if (!incident) return null;

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan/20 animate-scan pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <h3 className="text-brand-cyan text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
        <FiCpu className="text-lg" />
        AI Incident Assessment
      </h3>
      
      <div className="flex-1 flex flex-col gap-4">
        {/* Terminal output style */}
        <div className="bg-black/40 border border-brand-cyan/20 p-4 rounded-md font-mono text-sm text-slate-300 relative h-32 overflow-y-auto custom-scrollbar">
          <div className="absolute top-2 right-2 text-brand-cyan opacity-50"><FiTerminal /></div>
          <p className="leading-relaxed">
            <span className="text-brand-cyan mr-2">&gt;</span>
            {typedText}
            <span className="animate-pulse text-brand-cyan">_</span>
          </p>
        </div>

        {/* AI Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="bg-glass-base p-3 rounded border border-white/5 flex flex-col">
            <span className="text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider">Escalation Probability</span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-orbitron font-bold text-status-warning">14%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-800 mt-2 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '14%' }} 
                transition={{ duration: 1 }}
                className="h-full bg-status-warning"
              ></motion.div>
            </div>
          </div>
          
          <div className="bg-glass-base p-3 rounded border border-white/5 flex flex-col">
            <span className="text-xs font-mono text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1">
              <FiShield className="text-brand-cyan" /> Confidence
            </span>
            <div className="flex items-end gap-2">
              <span className="text-xl font-orbitron font-bold text-brand-cyan">98.2%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-800 mt-2 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '98.2%' }} 
                transition={{ duration: 1 }}
                className="h-full bg-brand-cyan"
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
