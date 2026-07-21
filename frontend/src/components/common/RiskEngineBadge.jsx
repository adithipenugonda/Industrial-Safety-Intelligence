import React from 'react';
import { FiShield, FiCpu } from 'react-icons/fi';

export default function RiskEngineBadge({ text = "Risk Engine", size = "sm", pulse = false }) {
  const isXs = size === "xs";
  
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase rounded-full border bg-cyan-950/60 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.2)] ${
      isXs ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"
    }`}>
      <FiShield className={`text-cyan-400 ${pulse ? "animate-pulse" : ""}`} size={isXs ? 10 : 12} />
      <span>🛡 {text}</span>
    </span>
  );
}
