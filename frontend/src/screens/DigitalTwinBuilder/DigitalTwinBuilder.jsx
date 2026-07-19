import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSliders, FiShield, FiCpu, FiUsers, FiRadio, FiInfo, FiActivity, FiArrowRight } from 'react-icons/fi';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import SystemStatusBar from '../../components/common/SystemStatusBar';
import CinematicTransition from '../../components/common/CinematicTransition';
import FactoryBlueprint from '../../components/factory/FactoryBlueprint';
import ModuleDrawer from '../../components/factory/ModuleDrawers';

export default function DigitalTwinBuilder() {
  const contextData = useDigitalTwin();
  const { profile, sensors, workforce, equipment, safetyPolicies, aiConfig } = contextData;

  const [activeModuleId, setActiveModuleId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Success toast helper
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Modules metadata
  const modules = [
    {
      id: 'factory-info',
      title: 'Factory Information',
      icon: FiInfo,
      description: 'Configure name, geolocations, industry class, sectors, working hours, and primary emergency lines.',
      getStats: () => `${profile.location || 'Not Set'} | ${profile.workingHours}`
    },
    {
      id: 'sensors',
      title: 'Sensor Registry',
      icon: FiRadio,
      description: 'Register sensors, assign sector telemetry mapping, adjust alarm thresholds, and monitor calibration logs.',
      getStats: () => `${sensors.length} Registered`
    },
    {
      id: 'workforce',
      title: 'Workforce Registry',
      icon: FiUsers,
      description: 'Manage active on-shift workers, assign zone certifications, update departments, and emergency profiles.',
      getStats: () => `${workforce.length} Active`
    },
    {
      id: 'equipment',
      title: 'Equipment Registry',
      icon: FiCpu,
      description: 'Track heavy boilers, air compressors, chillers, and turbines. Schedule and monitor maintenance intervals.',
      getStats: () => `${equipment.length} Devices`
    },
    {
      id: 'safety-policies',
      title: 'Safety Policies',
      icon: FiShield,
      description: 'Define limits for gas release, temperature thresholds, pressure relief triggers, and DEFCON priorities.',
      getStats: () => `${safetyPolicies.length} Active Policies`
    },
    {
      id: 'ai-config',
      title: 'AI Configuration',
      icon: FiSliders,
      description: 'Calibrate Gemini API status, prediction sensitivities, risk mitigation suggestions, and auto-incident logs.',
      getStats: () => `Gemini: ${aiConfig.geminiEnabled ? 'ACTIVE' : 'OFF'}`
    }
  ];

  const activeModule = modules.find(m => m.id === activeModuleId);

  // Dynamic status computing
  const activeWarnings = sensors.filter(s => s.status === 'Warning').length;
  const activeCritical = sensors.filter(s => s.status === 'Critical').length;
  const overallHealth = activeCritical > 0 ? 'CRITICAL' : activeWarnings > 0 ? 'WARNING' : 'OPTIMAL';

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative text-slate-200 bg-factory-bg-base">
      {/* Glow Backdrops */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(5,8,22,0)_0%,rgba(3,5,12,0.85)_100%)] pointer-events-none"></div>

      {/* Top Header Navigation */}
      <div className="absolute top-0 left-0 z-40 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar />
        </div>
      </div>

      {/* Main Workspace Wrapper */}
      <div className="pt-[110px] px-8 pb-8 h-full flex flex-col z-10 relative">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white uppercase font-orbitron">
              Factory Configuration
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage the Digital Twin Configuration of your Smart Factory
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0 font-mono text-[10px] text-slate-400">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-white/5">
              SECTORS: <span className="text-cyan-400 font-bold">{profile.sectorsCount || 4}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-white/5">
              HEALTH: <span className={`font-bold ${overallHealth === 'OPTIMAL' ? 'text-emerald-400' : overallHealth === 'WARNING' ? 'text-yellow-400' : 'text-red-400'}`}>{overallHealth}</span>
            </div>
          </div>
        </div>

        {/* 70% Left / 30% Right Layout Grid */}
        <div className="flex-1 min-h-0 flex gap-6">
          {/* LEFT 70%: Configuration Cards */}
          <div className="w-[70%] h-full overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4 scrollbar-thin">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  whileHover={{ scale: 1.015 }}
                  onClick={() => setActiveModuleId(mod.id)}
                  className="group relative cursor-pointer p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-brand-cyan/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
                >
                  {/* Neon active outline decoration */}
                  <div className="absolute inset-px rounded-2xl border border-transparent group-hover:border-brand-cyan/20 pointer-events-none transition-all duration-300"></div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/15 rounded-xl text-brand-cyan group-hover:bg-brand-cyan group-hover:text-slate-950 transition-all duration-300">
                        <Icon size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest group-hover:text-brand-cyan transition-colors">
                        CONFIGURE <FiArrowRight className="inline-block ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide group-hover:text-brand-cyan transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Telemetry Baseline</span>
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                      {mod.getStats()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT 30%: Live Digital Twin Summary */}
          <div className="w-[30%] h-full flex flex-col gap-4">
            {/* Blueprint visualization container */}
            <div className="flex-1 min-h-0">
              <FactoryBlueprint
                sensors={sensors}
                workforce={workforce}
                equipment={equipment}
              />
            </div>

            {/* Quick Metrics Summary List */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-xl flex flex-col gap-3">
              <h3 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-widest border-b border-white/5 pb-2">
                // SYSTEM PROFILE
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Twin Core</div>
                  <div className="text-white font-semibold truncate">{profile.name}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Industry</div>
                  <div className="text-white font-semibold truncate">{profile.industryType}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Registered Sensors</div>
                  <div className="text-cyan-400 font-bold">{sensors.length} Nodes</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Workforce Unit</div>
                  <div className="text-sky-400 font-bold">{workforce.length} Active</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Equipment Assets</div>
                  <div className="text-slate-200 font-bold">{equipment.length} Active</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 text-[10px] uppercase">Safety Limits</div>
                  <div className="text-yellow-400 font-bold">{safetyPolicies.length} Rules</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Drawer Panel Container */}
      <AnimatePresence>
        {activeModuleId && (
          <>
            {/* Dim Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModuleId(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            {/* Animated drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 h-full pointer-events-auto"
            >
              <ModuleDrawer
                activeModule={activeModule}
                isOpen={!!activeModuleId}
                onClose={() => setActiveModuleId(null)}
                contextData={contextData}
                showToast={triggerToast}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Success Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 border border-brand-cyan/40 shadow-[0_4px_20px_rgba(34,211,238,0.2)] text-white font-mono text-xs"
          >
            <span className="p-1 rounded bg-brand-cyan/20 text-brand-cyan"><FiActivity /></span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicTransition>
  );
}
