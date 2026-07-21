import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSliders, 
  FiShield, 
  FiCpu, 
  FiUsers, 
  FiRadio, 
  FiInfo, 
  FiPlus, 
  FiUpload, 
  FiDownload, 
  FiCheck, 
  FiUserCheck,
  FiX,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiArrowRight,
  FiArrowLeft,
  FiSave,
  FiGrid
} from 'react-icons/fi';
import { useDigitalTwin } from '../../context/DigitalTwinContext';
import SystemStatusBar from '../../components/common/SystemStatusBar';
import CinematicTransition from '../../components/common/CinematicTransition';
import FactoryBlueprint from '../../components/factory/FactoryBlueprint';

export default function DigitalTwinBuilder() {
  const contextData = useDigitalTwin();
  const { 
    profile, setProfile, 
    sensors, setSensors, 
    workforce, setWorkforce, 
    equipment, setEquipment, 
    safetyPolicies, setSafetyPolicies, 
    aiConfig, setAiConfig 
  } = contextData;

  // activeModuleId: null means Overview Grid mode. Otherwise, Studio Mode (e.g. 'workers', 'sensors', etc.)
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // --- 1. FACTORY MODULE STATE ---
  const [factoryForm, setFactoryForm] = useState({
    name: profile.name || 'FactoryOS Alpha',
    location: profile.location || 'Houston, TX',
    industryType: profile.industryType || 'Chemical & Power Gen',
    workingHours: profile.workingHours || '24/7',
    emergencyHotline: profile.emergencyHotline || '+1 (555) 911-SAFE'
  });
  const [sectorList, setSectorList] = useState(['Sector Alpha', 'Sector Beta', 'Sector Gamma', 'Sector Delta']);
  const [newSectorName, setNewSectorName] = useState('');

  // --- 2. SENSORS MODULE STATE ---
  const [sensorSearch, setSensorSearch] = useState('');
  const [sensorTypeFilter, setSensorTypeFilter] = useState('All Types');
  const [sensorSectorFilter, setSensorSectorFilter] = useState('All Sectors');
  const [registeringSensor, setRegisteringSensor] = useState(false);
  const [newSensor, setNewSensor] = useState({ name: '', type: 'Temperature', sector: 'Sector Alpha', threshold: 80 });

  // --- 3. WORKERS MODULE STATE ---
  const [workerForm, setWorkerForm] = useState({
    fullName: 'Alex Morgan',
    department: 'Operations',
    sector: 'Sector Alpha',
    shift: 'Day',
    certification: 'OSHA 30',
    emergencyContact: '+1 (555) 012-3456'
  });

  // --- 4. EQUIPMENT MODULE STATE ---
  const [equipmentList, setEquipmentList] = useState([
    { id: 'EQ-101', name: 'HVAC Unit 1', type: 'COOLING UNIT', sector: 'SECTOR ALPHA', status: 'ACTIVE' },
    { id: 'EQ-102', name: 'Steam Boiler 2', type: 'BOILER', sector: 'SECTOR BETA', status: 'MAINTENANCE' },
    { id: 'EQ-103', name: 'Air Compressor 3', type: 'COMPRESSOR', sector: 'SECTOR GAMMA', status: 'IDLE' },
    { id: 'EQ-104', name: 'Chill Water Pump 4', type: 'COOLING UNIT', sector: 'SECTOR DELTA', status: 'ACTIVE' },
    { id: 'EQ-105', name: 'Turbine Generator 5', type: 'MACHINE', sector: 'SECTOR ALPHA', status: 'MAINTENANCE' },
    { id: 'EQ-106', name: 'HVAC Unit 6', type: 'COOLING UNIT', sector: 'SECTOR BETA', status: 'IDLE' },
    { id: 'EQ-107', name: 'Steam Boiler 7', type: 'BOILER', sector: 'SECTOR GAMMA', status: 'ACTIVE' },
    { id: 'EQ-108', name: 'Air Compressor 8', type: 'COMPRESSOR', sector: 'SECTOR DELTA', status: 'MAINTENANCE' },
    { id: 'EQ-109', name: 'Chill Water Pump 9', type: 'COOLING UNIT', sector: 'SECTOR ALPHA', status: 'IDLE' },
    { id: 'EQ-110', name: 'Turbine Generator 10', type: 'MACHINE', sector: 'SECTOR BETA', status: 'ACTIVE' },
    { id: 'EQ-111', name: 'HVAC Unit 11', type: 'COOLING UNIT', sector: 'SECTOR GAMMA', status: 'MAINTENANCE' },
    { id: 'EQ-112', name: 'Steam Boiler 12', type: 'BOILER', sector: 'SECTOR DELTA', status: 'IDLE' },
    { id: 'EQ-113', name: 'Air Compressor 13', type: 'COMPRESSOR', sector: 'SECTOR ALPHA', status: 'ACTIVE' },
    { id: 'EQ-114', name: 'Chill Water Pump 14', type: 'COOLING UNIT', sector: 'SECTOR BETA', status: 'MAINTENANCE' },
    { id: 'EQ-115', name: 'Turbine Generator 15', type: 'MACHINE', sector: 'SECTOR GAMMA', status: 'IDLE' },
    { id: 'EQ-116', name: 'HVAC Unit 16', type: 'COOLING UNIT', sector: 'SECTOR DELTA', status: 'ACTIVE' }
  ]);

  // --- 5. SAFETY POLICIES MODULE STATE ---
  const [safetyRules, setSafetyRules] = useState([
    { id: 1, name: 'Thermal Overheat Evacuation Limit', threshold: '85°C', sector: 'Sector Alpha', defcon: 'DEFCON 2', status: 'ACTIVE' },
    { id: 2, name: 'Toxic Gas Containment Venting', threshold: '50 ppm', sector: 'Sector Beta', defcon: 'DEFCON 1', status: 'ACTIVE' },
    { id: 3, name: 'High Pressure Relief Valve Trigger', threshold: '120 PSI', sector: 'Sector Gamma', defcon: 'DEFCON 3', status: 'ACTIVE' },
    { id: 4, name: 'Vibration Resonance Interlock', threshold: '15 mm/s', sector: 'Sector Delta', defcon: 'DEFCON 4', status: 'ACTIVE' }
  ]);

  // --- 6. AI SETTINGS MODULE STATE ---
  const [aiForm, setAiForm] = useState({
    enabled: true,
    confidenceThreshold: 90,
    riskSensitivity: 'High',
    recommendationMode: 'Auto-Execute',
    systemDirectives: 'You are FactoryOS Safety AI. Analyze temperature and gas sensors to preempt reactor thermal incidents. Prioritize personnel evacuation if DEFCON drops below 3.'
  });

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Overview Cards List
  const overviewCards = [
    {
      id: 'factory',
      title: 'Factory Information',
      icon: FiInfo,
      description: 'Configure name, geolocations, industry class, sectors, working hours, and primary emergency lines.',
      getStats: () => `${factoryForm.location} | ${factoryForm.workingHours}`
    },
    {
      id: 'sensors',
      title: 'Sensor Registry',
      icon: FiRadio,
      description: 'Register sensors, assign sector telemetry mapping, adjust alarm thresholds, and monitor calibration logs.',
      getStats: () => `${sensors.length || 24} Registered`
    },
    {
      id: 'workers',
      title: 'Workforce Registry',
      icon: FiUsers,
      description: 'Manage active on-shift workers, assign zone certifications, update departments, and emergency profiles.',
      getStats: () => `${workforce.length || 148} Active`
    },
    {
      id: 'equipment',
      title: 'Equipment Registry',
      icon: FiCpu,
      description: 'Track heavy boilers, air compressors, chillers, and turbines. Schedule and monitor maintenance intervals.',
      getStats: () => `${equipmentList.length} Devices`
    },
    {
      id: 'safety',
      title: 'Safety Policies',
      icon: FiShield,
      description: 'Define limits for gas release, temperature thresholds, pressure relief triggers, and DEFCON priorities.',
      getStats: () => `${safetyRules.length} Active Policies`
    },
    {
      id: 'ai',
      title: 'AI Configuration',
      icon: FiSliders,
      description: 'Calibrate Gemini API status, prediction sensitivities, risk mitigation suggestions, and auto-incident logs.',
      getStats: () => `Gemini: ${aiForm.enabled ? 'ACTIVE' : 'OFF'}`
    }
  ];

  // Sidebar Modules List for Studio View
  const sidebarModules = [
    { id: 'factory', name: 'Factory', icon: FiInfo, count: sectorList.length },
    { id: 'sensors', name: 'Sensors', icon: FiRadio, count: sensors.length || 24 },
    { id: 'workers', name: 'Workers', icon: FiUsers, count: workforce.length || 148 },
    { id: 'equipment', name: 'Equipment', icon: FiCpu, count: equipmentList.length },
    { id: 'safety', name: 'Safety', icon: FiShield, count: safetyRules.length },
    { id: 'ai', name: 'AI Settings', icon: FiSliders, count: aiForm.enabled ? 'ON' : 'OFF' },
  ];

  // Handlers
  const handleSaveFactory = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...factoryForm });
    triggerToast('Factory Profile Configuration Saved!');
  };

  const handleRegisterWorker = (e) => {
    e.preventDefault();
    if (!workerForm.fullName || !workerForm.emergencyContact) {
      triggerToast('Full Name and Emergency Contact are required');
      return;
    }
    const newId = workforce.length ? Math.max(...workforce.map(w => w.id)) + 1 : 1;
    setWorkforce([
      ...workforce, 
      { id: newId, name: workerForm.fullName, department: workerForm.department, sector: workerForm.sector, shift: workerForm.shift, emergencyContact: workerForm.emergencyContact, certifications: workerForm.certification }
    ]);
    triggerToast(`Worker '${workerForm.fullName}' registered to ${workerForm.sector}`);
  };

  const handleSaveAiSettings = (e) => {
    e.preventDefault();
    setAiConfig({ ...aiConfig, geminiEnabled: aiForm.enabled });
    triggerToast('AI Model Parameters Updated Successfully!');
  };

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative text-slate-200 bg-[#050B14] flex flex-col select-none">
      {/* SCADA Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05),transparent_75%)] pointer-events-none" />

      {/* Screen-Fixed Floating Back to Overview Button (Guaranteed 100% Clickable in Studio View) */}
      {activeModuleId !== null && (
        <button
          type="button"
          onClick={() => setActiveModuleId(null)}
          className="fixed top-4 left-6 z-[100] cursor-pointer pointer-events-auto px-4 py-2 rounded-xl bg-[#00E5FF] text-slate-950 font-orbitron font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,229,255,0.6)] hover:bg-cyan-300 transition-all flex items-center gap-2"
        >
          <FiArrowLeft size={16} /> Back to Overview
        </button>
      )}

      {/* Top Header Navigation */}
      <div className="absolute top-0 left-0 w-full z-40 p-4">
        <SystemStatusBar 
          extraRight={
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-white/10 backdrop-blur-md">
                SECTORS: <span className="text-[#00E5FF] font-bold">{sectorList.length}</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-white/10 backdrop-blur-md">
                HEALTH: <span className="text-amber-400 font-bold">WARNING</span>
              </div>
            </div>
          }
        />
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: OVERVIEW CARD GRID (When activeModuleId === null)                 */}
      {/* ========================================================================= */}
      {activeModuleId === null && (
        <div className="pt-20 px-6 pb-4 flex-1 flex flex-col z-10 relative max-w-[1920px] mx-auto w-full min-h-0 justify-between">
          <div className="mb-3 flex justify-between items-center shrink-0">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]" />
                <h1 className="text-base font-bold tracking-wider text-white uppercase font-orbitron">
                  FACTORY CONFIGURATION
                </h1>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                Manage Digital Twin Parameters & Infrastructure Modules
              </p>
            </div>
          </div>

          {/* 70% Left / 30% Right Overview Grid */}
          <div className="flex-1 min-h-0 flex gap-5">
            {/* LEFT 68%: 6 Module Configuration Cards */}
            <div className="w-[68%] h-full overflow-y-auto pr-2 grid grid-cols-2 gap-4 content-start scrollbar-thin">
              {overviewCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.015 }}
                    onClick={() => setActiveModuleId(card.id)}
                    className="group relative cursor-pointer p-5 rounded-xl bg-[#050B14]/80 border border-[#00E5FF]/20 hover:border-[#00E5FF] hover:shadow-[0_0_25px_rgba(0,229,255,0.25)] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between h-[195px]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-slate-950 transition-all duration-300 shadow-md">
                          <Icon size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest group-hover:text-[#00E5FF] transition-colors bg-white/5 px-2.5 py-0.5 rounded border border-white/5 flex items-center gap-1">
                          CONFIGURE <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-[#00E5FF] transition-colors font-orbitron">
                          {card.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400 leading-relaxed mt-1 line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between font-mono">
                      <span className="text-[8px] text-slate-500 uppercase tracking-wider">Baseline</span>
                      <span className="text-[11px] font-bold text-[#00E5FF] tracking-wider">
                        {card.getStats()}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT 32%: Live Blueprint & System Profile */}
            <div className="w-[32%] h-full flex flex-col gap-4 min-h-0">
              <div className="flex-1 min-h-0">
                <FactoryBlueprint
                  sensors={sensors}
                  workforce={workforce}
                  equipment={equipment}
                />
              </div>

              <div className="p-5 rounded-xl bg-[#050B14]/80 border border-[#00E5FF]/20 backdrop-blur-xl flex flex-col gap-3">
                <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest border-b border-[#00E5FF]/20 pb-2">
                  // SYSTEM PROFILE
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">TWIN CORE</div>
                    <div className="text-white font-bold truncate">{profile.name || 'FactoryOS Alpha'}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">INDUSTRY</div>
                    <div className="text-white font-bold truncate">{profile.industryType || 'Chemical & Power Gen'}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">REGISTERED SENSORS</div>
                    <div className="text-[#00E5FF] font-bold">{sensors.length || 24} Nodes</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">WORKFORCE UNIT</div>
                    <div className="text-sky-400 font-bold">{workforce.length || 148} Active</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">EQUIPMENT ASSETS</div>
                    <div className="text-slate-200 font-bold">{equipmentList.length} Active</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] uppercase">SAFETY LIMITS</div>
                    <div className="text-yellow-400 font-bold">{safetyRules.length} Rules</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FULL 3-COLUMN CONFIGURATION STUDIO (When activeModuleId !== null) */}
      {/* ========================================================================= */}
      {activeModuleId !== null && (
        <div className="pt-20 px-6 pb-4 flex-1 flex flex-col z-30 relative max-w-[1920px] mx-auto w-full min-h-0 justify-between">
          
          {/* Header Bar matching reference image */}
          <div className="mb-3 flex justify-between items-end shrink-0 pt-1">
            <div className="pl-44">
              <h1 className="text-xl font-bold tracking-wider text-white uppercase font-orbitron flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]" />
                DIGITAL TWIN CONFIGURATION STUDIO
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1 tracking-wide">
                Real-time management system for smart manufacturing processes & safety infrastructure
              </p>
            </div>

            {/* Action Header Buttons matching reference image */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => triggerToast('Resource added to layout')}
                className="cursor-pointer pointer-events-auto px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#00E5FF]/20 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
              >
                <FiPlus size={14} /> Add Resource
              </button>
              <button 
                type="button"
                onClick={() => triggerToast('CSV File Imported')}
                className="cursor-pointer pointer-events-auto px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono tracking-wider hover:border-slate-500 transition-all flex items-center gap-1.5"
              >
                <FiUpload size={14} /> Import CSV
              </button>
              <button 
                type="button"
                onClick={() => triggerToast('Configuration Exported')}
                className="cursor-pointer pointer-events-auto px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono tracking-wider hover:border-slate-500 transition-all flex items-center gap-1.5"
              >
                <FiDownload size={14} /> Export Config
              </button>
              <button 
                type="button"
                onClick={() => triggerToast('Changes Saved Successfully')}
                className="cursor-pointer pointer-events-auto px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                <FiCheck size={14} /> Save Changes
              </button>
            </div>
          </div>

          {/* 3-Column Main Studio Workspace Grid */}
          <div className="flex-1 min-h-0 flex gap-5">
            
            {/* COLUMN 1 (Left Sidebar): CONFIGURATION MODULES */}
            <div className="w-[240px] shrink-0 glass-panel bg-[#050B14]/90 border border-[#00E5FF]/20 rounded-xl p-4 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400">
                    CONFIGURATION MODULES
                  </span>
                  <button 
                    type="button"
                    onClick={() => setActiveModuleId(null)}
                    title="Return to Cards Overview"
                    className="text-[#00E5FF] hover:bg-[#00E5FF]/20 p-1.5 rounded-lg border border-[#00E5FF]/40 transition-colors cursor-pointer pointer-events-auto flex items-center gap-1 text-[10px] font-mono"
                  >
                    <FiGrid size={13} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {sidebarModules.map((mod) => {
                    const Icon = mod.icon;
                    const isActive = activeModuleId === mod.id;

                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => setActiveModuleId(mod.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition-all relative cursor-pointer pointer-events-auto ${
                          isActive
                            ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[inset_0_0_15px_rgba(0,229,255,0.15)] font-bold'
                            : 'bg-white/5 border-transparent text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#00E5FF] rounded-l-lg shadow-[0_0_8px_#00E5FF]" />
                        )}

                        <div className="flex items-center gap-3 pl-1">
                          <Icon className={isActive ? 'text-[#00E5FF]' : 'text-slate-400'} size={16} />
                          <span>{mod.name}</span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          isActive ? 'bg-[#00E5FF]/20 text-[#00E5FF] font-bold' : 'bg-white/5 text-slate-500'
                        }`}>
                          {mod.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Footer Back Button Option */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => setActiveModuleId(null)}
                  className="w-full py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                >
                  <FiArrowLeft size={14} /> Back to Overview
                </button>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>SYSTEM STATUS</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> NOMINAL
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (Center Panel): DYNAMIC MODULE VIEWS */}
            <div className="flex-1 flex flex-col glass-panel bg-[#050B14]/90 border border-[#00E5FF]/30 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.7)] justify-between overflow-y-auto">
              
              {/* MODULE 1: FACTORY CONFIGURATION */}
              {activeModuleId === 'factory' && (
                <div className="flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#00E5FF]/20 pb-3 mb-6">
                      <h2 className="text-sm font-mono font-bold tracking-[0.2em] text-[#00E5FF] uppercase">
                        GENERAL INFORMATION
                      </h2>
                      <span className="text-[10px] font-mono font-bold text-[#00E5FF]">SYS_CORE_V1.0</span>
                    </div>

                    <form onSubmit={handleSaveFactory} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">FACTORY NAME</label>
                          <input type="text" value={factoryForm.name} onChange={(e) => setFactoryForm({ ...factoryForm, name: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">GEOLOCATION</label>
                          <input type="text" value={factoryForm.location} onChange={(e) => setFactoryForm({ ...factoryForm, location: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">INDUSTRY CLASSIFICATION</label>
                          <input type="text" value={factoryForm.industryType} onChange={(e) => setFactoryForm({ ...factoryForm, industryType: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">WORKING HOURS</label>
                          <input type="text" value={factoryForm.workingHours} onChange={(e) => setFactoryForm({ ...factoryForm, workingHours: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">EMERGENCY HOTLINE OVERRIDE</label>
                        <input type="text" value={factoryForm.emergencyHotline} onChange={(e) => setFactoryForm({ ...factoryForm, emergencyHotline: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none" />
                      </div>

                      <button type="submit" className="py-2.5 px-6 rounded-full bg-[#00E5FF] text-slate-950 font-orbitron font-bold text-xs uppercase hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        Save Profile Configuration
                      </button>
                    </form>

                    <div className="mt-8 border-t border-[#00E5FF]/20 pt-6">
                      <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase mb-1">SECTORS CONFIGURATION</h3>
                      <p className="text-[10px] font-mono text-slate-400 mb-4">Sectors divide the factory floor into containment areas for telemetry tracking.</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {sectorList.map((sec, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs font-mono">
                            <span className="text-white font-bold">{sec}</span>
                            <button onClick={() => setSectorList(sectorList.filter((_, idx) => idx !== i))} className="text-slate-500 hover:text-red-400"><FiTrash2 size={14} /></button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <input type="text" placeholder="New sector name (e.g. Sector Epsilon)" value={newSectorName} onChange={(e) => setNewSectorName(e.target.value)} className="flex-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2 text-xs font-mono text-white outline-none" />
                        <button onClick={() => { if (newSectorName) { setSectorList([...sectorList, newSectorName]); setNewSectorName(''); triggerToast(`Added ${newSectorName}`); } }} className="px-4 py-2 rounded-lg bg-slate-800 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs hover:bg-[#00E5FF]/20 transition-all">
                          + Add Sector
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 2: SENSORS REGISTRY */}
              {activeModuleId === 'sensors' && (
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-[#00E5FF]/30">
                        <div className="text-[9px] text-slate-400">NOMINAL NODES</div>
                        <div className="text-base font-bold text-[#00E5FF]">16 / 24</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-amber-500/30">
                        <div className="text-[9px] text-slate-400">WARNING LEVELS</div>
                        <div className="text-base font-bold text-amber-400">8</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-red-500/30">
                        <div className="text-[9px] text-slate-400">CRITICAL ALERTS</div>
                        <div className="text-base font-bold text-red-400">0</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="relative flex-1">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="text" placeholder="Search sensors..." value={sensorSearch} onChange={(e) => setSensorSearch(e.target.value)} className="w-full bg-[#050B14] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white outline-none" />
                      </div>
                      <select value={sensorTypeFilter} onChange={(e) => setSensorTypeFilter(e.target.value)} className="bg-[#050B14] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white">
                        <option>All Types</option>
                        <option>Temperature</option>
                        <option>Pressure</option>
                        <option>Gas Sniffer</option>
                      </select>
                      <button onClick={() => setRegisteringSensor(!registeringSensor)} className="px-3.5 py-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs hover:bg-[#00E5FF]/20 transition-all flex items-center gap-1">
                        <FiPlus size={14} /> Register
                      </button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto border border-white/10 rounded-lg bg-[#050B14]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-900/90 border-b border-white/10 text-[9px] text-slate-400 uppercase sticky top-0">
                          <tr>
                            <th className="p-2.5">ID</th>
                            <th className="p-2.5">SENSOR NAME</th>
                            <th className="p-2.5">SECTOR</th>
                            <th className="p-2.5">THRESHOLD</th>
                            <th className="p-2.5 text-right">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          {[
                            { id: 'S-1', name: 'Temp Sensor 1', sector: 'Sector Alpha', threshold: '80 (°C)' },
                            { id: 'S-2', name: 'Pressure Gauge 2', sector: 'Sector Beta', threshold: '120 (PSI)' },
                            { id: 'S-3', name: 'Gas Sniffer 3', sector: 'Sector Gamma', threshold: '50 (ppm)' },
                            { id: 'S-4', name: 'Humidity Probe 4', sector: 'Sector Delta', threshold: '60 (%)' },
                            { id: 'S-5', name: 'Temp Sensor 5', sector: 'Sector Alpha', threshold: '80 (°C)' },
                            { id: 'S-6', name: 'Pressure Gauge 6', sector: 'Sector Beta', threshold: '120 (PSI)' },
                            { id: 'S-7', name: 'Gas Sniffer 7', sector: 'Sector Gamma', threshold: '50 (ppm)' },
                            { id: 'S-8', name: 'Humidity Probe 8', sector: 'Sector Delta', threshold: '60 (%)' },
                            { id: 'S-9', name: 'Temp Sensor 9', sector: 'Sector Alpha', threshold: '80 (°C)' },
                            { id: 'S-10', name: 'Pressure Gauge 10', sector: 'Sector Beta', threshold: '120 (PSI)' },
                            { id: 'S-11', name: 'Gas Sniffer 11', sector: 'Sector Gamma', threshold: '50 (ppm)' },
                            { id: 'S-12', name: 'Humidity Probe 12', sector: 'Sector Delta', threshold: '60 (%)' }
                          ].filter(s => s.name.toLowerCase().includes(sensorSearch.toLowerCase())).map((s) => (
                            <tr key={s.id} className="hover:bg-white/5">
                              <td className="p-2.5 text-slate-500 font-bold">{s.id}</td>
                              <td className="p-2.5 font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" /> {s.name}
                              </td>
                              <td className="p-2.5 text-slate-400">{s.sector}</td>
                              <td className="p-2.5 text-[#00E5FF]">{s.threshold}</td>
                              <td className="p-2.5 text-right space-x-2">
                                <button onClick={() => triggerToast(`Calibrating ${s.name}`)} className="text-slate-400 hover:text-[#00E5FF]"><FiEdit2 size={13} /></button>
                                <button onClick={() => triggerToast(`Deleted ${s.name}`)} className="text-slate-400 hover:text-red-400"><FiTrash2 size={13} /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 3: WORKERS REGISTRY */}
              {activeModuleId === 'workers' && (
                <form onSubmit={handleRegisterWorker} className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-sm font-mono font-bold tracking-[0.2em] text-[#00E5FF] uppercase mb-6 flex items-center gap-2 border-b border-[#00E5FF]/20 pb-3">
                      <span className="text-[#00E5FF]">//</span> REGISTER / MODIFY WORKER FILE
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">FULL NAME</label>
                        <input type="text" value={workerForm.fullName} onChange={(e) => setWorkerForm({ ...workerForm, fullName: e.target.value })} placeholder="Alex Morgan" className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">DEPARTMENT</label>
                          <select value={workerForm.department} onChange={(e) => setWorkerForm({ ...workerForm, department: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none cursor-pointer">
                            <option value="Operations">Operations</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Safety & Compliance">Safety & Compliance</option>
                            <option value="Engineering">Engineering</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">CONTAINMENT SECTOR</label>
                          <select value={workerForm.sector} onChange={(e) => setWorkerForm({ ...workerForm, sector: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none cursor-pointer">
                            <option value="Sector Alpha">Sector Alpha</option>
                            <option value="Sector Beta">Sector Beta</option>
                            <option value="Sector Gamma">Sector Gamma</option>
                            <option value="Sector Delta">Sector Delta</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">SHIFT SCHEDULE</label>
                          <select value={workerForm.shift} onChange={(e) => setWorkerForm({ ...workerForm, shift: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none cursor-pointer">
                            <option value="Day">Day</option>
                            <option value="Swing">Swing</option>
                            <option value="Night">Night</option>
                            <option value="Rotational">Rotational</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">PRIMARY CERTIFICATION</label>
                          <select value={workerForm.certification} onChange={(e) => setWorkerForm({ ...workerForm, certification: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none cursor-pointer">
                            <option value="OSHA 30">OSHA 30</option>
                            <option value="HazMat Level 3">HazMat Level 3</option>
                            <option value="High Voltage ISO">High Voltage ISO</option>
                            <option value="Pressure Control">Pressure Control</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">EMERGENCY CONTACT LINE</label>
                        <input type="text" value={workerForm.emergencyContact} onChange={(e) => setWorkerForm({ ...workerForm, emergencyContact: e.target.value })} placeholder="+1 (555) 012-3456" className="w-full bg-[#050B14] border border-slate-700 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm font-mono text-white outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 mt-6 border-t border-white/10">
                    <button type="submit" className="w-full py-3 rounded-full bg-[#00E5FF] text-slate-950 font-orbitron font-bold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2">
                      <FiUserCheck size={16} /> Register Worker
                    </button>
                    <button type="button" onClick={() => setWorkerForm({ fullName: '', department: 'Operations', sector: 'Sector Alpha', shift: 'Day', certification: 'OSHA 30', emergencyContact: '' })} className="w-full py-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 font-orbitron font-bold text-xs tracking-wider uppercase hover:border-slate-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <FiX size={16} /> Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* MODULE 4: EQUIPMENT ASSETS & DIAGNOSTICS */}
              {activeModuleId === 'equipment' && (
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#00E5FF]/20 pb-3 mb-4">
                      <h2 className="text-xs font-mono font-bold text-[#00E5FF] uppercase">REGISTERED ASSETS & DIAGNOSTICS</h2>
                      <button onClick={() => triggerToast('Asset Registration Modal Opened')} className="px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono flex items-center gap-1.5">
                        <FiPlus size={14} /> Register Machine
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                      {equipmentList.map((eq) => (
                        <div key={eq.id} className="p-3 rounded-lg bg-[#050B14] border border-slate-700 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-mono font-bold text-white">{eq.name}</div>
                            <div className="text-[9px] font-mono text-slate-400 mt-0.5">{eq.type} | {eq.sector}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                            eq.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                            eq.status === 'MAINTENANCE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {eq.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#00E5FF]/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase">// SERVICE HISTORY LOGS</span>
                        <span className="text-[9px] font-mono text-slate-500">ID: EQ-104</span>
                      </div>
                      <div className="space-y-1.5 text-[9.5px] font-mono text-slate-300">
                        <div className="flex gap-2"><span className="text-[#00E5FF]">2026-07-15</span><span>System maintenance completed: Calibrated telemetry modules and inspected thermal seals.</span></div>
                        <div className="flex gap-2"><span className="text-[#00E5FF]">2026-05-10</span><span>Gaskets and oil replacement check by Engineer T-400. Status optimal.</span></div>
                        <div className="flex gap-2"><span className="text-[#00E5FF]">2026-02-14</span><span>Commissioned and deployed to Sector Blueprint grid. Initial calibration secure.</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 5: SAFETY POLICIES */}
              {activeModuleId === 'safety' && (
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div>
                    <h2 className="text-sm font-mono font-bold text-[#00E5FF] uppercase mb-4 border-b border-[#00E5FF]/20 pb-3">// SAFETY POLICIES & INTERLOCK DIRECTIVES</h2>
                    <div className="space-y-3">
                      {safetyRules.map((rule) => (
                        <div key={rule.id} className="p-3.5 rounded-lg bg-[#050B14] border border-slate-700 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-mono font-bold text-white">{rule.name}</div>
                            <div className="text-[10px] font-mono text-slate-400 mt-1">Target: {rule.sector} | Limit: <span className="text-[#00E5FF]">{rule.threshold}</span></div>
                          </div>
                          <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40">{rule.defcon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => triggerToast('Safety policies saved')} className="w-full py-3 rounded-full bg-[#00E5FF] text-slate-950 font-orbitron font-bold text-xs uppercase shadow-[0_0_20px_rgba(0,229,255,0.4)]">Save Safety Directives</button>
                </div>
              )}

              {/* MODULE 6: AI SETTINGS */}
              {activeModuleId === 'ai' && (
                <form onSubmit={handleSaveAiSettings} className="flex flex-col h-full justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#00E5FF]/20 pb-3 mb-6">
                      <h2 className="text-sm font-mono font-bold tracking-[0.2em] text-[#00E5FF] uppercase">
                        GEMINI API COPILOT SETTINGS
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">API ONLINE</span>
                        <button 
                          type="button" 
                          onClick={() => setAiForm({ ...aiForm, enabled: !aiForm.enabled })}
                          className={`w-11 h-6 rounded-full p-1 transition-colors ${aiForm.enabled ? 'bg-[#00E5FF]' : 'bg-slate-700'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${aiForm.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-mono font-bold text-white mb-1">Enable Real-Time Safety Analysis</div>
                        <div className="text-[10px] font-mono text-slate-400">Let Gemini analyze telemetry patterns to predict potential incidents.</div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 mb-2">
                          <span>Prediction Confidence Threshold</span>
                          <span className="text-[#00E5FF]">{aiForm.confidenceThreshold}%</span>
                        </div>
                        <input type="range" min="50" max="95" value={aiForm.confidenceThreshold} onChange={(e) => setAiForm({ ...aiForm, confidenceThreshold: e.target.value })} className="w-full accent-[#00E5FF] cursor-pointer" />
                        <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1">
                          <span>FAST RESPONSE (50%)</span>
                          <span>HIGH ACCURACY (95%)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">RISK SENSITIVITY</label>
                          <select value={aiForm.riskSensitivity} onChange={(e) => setAiForm({ ...aiForm, riskSensitivity: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2.5 text-xs font-mono text-white outline-none">
                            <option>High</option>
                            <option>Moderate</option>
                            <option>Low</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">RECOMMENDATION MODE</label>
                          <select value={aiForm.recommendationMode} onChange={(e) => setAiForm({ ...aiForm, recommendationMode: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2.5 text-xs font-mono text-white outline-none">
                            <option>Auto-Execute</option>
                            <option>Manual Review</option>
                            <option>Log Only</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">GEMINI COPILOT SYSTEM DIRECTIVES</label>
                        <textarea rows="3" value={aiForm.systemDirectives} onChange={(e) => setAiForm({ ...aiForm, systemDirectives: e.target.value })} className="w-full bg-[#050B14] border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-200 outline-none" />
                        <div className="text-[9px] font-mono text-slate-500 mt-1">Directive overrides locked under admin credentials.</div>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="py-3 px-6 rounded-full bg-[#00E5FF] text-slate-950 font-orbitron font-bold text-xs uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                    Update AI Model Parameters
                  </button>
                </form>
              )}

            </div>

            {/* COLUMN 3 (Right Column): HOLOGRAPHIC BLUEPRINT & TELEMETRY SUMMARY */}
            <div className="w-[420px] shrink-0 flex flex-col gap-5 min-h-0">
              
              <div className="h-[55%] min-h-0">
                <FactoryBlueprint
                  sensors={sensors}
                  workforce={workforce}
                  equipment={equipment}
                />
              </div>

              <div className="h-[45%] glass-panel bg-[#050B14]/90 border border-[#00E5FF]/20 rounded-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-y-auto">
                <div>
                  <h3 className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest mb-3 border-b border-[#00E5FF]/20 pb-2">
                    // TELEMETRY SUMMARY
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">CORE NAME:</span>
                      <span className="text-white font-bold">{profile.name || 'FactoryOS Alpha'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">INDUSTRY:</span>
                      <span className="text-white font-bold">{profile.industryType || 'Chemical & Power Gen'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">TWIN HEALTH:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 border border-amber-400/40 text-amber-400 inline-block">
                        WARNING
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase block">AI COPILOT:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] inline-block">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                    REAL-TIME AUDIT TRAIL
                  </h4>
                  
                  <div className="space-y-1.5 text-[10px] font-mono text-slate-300">
                    <div className="flex items-center gap-2"><span className="text-[#00E5FF] font-bold">[20:32]</span><span>Sensor Temp SN-12 Threshold adjusted</span></div>
                    <div className="flex items-center gap-2"><span className="text-[#00E5FF] font-bold">[20:28]</span><span>Worker Shift profile updated for Shift A</span></div>
                    <div className="flex items-center gap-2"><span className="text-[#00E5FF] font-bold">[20:12]</span><span>Safety Limit High Temp Vent set to 85°C</span></div>
                    <div className="flex items-center gap-2"><span className="text-[#00E5FF] font-bold">[19:45]</span><span>AI Prediction sensitivity set to High</span></div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Global Success Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 border border-[#00E5FF]/40 shadow-[0_4px_20px_rgba(0,229,255,0.25)] text-white font-mono text-xs"
          >
            <span className="p-1 rounded bg-[#00E5FF]/20 text-[#00E5FF]"><FiUserCheck /></span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </CinematicTransition>
  );
}
