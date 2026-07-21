import { useState, useEffect } from "react";
import {
  FiThermometer,
  FiWind,
  FiActivity,
  FiDroplet,
  FiUsers,
  FiZap,
  FiShield,
  FiCpu,
  FiRadio,
} from "react-icons/fi";
import { motion } from "framer-motion";

import CinematicTransition from "../../components/common/CinematicTransition";
import SystemStatusBar from "../../components/common/SystemStatusBar";

import FactoryCore from "../../components/telemetry/FactoryCore";
import {
  TelemetryLeftPanel,
  TelemetryRightPanel,
} from "../../components/telemetry/TelemetryPanels";

const initialSensors = [
  {
    id: 1,
    name: "Flow Rate",
    type: "FLOW RATE",
    unit: "L/min",
    value: 37,
    base: 37,
    variance: 3,
    status: "NOMINAL",
    icon: FiDroplet,
  },
  {
    id: 2,
    name: "Vibration",
    type: "VIBRATION",
    unit: "mm/s",
    value: 152,
    base: 152,
    variance: 5,
    status: "NOMINAL",
    icon: FiUsers,
  },
  {
    id: 3,
    name: "Core Temp",
    type: "TEMP °C",
    unit: "°C",
    value: 855,
    base: 855,
    variance: 20,
    status: "NOMINAL",
    icon: FiThermometer,
  },
  {
    id: 4,
    name: "Exhaust",
    type: "EXHAUST °C",
    unit: "°C",
    value: 1288,
    base: 1288,
    variance: 40,
    status: "NOMINAL",
    icon: FiThermometer,
  },
  {
    id: 5,
    name: "Oxygen",
    type: "OXYGEN %",
    unit: "%",
    value: 43.81,
    base: 44,
    variance: 2,
    status: "NOMINAL",
    icon: FiActivity,
  },
  {
    id: 6,
    name: "Power",
    type: "POWER %",
    unit: "%",
    value: 85.88,
    base: 85.8,
    variance: 3,
    status: "NOMINAL",
    icon: FiZap,
  },
  {
    id: 7,
    name: "Air Flow",
    type: "AIR FLOW",
    unit: "m³/s",
    value: 0.05,
    base: 0.05,
    variance: 0.01,
    status: "NOMINAL",
    icon: FiWind,
  },
  {
    id: 8,
    name: "Pressure",
    type: "PRESSURE",
    unit: "Bar",
    value: 0.69,
    base: 0.69,
    variance: 0.2,
    status: "CRITICAL",
    icon: FiWind,
  },
];

export default function TelemetryScreen() {
  const [sensors, setSensors] = useState(initialSensors);

  useEffect(() => {
    const timer = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          if (Math.random() > 0.35) return sensor;

          let value =
            sensor.base +
            Math.random() * sensor.variance * 2 -
            sensor.variance;

          if (
            sensor.unit === "%" ||
            sensor.unit === "Bar" ||
            sensor.unit === "m³/s"
          ) {
            value = parseFloat(value.toFixed(2));
          } else {
            value = Math.round(value);
          }

          return {
            ...sensor,
            value,
            status: sensor.id === 8 ? "CRITICAL" : "NOMINAL",
          };
        })
      );
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <CinematicTransition className="w-screen h-screen bg-[#050B14] overflow-hidden text-white relative flex flex-col justify-between select-none">
      {/* SCADA Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Radial Depth Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.07),transparent_75%)] pointer-events-none" />

      {/* Header Bar */}
      <div className="absolute top-0 left-0 w-full z-50 p-4">
        <SystemStatusBar />
      </div>

      {/* Main Content Area: Flex-1 Min-H-0 ensures footer is ALWAYS visible at bottom */}
      <div className="flex-1 min-h-0 flex w-full overflow-hidden items-center justify-between px-6 pt-16 pb-2 max-w-[1920px] mx-auto shrink-0">
        
        {/* Fixed 360px Left Panel */}
        <div className="w-[360px] flex-shrink-0 h-full max-h-[780px]">
          <TelemetryLeftPanel sensors={sensors} />
        </div>

        {/* Fixed 700px Center Radar Workspace Container */}
        <div
          className="flex justify-center items-center flex-none relative"
          style={{
            width: "700px",
            minWidth: "700px",
            maxWidth: "700px",
          }}
        >
          <FactoryCore sensors={sensors} />
        </div>

        {/* Fixed 360px Right Panel */}
        <div className="w-[360px] flex-shrink-0 h-full max-h-[780px]">
          <TelemetryRightPanel />
        </div>

      </div>

      {/* Full-Width Industrial SCADA Status Footer Bar - 100% Guaranteed Visible */}
      <div className="h-11 w-full glass-panel flex items-center px-6 gap-6 bg-[#050B14]/95 border-t border-[#00E5FF]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] shrink-0 z-40 justify-between">
        
        {/* Live Stream Badge */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]"></span>
          <span className="text-[11px] font-orbitron font-bold tracking-[0.2em] text-[#00E5FF] uppercase">
            LIVE STREAM
          </span>
        </div>

        {/* Continuous Infinite Sliding Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 whitespace-nowrap text-[11px] font-mono tracking-widest text-slate-300 items-center w-max"
          >
            {/* Set 1 */}
            <span className="flex items-center gap-2">
              <FiRadio className="text-[#00E5FF]" /> HANDSHAKE SECURE - 8 NODES CONNECTED
            </span>
            <span className="flex items-center gap-2 text-[#FF4040] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FF4040] animate-ping" /> [CRITICAL] CONTAINMENT PRESSURE DROPPING
            </span>
            <span className="flex items-center gap-2">
              <FiCpu className="text-[#00E5FF]" /> [AI] PREDICTIVE MAINTENANCE SCHEDULED FOR PUMP B
            </span>
            <span className="flex items-center gap-2">
              <FiShield className="text-[#00E5FF]" /> [FACILITY] HUMIDITY STABLE AT 42%
            </span>

            {/* Set 2 (Seamless Loop) */}
            <span className="flex items-center gap-2">
              <FiRadio className="text-[#00E5FF]" /> HANDSHAKE SECURE - 8 NODES CONNECTED
            </span>
            <span className="flex items-center gap-2 text-[#FF4040] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FF4040] animate-ping" /> [CRITICAL] CONTAINMENT PRESSURE DROPPING
            </span>
            <span className="flex items-center gap-2">
              <FiCpu className="text-[#00E5FF]" /> [AI] PREDICTIVE MAINTENANCE SCHEDULED FOR PUMP B
            </span>
            <span className="flex items-center gap-2">
              <FiShield className="text-[#00E5FF]" /> [FACILITY] HUMIDITY STABLE AT 42%
            </span>
          </motion.div>
        </div>

        {/* System Online Status Badge */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
            SYSTEM ONLINE
          </span>
        </div>

      </div>
    </CinematicTransition>
  );
}
