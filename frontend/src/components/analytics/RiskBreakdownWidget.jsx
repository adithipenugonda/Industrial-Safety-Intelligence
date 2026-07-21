import React from 'react';
import { FiShield, FiThermometer, FiWind, FiCpu, FiSun, FiLayers } from 'react-icons/fi';
import RiskEngineBadge from '../common/RiskEngineBadge';

export default function RiskBreakdownWidget() {
  const breakdown = [
    { label: 'Temperature Contribution', percent: 40, color: '#FF4040', icon: FiThermometer },
    { label: 'Gas Concentration', percent: 25, color: '#F59E0B', icon: FiWind },
    { label: 'Pressure Impact', percent: 15, color: '#00E5FF', icon: FiCpu },
    { label: 'Environment Conditions', percent: 10, color: '#34D399', icon: FiSun },
    { label: 'Equipment Health', percent: 10, color: '#A855F7', icon: FiLayers }
  ];

  return (
    <div className="glass-panel p-4 rounded-xl border border-brand-cyan/20 bg-slate-950/80 font-mono text-slate-200 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)] select-none h-full">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-brand-cyan/20 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <RiskEngineBadge text="Risk Engine" size="xs" pulse />
          <h3 className="text-xs font-orbitron font-bold text-white tracking-widest uppercase">
            RISK BREAKDOWN ANALYSIS
          </h3>
        </div>
        <span className="text-[10px] font-bold text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded border border-red-500/40">
          OVERALL: CRITICAL (82%)
        </span>
      </div>

      {/* Progress Bars Spectrum */}
      <div className="space-y-2.5 flex-1 justify-center flex flex-col">
        {breakdown.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Icon style={{ color: item.color }} size={12} />
                  {item.label}
                </span>
                <span className="font-bold" style={{ color: item.color }}>
                  {item.percent}%
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${item.percent}%`, backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Explanation */}
      <div className="pt-2.5 border-t border-white/10 mt-3 flex items-center justify-between text-[9px] text-slate-400">
        <span>Deterministic Multi-Factor Scoring</span>
        <span className="text-[#00E5FF] font-bold">Computed by Backend Risk Engine</span>
      </div>
    </div>
  );
}
