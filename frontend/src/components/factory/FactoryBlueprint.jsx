import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FactoryBlueprint({ sensors = [], workforce = [], equipment = [] }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Real-time dynamic waveform telemetry points state for all 4 sectors
  const [sectorWaveforms, setSectorWaveforms] = useState({
    alpha: [30, 45, 25, 60, 40, 70, 50, 65, 35, 55],
    beta: [50, 35, 65, 40, 55, 30, 75, 45, 60, 50],
    gamma: [25, 55, 40, 70, 35, 60, 45, 80, 50, 65],
    delta: [60, 40, 75, 30, 65, 50, 35, 70, 45, 55]
  });

  // Real-time animation loop updating waveform data points every 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setSectorWaveforms(prev => ({
        alpha: [...prev.alpha.slice(1), Math.floor(20 + Math.random() * 60)],
        beta: [...prev.beta.slice(1), Math.floor(25 + Math.random() * 55)],
        gamma: [...prev.gamma.slice(1), Math.floor(30 + Math.random() * 50)],
        delta: [...prev.delta.slice(1), Math.floor(15 + Math.random() * 65)]
      }));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const sectors = [
    { key: 'alpha', name: 'SECTOR ALPHA', color: '#00E5FF' },
    { key: 'beta', name: 'SECTOR BETA', color: '#00E5FF' },
    { key: 'gamma', name: 'SECTOR GAMMA', color: '#00E5FF' },
    { key: 'delta', name: 'SECTOR DELTA', color: '#00E5FF' }
  ];

  // Generate SVG path string from array of numbers
  const generatePath = (points, startX, startY, width, height) => {
    const stepX = width / (points.length - 1);
    return points.map((val, idx) => {
      const x = startX + idx * stepX;
      const y = startY + height - (val / 100) * height;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="relative w-full h-full bg-[#050B14] border border-[#00E5FF]/30 rounded-xl overflow-hidden p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col justify-between select-none">
      {/* Background SCADA grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05),transparent_75%)] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]" />
          <span className="text-xs font-orbitron font-bold tracking-[0.2em] text-[#00E5FF] uppercase">
            // LIVE DIGITAL TWIN BLUEPRINT
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          SYS_HEALTH: <span className="text-emerald-400 font-bold">100% NOMINAL</span>
        </div>
      </div>

      {/* 2x2 Sector Blueprint Waveform Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 z-10">
        {sectors.map((sec) => {
          const points = sectorWaveforms[sec.key];
          const latestVal = points[points.length - 1];
          const pathStr = generatePath(points, 15, 25, 180, 50);

          return (
            <div 
              key={sec.key}
              className="relative rounded-lg bg-[#050B14]/90 border border-[#00E5FF]/20 p-3 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_15px_rgba(0,229,255,0.05)]"
            >
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-orbitron font-bold text-slate-300 tracking-wider">
                  {sec.name}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/30">
                  {latestVal}% LOAD
                </span>
              </div>

              {/* Dynamic Real-Time Waveform Graph */}
              <div className="w-full h-[70px] relative flex items-center justify-center">
                <svg viewBox="0 0 210 80" className="w-full h-full">
                  <defs>
                    <linearGradient id={`grad-${sec.key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="10" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <line x1="10" y1="45" x2="200" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <line x1="10" y1="70" x2="200" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                  {/* Dynamic Path Area */}
                  <path
                    d={`${pathStr} L 195 75 L 15 75 Z`}
                    fill={`url(#grad-${sec.key})`}
                  />

                  {/* Live Animated Glowing Telemetry Line */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_#00E5FF]"
                  />

                  {/* Pulsing Data Points along the Graph */}
                  {points.map((val, idx) => {
                    const x = 15 + idx * (180 / (points.length - 1));
                    const y = 25 + 50 - (val / 100) * 50;
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="3" fill="#00E5FF" />
                        <circle cx={x} cy={y} r="6" fill="none" stroke="#00E5FF" strokeWidth="1" className="animate-ping opacity-40" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Sector Summary Node Status Footer */}
              <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 border-t border-white/5 pt-1.5 z-10">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" /> SENSORS: 6
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> WORKERS: 37
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> ASSETS: 4
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
