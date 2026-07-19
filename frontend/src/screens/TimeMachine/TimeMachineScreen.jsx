import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiThermometer, FiWind, FiActivity } from "react-icons/fi";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import TelemetryCard from "../../components/common/TelemetryCard";
import ThreatMatrixWidget from "../../components/alerts/ThreatMatrixWidget";
import AIAdvisorFeed from "../../components/ai/AIAdvisorFeed";
import DigitalTwinView from "../../components/factory/DigitalTwinView";
import WeatherWidget from "../../components/environment/WeatherWidget";
import TimeMachineTimeline from "../../components/timemachine/TimeMachineTimeline";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

// Mock Historical Data
const snapshots = [
  {
    id: "t-12h",
    time: "T-12H",
    risk: "LOW",
    twin: { riskLevel: "NOMINAL", coreLoad: "1.2", personnel: 85, status: "HISTORICAL: T-12H", pulseColor: "rgba(34,211,238,0.1)", ringColor: "brand-cyan", warningLevel: "status-success" },
    telemetry: { temp: "840", pressure: "18.5", gas: "0.01" },
    threats: { level: "DEFCON 5", badge: "SECURE", badgeClass: "text-status-success neon-text", riskColor: "status-success", active: [], alerts: [{ time: "T-12:50", msg: "Routine scan complete", level: "info" }] },
    weather: { temp: "22°C", condition: "Clear", severity: "NONE", wind: "5 km/h", uv: "UV 4" },
    ai: {
      sequence: ["Analyzing historical logs from T-12H...", 500, "All systems operated within optimal parameters. No anomalies detected."],
      analysis: { priority: "LOW", riskReduction: "N/A", rootCause: "Standard operating procedure.", actions: ["None required."] }
    }
  },
  {
    id: "t-4h",
    time: "T-4H",
    risk: "WARN",
    twin: { riskLevel: "WATCH", coreLoad: "1.8", personnel: 110, status: "HISTORICAL: T-4H", pulseColor: "rgba(250,204,21,0.2)", ringColor: "yellow-400", warningLevel: "status-warning" },
    telemetry: { temp: "1,050", pressure: "25.1", gas: "0.03" },
    threats: { 
      level: "DEFCON 4", badge: "WARNING", badgeClass: "text-status-warning shadow-[0_0_8px_currentColor]", riskColor: "status-warning",
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
    risk: "CRITICAL",
    twin: { riskLevel: "CRITICAL", coreLoad: "2.9", personnel: 180, status: "HISTORICAL: T-1H", pulseColor: "rgba(239,68,68,0.3)", ringColor: "red-500", warningLevel: "status-danger" },
    telemetry: { temp: "1,550", pressure: "48.9", gas: "0.09" },
    threats: { 
      level: "DEFCON 3", badge: "CRITICAL", badgeClass: "text-status-danger neon-text-danger", riskColor: "status-danger",
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
    risk: "WARN",
    twin: { riskLevel: "ELEVATED", coreLoad: "2.4", personnel: 148, status: "HISTORICAL: NOW", pulseColor: "rgba(34,211,238,0.2)", ringColor: "brand-cyan", warningLevel: "status-warning" },
    telemetry: { temp: "1,240", pressure: "34.2", gas: "0.05" },
    threats: { 
      level: "DEFCON 4", badge: "ELEVATED", badgeClass: "text-status-danger neon-text-danger", riskColor: "status-danger",
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

  // Auto-play logic
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
      }, 5000); // 5 seconds per snapshot during playback
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative bg-factory-bg-base">
      {/* Background glowing connections */}
      <SVGConnectionLayer />

      {/* Top Bar: System Status */}
      <div className="absolute top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSnap.id}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Center: Interactive Factory Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[600px] h-[400px] pointer-events-auto">
            <div className="w-full h-full hover-scale group cursor-pointer transition-transform duration-500">
              <DigitalTwinView {...currentSnap.twin} />
            </div>
          </div>

          {/* Left: Telemetry */}
          <div className="absolute top-[35%] left-8 -translate-y-1/2 z-20 flex flex-col gap-4 w-72 pointer-events-auto">
            <TelemetryCard title="Core Temp" value={currentSnap.telemetry.temp} unit="°C" icon={FiThermometer} status={currentSnap.twin.warningLevel === 'status-danger' ? 'warning' : 'normal'} delay={0.1} />
            <TelemetryCard title="Pressure" value={currentSnap.telemetry.pressure} unit="PSI" icon={FiActivity} status={currentSnap.twin.warningLevel === 'status-danger' ? 'warning' : 'normal'} delay={0.2} />
            <TelemetryCard title="Gas Levels" value={currentSnap.telemetry.gas} unit="ppm" icon={FiWind} status="normal" delay={0.3} />
          </div>

          {/* Right: Threat Matrix */}
          <div className="absolute top-[40%] right-8 -translate-y-1/2 z-20 w-[340px] h-[450px] pointer-events-auto">
            <div className="h-full hover-scale group">
              <ThreatMatrixWidget 
                threatLevel={currentSnap.threats.level} 
                riskBadge={currentSnap.threats.badge} 
                riskBadgeClass={currentSnap.threats.badgeClass} 
                riskColor={currentSnap.threats.riskColor} 
                customThreats={currentSnap.threats.active} 
                customAlerts={currentSnap.threats.alerts} 
              />
            </div>
          </div>

          {/* Bottom Left: Weather */}
          <div className="absolute bottom-32 left-12 z-20 pointer-events-auto">
            <WeatherWidget {...currentSnap.weather} />
          </div>

          {/* Bottom Right: AI Advisor */}
          <div className="absolute bottom-32 right-12 z-20 w-[400px] pointer-events-auto">
            <div className="h-full hover-scale">
              <AIAdvisorFeed 
                customSequence={currentSnap.ai.sequence}
                customAnalysis={currentSnap.ai.analysis}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Center: Timeline Playback Controls (Always visible, doesn't animate out on change) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl">
        <TimeMachineTimeline 
          snapshots={snapshots} 
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
        />
      </div>

    </CinematicTransition>
  );
}
