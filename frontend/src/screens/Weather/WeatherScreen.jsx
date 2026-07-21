import { motion } from "framer-motion";
import { useState } from "react";
import { FiCloudRain, FiWind, FiDroplet, FiSun, FiActivity, FiLayers } from "react-icons/fi";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import CinematicTransition from "../../components/common/CinematicTransition";

import HolographicGlobe from "../../components/environment/HolographicGlobe";
import AtmosphericNode from "../../components/environment/AtmosphericNode";
import PredictionStrip from "../../components/environment/PredictionStrip";
import EnvironmentalHealth from "../../components/environment/EnvironmentalHealth";

const initialNodes = [
  { id: 1, name: "Core Temp", value: 18, unit: "°C", status: "NOMINAL", icon: FiSun },
  { id: 2, name: "Wind Speed", value: 45, unit: "km/h", status: "WARN", icon: FiWind },
  { id: 3, name: "Precipitation", value: 12, unit: "mm/h", status: "NOMINAL", icon: FiCloudRain },
  { id: 4, name: "Humidity", value: 92, unit: "%", status: "NOMINAL", icon: FiDroplet },
  { id: 5, name: "Barometric", value: 1012, unit: "hPa", status: "NOMINAL", icon: FiActivity },
  { id: 6, name: "Air Quality", value: 145, unit: "AQI", status: "CRITICAL", icon: FiWind },
];

export default function WeatherScreen() {
  const [nodes, _setNodes] = useState(initialNodes);
  const [activeLayer, setActiveLayer] = useState('ALL');

  const GLOBE_RADIUS = 280; // Distance of nodes from the globe center

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative text-slate-200">
      
      {/* Dynamic Background: Ambient Space & Advanced Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05)_0%,rgba(5,8,22,1)_100%)]"></div>
        
        {/* Slow Scanning Grid Overlay */}
        <motion.div 
          className="absolute inset-0 w-full h-[200%] opacity-10"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Ambient Floating Dust */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              y: [0, -100 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
          />
        ))}

        {/* Radar Sweeps in negative space (bottom left) */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border border-brand-cyan/5 flex items-center justify-center opacity-30">
          <div className="absolute w-full h-full rounded-full border border-brand-cyan/5 scale-75"></div>
          <div className="absolute w-full h-full rounded-full border border-brand-cyan/5 scale-50"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left"
            style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34, 211, 238, 0.2) 90deg, rgba(34, 211, 238, 0.8) 90deg, transparent 91deg)' }}
          />
        </div>
      </div>

      {/* Top Bar: System Status */}
      <div className="absolute top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar 
            extraRight={
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-md">
                <div className="px-2 flex items-center gap-1.5 text-slate-400 border-r border-white/10">
                  <FiLayers size={12} />
                  <span className="text-[9px] font-mono tracking-widest uppercase font-bold">LAYERS</span>
                </div>
                {['ALL', 'TEMP', 'WIND', 'RAIN'].map(layer => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest transition-all ${
                      activeLayer === layer 
                        ? 'bg-brand-cyan text-[#050816] shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            }
          />
        </div>
      </div>

      <div className="pt-20 px-6 pb-4 h-full flex flex-col z-10 relative max-w-[1800px] mx-auto w-full min-h-0">
        
        {/* Header Section */}
        <div className="mb-2 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <h1 className="text-base font-bold tracking-wider text-white uppercase font-orbitron">
              Environmental Intelligence
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-8 min-h-0 mb-6">
          
          {/* Zones 1 & 2: Holographic Globe & Floating Nodes (Left/Center) */}
          <div className="flex-1 h-full relative flex items-center justify-center">
            
            <HolographicGlobe />

            {/* Render Nodes orbiting the globe */}
            {nodes.map((node, _index) => {
              // Only show nodes based on active layer
              if (activeLayer !== 'ALL') {
                if (activeLayer === 'TEMP' && node.name !== 'Core Temp') return null;
                if (activeLayer === 'WIND' && !node.name.includes('Wind') && !node.name.includes('Air')) return null;
                if (activeLayer === 'RAIN' && !node.name.includes('Precipitation') && !node.name.includes('Humidity')) return null;
              }

              // Calculate angles for spreading them around the left, top, and bottom
              // We'll leave the right side somewhat open for the health panel
              const startAngle = 135; 
              const endAngle = 315;
              const angleRange = endAngle - startAngle;
              
              // Recalculate index if filtering
              const visibleNodes = activeLayer === 'ALL' ? nodes : nodes.filter(n => {
                if (activeLayer === 'TEMP' && n.name === 'Core Temp') return true;
                if (activeLayer === 'WIND' && (n.name.includes('Wind') || n.name.includes('Air'))) return true;
                if (activeLayer === 'RAIN' && (n.name.includes('Precipitation') || n.name.includes('Humidity'))) return true;
                return false;
              });

              const visibleIndex = visibleNodes.findIndex(n => n.id === node.id);
              if (visibleIndex === -1) return null;

              const angle = visibleNodes.length > 1 
                ? startAngle + (angleRange / (visibleNodes.length - 1)) * visibleIndex
                : 225; // center if only one

              let lineColor = "bg-brand-cyan/20";
              let packetColor = "bg-brand-cyan drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]";
              if (node.status === 'CRITICAL') {
                lineColor = "bg-status-danger/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
                packetColor = "bg-status-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]";
              } else if (node.status === 'WARN') {
                lineColor = "bg-status-warning/30";
                packetColor = "bg-status-warning drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]";
              }

              return (
                <div key={`atmos-group-${node.id}`}>
                  {/* SVG Connection Line equivalent (using rotating div) */}
                  <div 
                    className="absolute top-1/2 left-1/2 origin-left flex items-center pointer-events-none"
                    style={{ 
                      width: `${GLOBE_RADIUS}px`, 
                      transform: `rotate(${angle}deg)`,
                      zIndex: 1 
                    }}
                  >
                    <div className={`w-full h-px ${lineColor} transition-colors duration-500`}></div>
                    
                    {/* Flowing Data Packet */}
                    <motion.div 
                      className={`absolute w-1.5 h-1.5 rounded-full ${packetColor}`}
                      animate={{ 
                        left: ["100%", "0%"], // Flow inwards to globe
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                      }}
                    />
                  </div>

                  <AtmosphericNode 
                    {...node}
                    angle={angle}
                    radius={GLOBE_RADIUS}
                  />
                </div>
              );
            })}
          </div>

          {/* Zone 4: Right Panel - Environmental Health */}
          <div className="w-[350px] shrink-0 h-full">
            <EnvironmentalHealth />
          </div>

        </div>

        {/* Zone 3: Bottom Strip - Prediction Intelligence */}
        <div className="shrink-0 w-full h-[140px]">
          <PredictionStrip />
        </div>

      </div>
    </CinematicTransition>
  );
}
