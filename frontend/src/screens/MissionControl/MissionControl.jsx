import { motion } from "framer-motion";
import { FiThermometer, FiWind, FiActivity } from "react-icons/fi";
import { useState, useEffect } from "react";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import TelemetryCard from "../../components/common/TelemetryCard";
import ThreatMatrixWidget from "../../components/alerts/ThreatMatrixWidget";
import AIAdvisorFeed from "../../components/ai/AIAdvisorFeed";
import DigitalTwinView from "../../components/factory/DigitalTwinView";
import WeatherWidget from "../../components/environment/WeatherWidget";
import TimelineWidget from "../../components/timemachine/TimelineWidget";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

export default function MissionControl() {
  const [_mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Center: Interactive Factory Core */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[600px] h-[400px]"
      >
        <div className="w-full h-full hover-scale group cursor-pointer transition-transform duration-500">
          <DigitalTwinView />
        </div>
      </motion.div>

      {/* Left: Telemetry */}
      <div className="absolute top-[35%] left-8 -translate-y-1/2 z-20 flex flex-col gap-4 w-72">
        <TelemetryCard 
          title="Core Temp" 
          value="1,240" 
          unit="°C" 
          icon={FiThermometer} 
          status="warning"
          delay={0.8}
        />
        <TelemetryCard 
          title="Pressure" 
          value="34.2" 
          unit="PSI" 
          icon={FiActivity} 
          status="normal"
          delay={0.9}
        />
        <TelemetryCard 
          title="Gas Levels" 
          value="0.05" 
          unit="ppm" 
          icon={FiWind} 
          status="normal"
          delay={1.0}
        />
      </div>

      {/* Right: Threat Matrix */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute top-[40%] right-8 -translate-y-1/2 z-20 w-[340px] h-[450px]"
      >
        <div className="h-full hover-scale group">
          <ThreatMatrixWidget />
        </div>
      </motion.div>

      {/* Bottom Left: Weather */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-28 left-12 z-20"
      >
        <WeatherWidget />
      </motion.div>

      {/* Bottom Right: AI Advisor */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-28 right-12 z-20 w-[400px]"
      >
        <div className="h-full hover-scale">
          <AIAdvisorFeed />
        </div>
      </motion.div>

      {/* Bottom Center: Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center"
      >
        <TimelineWidget />
      </motion.div>
    </CinematicTransition>
  );
}