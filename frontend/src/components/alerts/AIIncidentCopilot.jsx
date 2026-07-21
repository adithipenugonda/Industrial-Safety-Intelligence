import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCpu, FiTerminal, FiShield } from "react-icons/fi";
import RiskEngineBadge from "../common/RiskEngineBadge";

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
    <div className="glass-panel p-5 h-full flex flex-col relative overflow-hidden group select-none font-mono">
      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan/20 animate-scan pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center justify-between mb-3 border-b border-brand-cyan/20 pb-2">
        <h3 className="text-brand-cyan text-xs tracking-widest uppercase flex items-center gap-2 font-bold font-orbitron">
          <FiCpu className="text-base" />
          Gemini AI Assessment
        </h3>
        <RiskEngineBadge text="Input: Risk Engine Output" size="xs" />
      </div>

      {/* INPUT CONTEXT CARD (Making it obvious Gemini receives Risk Engine outputs) */}
      <div className="mb-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-[10px] space-y-1">
        <div className="text-cyan-300 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>INPUT CONTEXT (FROM RISK ENGINE)</span>
          <span className="text-emerald-400">✓ PASSED TO GEMINI</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-slate-300">
          <div><span className="text-slate-500">Risk Score:</span> <span className="text-red-400 font-bold">92% (Critical)</span></div>
          <div><span className="text-slate-500">Active Alerts:</span> <span className="text-white font-bold">1 Triggered</span></div>
          <div><span className="text-slate-500">Telemetry:</span> <span className="text-amber-400 font-bold">Temp 950°C &gt; 900°C</span></div>
          <div><span className="text-slate-500">Weather:</span> <span className="text-sky-300 font-bold">18°C Acid Rain</span></div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        {/* Terminal output style for Gemini Analysis */}
        <div className="bg-black/40 border border-brand-cyan/20 p-3 rounded-md text-xs text-slate-300 relative flex-1 overflow-y-auto custom-scrollbar">
          <div className="absolute top-2 right-2 text-brand-cyan opacity-50"><FiTerminal /></div>
          <p className="leading-relaxed">
            <span className="text-brand-cyan mr-2">&gt;</span>
            {typedText}
            <span className="animate-pulse text-brand-cyan">_</span>
          </p>
        </div>

        {/* AI Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-glass-base p-2.5 rounded border border-white/5 flex flex-col">
            <span className="text-[9px] text-slate-400 mb-1 uppercase tracking-wider">Escalation Probability</span>
            <div className="flex items-end gap-2">
              <span className="text-lg font-orbitron font-bold text-status-warning">14%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 mt-1.5 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '14%' }} 
                transition={{ duration: 1 }}
                className="h-full bg-status-warning"
              />
            </div>
          </div>
          
          <div className="bg-glass-base p-2.5 rounded border border-white/5 flex flex-col">
            <span className="text-[9px] text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-1">
              <FiShield className="text-brand-cyan" /> Model Confidence
            </span>
            <div className="flex items-end gap-2">
              <span className="text-lg font-orbitron font-bold text-brand-cyan">98.2%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 mt-1.5 rounded overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '98.2%' }} 
                transition={{ duration: 1 }}
                className="h-full bg-brand-cyan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
