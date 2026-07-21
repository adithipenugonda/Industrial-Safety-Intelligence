import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiThermometer, FiWind, FiActivity, FiThermometer as TempIcon, FiWind as GasIcon, FiCpu, FiSun, FiLayers } from "react-icons/fi";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import TelemetryCard from "../../components/common/TelemetryCard";
import ThreatMatrixWidget from "../../components/alerts/ThreatMatrixWidget";
import AIAdvisorFeed from "../../components/ai/AIAdvisorFeed";
import DigitalTwinView from "../../components/factory/DigitalTwinView";
import WeatherWidget from "../../components/environment/WeatherWidget";
import TimeMachineTimeline from "../../components/timemachine/TimeMachineTimeline";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

// Mock Historical Data with Dynamic Per-Snapshot Risk Engine Breakdowns
const snapshots = [
  {
    id: "t-12h",
    time: "T-12H",
    createdAt: "10:42",
    risk: "LOW",
    riskScore: "12%",
    reason: "Nominal Facility Operations",
    riskBreakdown: [
      { label: "Temperature", percent: 3, icon: TempIcon, color: "text-emerald-400" },
      { label: "Gas Concentration", percent: 2, icon: GasIcon, color: "text-[#00E5FF]" },
      { label: "Pressure Impact", percent: 4, icon: FiCpu, color: "text-cyan-400" },
      { label: "Environment", percent: 1, icon: FiSun, color: "text-emerald-400" },
      { label: "Equipment", percent: 2, icon: FiLayers, color: "text-[#00E5FF]" }
    ],
    twin: { riskLevel: "NOMINAL", coreLoad: "1.2", personnel: 85, status: "HISTORICAL: T-12H", pulseColor: "rgba(52,211,153,0.2)", ringColor: "emerald-400", warningLevel: "status-success" },
    telemetry: { temp: "840", pressure: "18.5", gas: "0.01" },
    threats: { level: "DEFCON 5", badge: "SECURE", badgeClass: "text-emerald-400 font-bold", riskColor: "status-success", active: [], alerts: [{ time: "T-12:50", msg: "Routine scan complete", level: "info" }] },
    weather: { temp: "22°C", condition: "Clear", severity: "NONE", wind: "5 km/h", uv: "UV 4" },
    ai: {
      sequence: ["Analyzing historical logs from T-12H...", 500, "All systems operated within optimal parameters. No anomalies detected."],
      analysis: { priority: "LOW", riskReduction: "N/A", rootCause: "Standard operating procedure.", actions: ["None required."] }
    }
  },
  {
    id: "t-4h",
    time: "T-4H",
    createdAt: "14:15",
    risk: "WARN",
    riskScore: "45%",
    reason: "Pressure Valve Gasket Offset",
    riskBreakdown: [
      { label: "Temperature", percent: 15, icon: TempIcon, color: "text-amber-400" },
      { label: "Gas Concentration", percent: 8, icon: GasIcon, color: "text-amber-400" },
      { label: "Pressure Impact", percent: 18, icon: FiCpu, color: "text-[#00E5FF]" },
      { label: "Environment", percent: 2, icon: FiSun, color: "text-emerald-400" },
      { label: "Equipment", percent: 2, icon: FiLayers, color: "text-[#00E5FF]" }
    ],
    twin: { riskLevel: "WATCH", coreLoad: "1.8", personnel: 110, status: "HISTORICAL: T-4H", pulseColor: "rgba(245,158,11,0.25)", ringColor: "amber-400", warningLevel: "status-warning" },
    telemetry: { temp: "1,050", pressure: "25.1", gas: "0.03" },
    threats: { 
      level: "DEFCON 4", badge: "WARNING", badgeClass: "text-amber-400 font-bold", riskColor: "status-warning",
      active: [{ id: 1, type: "Pressure", risk: "WARN", pos: { top: "65%", left: "25%" } }],
      alerts: [{ time: "T-04:12", msg: "Pressure valve 42 calibration offset", level: "warn" }]
    },
    weather: { temp: "19°C", condition: "Overcast", severity: "LOW", wind: "12 km/h", uv: "UV 2" },
    ai: {
      sequence: ["Analyzing historical logs from T-4H...", 500, "Minor pressure fluctuation detected in Valve 42. Auto-calibration compensated successfully."],
      analysis: { priority: "MODERATE", riskReduction: "25%", rootCause: "Wear on primary gasket seal.", actions: ["Schedule gasket replacement within 48h."] }
    }
  },
  {
    id: "t-1h",
    time: "T-1H",
    createdAt: "18:30",
    risk: "CRITICAL",
    riskScore: "92%",
    reason: "Core Temperature Spike",
    riskBreakdown: [
      { label: "Temperature", percent: 45, icon: TempIcon, color: "text-red-400" },
      { label: "Gas Concentration", percent: 20, icon: GasIcon, color: "text-red-400" },
      { label: "Pressure Impact", percent: 15, icon: FiCpu, color: "text-amber-400" },
      { label: "Environment", percent: 7, icon: FiSun, color: "text-emerald-400" },
      { label: "Equipment", percent: 5, icon: FiLayers, color: "text-[#00E5FF]" }
    ],
    twin: { riskLevel: "CRITICAL", coreLoad: "2.9", personnel: 180, status: "HISTORICAL: T-1H", pulseColor: "rgba(239,68,68,0.35)", ringColor: "red-500", warningLevel: "status-danger" },
    telemetry: { temp: "1,550", pressure: "48.9", gas: "0.09" },
    threats: { 
      level: "DEFCON 3", badge: "CRITICAL", badgeClass: "text-red-400 font-bold", riskColor: "status-danger",
      active: [{ id: 1, type: "Thermal", risk: "CRITICAL", pos: { top: "30%", left: "60%" } }],
      alerts: [{ time: "T-01:24", msg: "Thermal spike Sec-7G", level: "critical" }]
    },
    weather: { temp: "20°C", condition: "Acid Rain", severity: "HIGH", wind: "24 km/h", uv: "UV 1" },
    ai: {
      sequence: ["Analyzing historical logs from T-1H...", 500, "CRITICAL: Thermal runaway imminent in Sector 7G. Cooling manifold failed."],
      analysis: { priority: "CRITICAL", riskReduction: "94%", rootCause: "Micro-fracture detected in tertiary coolant line.", actions: ["Initiate remote bypass.", "Reroute 15% coolant.", "Dispatch drone D-4."] }
    }
  },
  {
    id: "now",
    time: "NOW",
    createdAt: "21:50",
    risk: "WARN",
    riskScore: "82%",
    reason: "Reactor Thermal Anomaly",
    riskBreakdown: [
      { label: "Temperature", percent: 40, icon: TempIcon, color: "text-red-400" },
      { label: "Gas Concentration", percent: 25, icon: GasIcon, color: "text-amber-400" },
      { label: "Pressure Impact", percent: 15, icon: FiCpu, color: "text-[#00E5FF]" },
      { label: "Environment", percent: 10, icon: FiSun, color: "text-emerald-400" },
      { label: "Equipment", percent: 10, icon: FiLayers, color: "text-[#00E5FF]" }
    ],
    twin: { riskLevel: "ELEVATED", coreLoad: "2.4", personnel: 148, status: "HISTORICAL: NOW", pulseColor: "rgba(34,211,238,0.2)", ringColor: "brand-cyan", warningLevel: "status-warning" },
    telemetry: { temp: "1,240", pressure: "34.2", gas: "0.05" },
    threats: { 
      level: "DEFCON 4", badge: "HIGH", badgeClass: "text-red-400 font-bold", riskColor: "status-danger",
      active: [
        { id: 1, type: "Thermal", risk: "CRITICAL", pos: { top: "30%", left: "60%" } },
        { id: 2, type: "Pressure", risk: "WARN", pos: { top: "65%", left: "25%" } }
      ],
      alerts: [{ time: "T-00:05", msg: "System stabilizing...", level: "warn" }]
    },
    weather: { temp: "18°C", condition: "Acid Rain", severity: "LOW", wind: "14 km/h", uv: "UV 2" },
    ai: {
      sequence: ["Analyzing current state...", 500, "Anomaly detected in Reactor Core 2. Immediate intervention is highly recommended to prevent thermal runaway."],
      analysis: { priority: "CRITICAL", riskReduction: "94%", rootCause: "Micro-fracture detected in tertiary coolant line valve casing.", actions: ["Initiate remote bypass of Valve 42.", "Reroute 15% coolant flow.", "Dispatch maintenance drone."] }
    }
  }
];

