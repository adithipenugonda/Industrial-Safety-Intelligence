import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCpu } from "react-icons/fi";

import RiskTrendsChart from "./RiskTrendsChart";
import SensorTrendsChart from "./SensorTrendsChart";
import WorkerTrendsChart from "./WorkerTrendsChart";
import WeatherTrendsChart from "./WeatherTrendsChart";

const tabs = [
  { id: 'telemetry', label: 'Telemetry', component: SensorTrendsChart },
  { id: 'workforce', label: 'Workforce', component: WorkerTrendsChart },
  { id: 'environment', label: 'Environment', component: WeatherTrendsChart },
  { id: 'risk', label: 'Risk & Alerts', component: RiskTrendsChart },
];

const insights = {
  telemetry: {
    summary: "Sensor anomalies detected in Sector 4 and 7.",
    kpis: [
      { label: "Peak Temp", value: "112°C" },
      { label: "Pressure", value: "High" },
    ],
    ai: "Historical models indicate 78% correlation between these fluctuations and equipment degradation."
  },
  workforce: {
    summary: "Workforce deployment optimized for current risk levels.",
    kpis: [
      { label: "Active Shift", value: "124" },
      { label: "Exposure", value: "Low" },
    ],
    ai: "Recommended staffing adjustment: Reduce outdoor maintenance due to impending weather."
  },
  environment: {
    summary: "Approaching storm front impacting ambient conditions.",
    kpis: [
      { label: "Air Quality", value: "95" },
      { label: "Storm Prob", value: "65%" },
    ],
    ai: "Preemptive lockdown of external ventilation shafts in Sector 7G recommended."
  },
  risk: {
    summary: "Overall threat index elevated due to compounding factors.",
    kpis: [
      { label: "Critical", value: "2" },
      { label: "Resolved", value: "14" },
    ],
    ai: "Risk forecast predicts stabilization in 45 minutes post-lockdown procedures."
  }
};

export default function InteractiveWorkspace() {
  const [activeTab, setActiveTab] = useState('telemetry');
  
  const ActiveComponent = tabs.find(t => t.id === activeTab).component;
  const currentInsight = insights[activeTab];

  return (
    <div className="glass-panel p-6 flex flex-col h-full overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-white/10 pb-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded text-[10px] font-mono font-bold tracking-widest uppercase transition-all relative ${
              activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="active-tab-indicator"
                className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              />
            )}
          </button>
        ))}
        
        {/* Comparison Toggle Placeholder */}
        <div className="ml-auto flex bg-white/5 rounded p-1 border border-white/10">
          {['1H', '1D', '1W'].map(period => (
            <button key={period} className={`px-3 py-1 text-[9px] font-mono rounded ${period === '1H' ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-slate-500'}`}>
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* 70% Chart Area */}
        <div className="flex-[7] relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 30% Context Area */}
        <div className="flex-[3] flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`context-${activeTab}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 h-full"
            >
              {/* Summary */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Dataset Summary</span>
                <p className="text-sm font-orbitron tracking-wider text-slate-200">
                  {currentInsight.summary}
                </p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 gap-4">
                {currentInsight.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">{kpi.label}</span>
                    <span className="text-lg font-orbitron font-bold text-white">{kpi.value}</span>
                  </div>
                ))}
              </div>

              {/* AI Insight */}
              <div className="mt-auto p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded relative overflow-hidden flex gap-3">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/10 blur-xl rounded-full mix-blend-screen pointer-events-none"></div>
                <FiCpu className="text-brand-cyan mt-1 shrink-0" size={14} />
                <div className="flex flex-col gap-2 z-10">
                  <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase font-bold flex items-center gap-2">
                    AI Insight <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                  </span>
                  <p className="text-[10px] font-mono text-slate-300 leading-relaxed tracking-wider">
                    {currentInsight.ai}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
