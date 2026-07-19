import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiThermometer, FiWind, FiActivity, FiDroplet, FiUsers } from "react-icons/fi";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import CinematicTransition from "../../components/common/CinematicTransition";

import FactoryCore from "../../components/telemetry/FactoryCore";
import OrbitalSensor from "../../components/telemetry/OrbitalSensor";
import { TelemetryLeftPanel, TelemetryRightPanel } from "../../components/telemetry/TelemetryPanels";

const initialSensors = [
  { id: 1, name: "Core Temp Alpha", type: "Temperature", unit: "°C", value: 840, base: 840, variance: 50, status: "NOMINAL", icon: FiThermometer },
  { id: 2, name: "Core Temp Beta", type: "Temperature", unit: "°C", value: 1250, base: 1250, variance: 100, status: "WARN", icon: FiThermometer },
  { id: 3, name: "Coolant Pressure", type: "Pressure", unit: "PSI", value: 45.2, base: 45, variance: 5, status: "NOMINAL", icon: FiActivity },
  { id: 4, name: "Containment Pressure", type: "Pressure", unit: "PSI", value: 89.1, base: 90, variance: 2, status: "CRITICAL", icon: FiActivity },
  { id: 5, name: "Sector 7G Exhaust", type: "Gas", unit: "ppm", value: 0.05, base: 0.05, variance: 0.02, status: "NOMINAL", icon: FiWind },
  { id: 6, name: "Methane Detectors", type: "Gas", unit: "ppm", value: 1.2, base: 0.5, variance: 0.8, status: "WARN", icon: FiWind },
  { id: 7, name: "Facility Humidity", type: "Humidity", unit: "%", value: 42, base: 40, variance: 5, status: "NOMINAL", icon: FiDroplet },
  { id: 8, name: "Active Personnel", type: "Workers", unit: "Total", value: 148, base: 148, variance: 2, status: "NOMINAL", icon: FiUsers },
];

export default function TelemetryScreen() {
  const [sensors, setSensors] = useState(initialSensors);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => {
        if (Math.random() > 0.4) return sensor;

        let newValue = sensor.base + (Math.random() * sensor.variance * 2) - sensor.variance;
        if (sensor.unit === "ppm" || sensor.unit === "PSI") {
          newValue = parseFloat(newValue.toFixed(2));
        } else {
          newValue = Math.round(newValue);
        }

        let newStatus = "NOMINAL";
        const deviation = Math.abs((newValue - sensor.base) / sensor.base);
        if (deviation > 0.15 || (sensor.id === 4 && newValue < 85)) {
            newStatus = "CRITICAL";
        } else if (deviation > 0.08) {
            newStatus = "WARN";
        }

        return { ...sensor, value: newValue, status: newStatus };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const ORBIT_RADIUS = 320; // Fixed radius in pixels for orbital layout

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative text-slate-200">
      
      {/* Background styling for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(5,8,22,0)_0%,rgba(3,5,12,0.8)_100%)] pointer-events-none"></div>

      {/* Top Bar: System Status */}
      <div className="absolute top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar />
        </div>
      </div>

      <div className="pt-[140px] px-8 pb-8 h-full flex flex-col z-10 relative">
        <div className="flex-1 flex gap-8 h-full items-center">
          
          {/* Left Panel (20%) */}
          <div className="w-1/5 h-[80%] max-h-[800px]">
            <TelemetryLeftPanel sensors={sensors} />
          </div>

          {/* Center Orbital Canvas (60%) */}
          <div className="w-3/5 h-full relative flex items-center justify-center">
            
            {/* The Central Holographic Factory Core */}
            <FactoryCore />

            {/* Orbital Connection Lines and Sensors */}
            {sensors.map((sensor, index) => {
              const angle = (index / sensors.length) * 360;
              
              // Determine line color based on status
              let lineColor = "bg-brand-cyan/20";
              let packetColor = "bg-brand-cyan drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]";
              if (sensor.status === 'CRITICAL') {
                lineColor = "bg-status-danger/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
                packetColor = "bg-status-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]";
              } else if (sensor.status === 'WARN') {
                lineColor = "bg-status-warning/30";
                packetColor = "bg-status-warning drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]";
              }

              return (
                <div key={`orbital-group-${sensor.id}`}>
                  {/* Connection Line */}
                  <div 
                    className="absolute top-1/2 left-1/2 origin-left flex items-center pointer-events-none"
                    style={{ 
                      width: `${ORBIT_RADIUS}px`, 
                      transform: `rotate(${angle}deg)`,
                      zIndex: 1 
                    }}
                  >
                    <div className={`w-full h-px ${lineColor} transition-colors duration-500`}></div>
                    
                    {/* Flowing Data Packet */}
                    <motion.div 
                      className={`absolute w-1.5 h-1.5 rounded-full ${packetColor}`}
                      animate={{ 
                        left: ["0%", "100%", "0%"],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 2, // Randomize flow speed slightly
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                      }}
                    />
                  </div>

                  {/* The Sensor Node */}
                  <OrbitalSensor 
                    {...sensor}
                    angle={angle}
                    radius={ORBIT_RADIUS}
                  />
                </div>
              );
            })}

          </div>

          {/* Right Panel (20%) */}
          <div className="w-1/5 h-[80%] max-h-[800px]">
            <TelemetryRightPanel sensors={sensors} />
          </div>

        </div>

        {/* Bottom Section - Event Ticker */}
        <div className="h-12 w-full mt-auto glass-panel flex items-center px-6 gap-4 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_-10px_30px_rgba(0,0,0,0.3)]">
          <span className="text-[10px] font-orbitron font-bold tracking-widest text-brand-cyan shrink-0 uppercase border-r border-white/10 pr-4">
            Live Stream
          </span>
          <div className="flex-1 overflow-hidden relative">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 whitespace-nowrap text-[10px] font-mono tracking-widest text-slate-400"
            >
              <span>[CORE] TEMP FLUCTUATION DETECTED IN SECTOR 7G</span>
              <span>[NETWORK] HANDSHAKE SECURE WITH ALL 8 NODES</span>
              <span className="text-status-danger">[CRITICAL] CONTAINMENT PRESSURE DROPPING</span>
              <span>[AI] PREDICTIVE MAINTENANCE SCHEDULED FOR PUMP B</span>
              <span>[FACILITY] HUMIDITY STABLE AT 42%</span>
              <span>[CORE] TEMP FLUCTUATION DETECTED IN SECTOR 7G</span>
            </motion.div>
          </div>
        </div>

      </div>
    </CinematicTransition>
  );
}