export default function TimeMachineScreen() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSnap = snapshots[selectedIndex];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedIndex((prev) => {
          if (prev >= snapshots.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative bg-factory-bg-base select-none font-mono">
      <SVGConnectionLayer />

      <div className="fixed top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar 
            extraRight={
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-bold">
                  PLAYBACK: <span className="text-white">{currentSnap.time}</span>
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Center Digital Twin */}
      <motion.div 
        key={currentSnap.id}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[600px] h-[400px]"
      >
        <div className="w-full h-full hover-scale group cursor-pointer transition-transform duration-500">
          <DigitalTwinView overrideStatus={currentSnap.twin} />
        </div>
      </motion.div>

      {/* Clean Minimal Snapshot Banner */}
      <motion.div
        key={`snap-banner-${currentSnap.id}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 left-8 z-30 p-3.5 rounded-xl bg-[#050B14]/90 border border-white/10 backdrop-blur-md text-xs text-slate-200 space-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Snapshot Reason: <span className="text-white font-bold">{currentSnap.reason}</span></span>
          <span className="text-slate-400">Risk Score: <span className="text-red-400 font-bold font-orbitron">{currentSnap.riskScore}</span></span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10">
          <span>Created At: {currentSnap.createdAt}</span>
          <span className="text-[#00E5FF] font-bold">Generated by Risk Engine</span>
        </div>
      </motion.div>

      {/* Left Telemetry */}
      <div className="absolute top-[38%] left-8 -translate-y-1/2 z-20 flex flex-col gap-4 w-72">
        <TelemetryCard 
          title="Core Temp" 
          value={currentSnap.telemetry.temp} 
          unit="°C" 
          icon={FiThermometer} 
          status={currentSnap.risk === "CRITICAL" ? "critical" : currentSnap.risk === "WARN" ? "warning" : "normal"}
          delay={0.1}
        />
        <TelemetryCard 
          title="Pressure" 
          value={currentSnap.telemetry.pressure} 
          unit="PSI" 
          icon={FiActivity} 
          status={currentSnap.risk === "CRITICAL" ? "critical" : "normal"}
          delay={0.2}
        />
        <TelemetryCard 
          title="Gas Levels" 
          value={currentSnap.telemetry.gas} 
          unit="ppm" 
          icon={FiWind} 
          status={currentSnap.risk === "CRITICAL" ? "warning" : "normal"}
          delay={0.3}
        />
      </div>

      {/* Right Threat Matrix */}
      <div className="absolute top-[35%] right-8 -translate-y-1/2 z-20 w-[330px] h-[360px]">
        <ThreatMatrixWidget 
          threatLevel={currentSnap.threats.level}
          riskBadge={currentSnap.riskScore}
          riskScore={currentSnap.riskScore}
          riskSeverity={currentSnap.risk}
          riskBreakdown={currentSnap.riskBreakdown}
          customThreats={currentSnap.threats.active}
          customAlerts={currentSnap.threats.alerts}
        />
      </div>

      {/* Bottom Left Weather */}
      <div className="absolute bottom-28 left-8 z-20">
        <WeatherWidget overrideWeather={currentSnap.weather} />
      </div>

      {/* Bottom Right AI Advisor */}
      <div className="absolute bottom-28 right-8 z-20 w-[360px]">
        <AIAdvisorFeed 
          customSequence={currentSnap.ai.sequence}
          customAnalysis={currentSnap.ai.analysis}
        />
      </div>

      {/* Bottom Control Bar Timeline */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-auto">
        <TimeMachineTimeline 
          snapshots={snapshots}
          selectedIndex={selectedIndex}
          onSelectSnapshot={(idx) => setSelectedIndex(idx)}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </CinematicTransition>
  );
}
