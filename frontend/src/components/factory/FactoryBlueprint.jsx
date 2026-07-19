import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FactoryBlueprint({ sensors, workforce, equipment }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const sectors = ['Sector Alpha', 'Sector Beta', 'Sector Gamma', 'Sector Delta'];

  // Helper to place nodes deterministically inside a sector
  const getNodeCoords = (sectorName, index, total, offset = 0) => {
    let sx = 10, sy = 10, sw = 220, sh = 145;
    
    if (sectorName === 'Sector Beta') {
      sx = 250;
    } else if (sectorName === 'Sector Gamma') {
      sy = 175;
    } else if (sectorName === 'Sector Delta') {
      sx = 250;
      sy = 175;
    }

    // Use deterministic hash based on index and offset to scatter them
    const seed = (index * 17 + offset * 31) % 100;
    const padding = 25;
    
    const x = sx + padding + (seed % (sw - padding * 2));
    const y = sy + padding + (Math.floor(seed / 10) % (sh - padding * 2));

    return { x, y };
  };

  // Group items by sector
  const getSectorItems = (sectorName) => {
    const sectorSensors = sensors.filter(s => s.sector === sectorName);
    const sectorWorkforce = workforce.filter(w => w.sector === sectorName);
    const sectorEquipment = equipment.filter(e => e.sector === sectorName);

    return {
      sensors: sectorSensors,
      workforce: sectorWorkforce,
      equipment: sectorEquipment,
    };
  };

  return (
    <div className="relative w-full h-full bg-slate-950/80 border border-brand-cyan/20 rounded-xl overflow-hidden p-4 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
      {/* Background blueprint grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
      
      {/* Radar Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(34,211,238,0.1)_50%,transparent_55%)] bg-[size:100%_200%] animate-[scan_8s_linear_infinite] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase animate-pulse">
          // LIVE DIGITAL TWIN BLUEPRINT
        </span>
        <span className="text-[9px] font-mono text-slate-400">
          SYS_HEALTH: <span className="text-emerald-400 font-bold">100% NOMINAL</span>
        </span>
      </div>

      <svg viewBox="0 0 480 330" className="w-full h-auto select-none drop-shadow-[0_0_10px_rgba(6,182,212,0.15)]">
        {/* Definitions for gradients and filters */}
        <defs>
          <radialGradient id="cyan-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-heavy">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sectors Grid */}
        {sectors.map((name, idx) => {
          let sx = 8, sy = 8, sw = 224, sh = 148;
          if (name === 'Sector Beta') sx = 248;
          if (name === 'Sector Gamma') sy = 172;
          if (name === 'Sector Delta') { sx = 248; sy = 172; }

          const { sensors: sList, workforce: wList, equipment: eList } = getSectorItems(name);

          return (
            <g key={name}>
              {/* Sector Container Box */}
              <rect
                x={sx}
                y={sy}
                width={sw}
                height={sh}
                rx={6}
                fill="rgba(15, 23, 42, 0.3)"
                stroke="rgba(34, 211, 238, 0.25)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />

              {/* Sector Label */}
              <text
                x={sx + 10}
                y={sy + 18}
                className="font-mono text-[9px] font-bold fill-cyan-400/80 tracking-widest uppercase"
              >
                {name.toUpperCase()}
              </text>

              {/* Sector Metrics overlay */}
              <text
                x={sx + 10}
                y={sy + sh - 8}
                className="font-mono text-[8px] fill-slate-400/70"
              >
                SENS:{sList.length} | WRK:{wList.length} | EQ:{eList.length}
              </text>

              {/* Equipment Nodes (Squares) */}
              {eList.slice(0, 8).map((eq, eIdx) => {
                const { x, y } = getNodeCoords(name, eIdx, eList.length, 1);
                const isHovered = hoveredItem?.id === eq.id && hoveredItem?.itemType === 'equipment';
                return (
                  <rect
                    key={`eq-node-${eq.id}`}
                    x={x - 4}
                    y={y - 4}
                    width={8}
                    height={8}
                    rx={1}
                    className="cursor-pointer transition-all duration-300"
                    fill={eq.status === 'Active' ? '#f8fafc' : eq.status === 'Maintenance' ? '#fbbf24' : '#64748b'}
                    stroke={isHovered ? '#22d3ee' : 'none'}
                    strokeWidth={1.5}
                    onMouseEnter={() => setHoveredItem({ ...eq, itemType: 'equipment', x, y })}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                );
              })}

              {/* Workforce Nodes (Triangles/Diamonds) */}
              {wList.slice(0, 12).map((worker, wIdx) => {
                const { x, y } = getNodeCoords(name, wIdx, wList.length, 2);
                const isHovered = hoveredItem?.id === worker.id && hoveredItem?.itemType === 'worker';
                return (
                  <polygon
                    key={`worker-node-${worker.id}`}
                    points={`${x},${y - 4} ${x + 4},${y + 3} ${x - 4},${y + 3}`}
                    className="cursor-pointer transition-all duration-300"
                    fill="#38bdf8"
                    stroke={isHovered ? '#ffffff' : 'none'}
                    strokeWidth={1}
                    onMouseEnter={() => setHoveredItem({ ...worker, itemType: 'worker', x, y })}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                );
              })}

              {/* Sensor Nodes (Circles with Pulse Glow) */}
              {sList.slice(0, 8).map((sensor, sIdx) => {
                const { x, y } = getNodeCoords(name, sIdx, sList.length, 3);
                const isHovered = hoveredItem?.id === sensor.id && hoveredItem?.itemType === 'sensor';
                
                let sColor = '#22d3ee'; // Nominal
                if (sensor.status === 'Warning') sColor = '#facc15';
                if (sensor.status === 'Critical') sColor = '#f87171';

                return (
                  <g key={`sensor-node-${sensor.id}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={sensor.status === 'Critical' ? 6 : 4}
                      className="cursor-pointer animate-ping"
                      fill={sColor}
                      opacity={0.3}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={3.5}
                      className="cursor-pointer transition-all duration-300"
                      fill={sColor}
                      stroke={isHovered ? '#ffffff' : 'none'}
                      strokeWidth={1}
                      onMouseEnter={() => setHoveredItem({ ...sensor, itemType: 'sensor', x, y })}
                      onMouseLeave={() => setHoveredItem(null)}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Live connections / Grid Link lines */}
        <line x1="240" y1="8" x2="240" y2="322" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="8" y1="166" x2="472" y2="166" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Floating Interactive Tooltip */}
      {hoveredItem && (
        <div 
          className="absolute z-50 pointer-events-none p-2 bg-slate-950/95 border border-brand-cyan/40 rounded shadow-xl text-[10px] font-mono text-cyan-100 max-w-[180px] backdrop-blur-md"
          style={{
            left: `${Math.min(hoveredItem.x + 15, 300)}px`,
            top: `${Math.min(hoveredItem.y + 15, 230)}px`
          }}
        >
          <div className="font-bold text-brand-cyan border-b border-brand-cyan/20 pb-1 mb-1">
            {hoveredItem.itemType.toUpperCase()}: {hoveredItem.name}
          </div>
          {hoveredItem.itemType === 'sensor' && (
            <>
              <div>Type: {hoveredItem.type}</div>
              <div>Status: <span className={hoveredItem.status === 'Warning' ? 'text-yellow-400' : hoveredItem.status === 'Critical' ? 'text-red-400' : 'text-emerald-400'}>{hoveredItem.status}</span></div>
              <div>Threshold: {hoveredItem.threshold}</div>
            </>
          )}
          {hoveredItem.itemType === 'worker' && (
            <>
              <div>Dept: {hoveredItem.department}</div>
              <div>Shift: {hoveredItem.shift}</div>
              <div>Cert: {hoveredItem.certifications}</div>
            </>
          )}
          {hoveredItem.itemType === 'equipment' && (
            <>
              <div>Type: {hoveredItem.type}</div>
              <div>Status: <span className={hoveredItem.status === 'Active' ? 'text-emerald-400' : hoveredItem.status === 'Maintenance' ? 'text-yellow-400' : 'text-slate-400'}>{hoveredItem.status}</span></div>
            </>
          )}
        </div>
      )}

      {/* Blueprint Legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 justify-center border-t border-white/5 pt-2 text-[9px] font-mono text-slate-400">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>Sensor</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-b-[6px] border-l-transparent border-r-transparent border-b-sky-400"></span>
          <span>Workforce</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-slate-200"></span>
          <span>Equipment</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-yellow-500"></span>
          <span>Warning / Maintenance</span>
        </div>
      </div>
    </div>
  );
}
