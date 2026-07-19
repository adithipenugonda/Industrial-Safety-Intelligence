import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiEdit2, FiSearch, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function ModuleDrawer({ activeModule, isOpen, onClose, contextData, showToast }) {
  if (!isOpen || !activeModule) return null;

  const {
    profile, setProfile,
    sectors, setSectors,
    sensors, setSensors,
    workforce, setWorkforce,
    equipment, setEquipment,
    safetyPolicies, setSafetyPolicies,
    safetyConfig, setSafetyConfig,
    aiConfig, setAiConfig
  } = contextData;

  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  // --- 1. FACTORY INFO CONFIG ---
  const [factoryForm, setFactoryForm] = useState({ ...profile });
  const handleFactorySave = (e) => {
    e.preventDefault();
    if (!factoryForm.name || !factoryForm.location) {
      setError('Name and Location are required');
      return;
    }
    setProfile(factoryForm);
    showToast('Factory profile updated successfully!');
    onClose();
  };

  // --- 2. SENSOR CRUD ---
  const [sensorForm, setSensorForm] = useState({ name: '', type: 'Temperature', sector: 'Sector Alpha', threshold: 80, calibrationStatus: 'Calibrated', status: 'Nominal' });
  const handleSensorSave = (e) => {
    e.preventDefault();
    if (!sensorForm.name || !sensorForm.threshold) {
      setError('Sensor name and threshold values are required');
      return;
    }
    if (editingItem) {
      setSensors(sensors.map(s => s.id === editingItem.id ? { ...sensorForm, id: s.id } : s));
      showToast('Sensor updated successfully!');
    } else {
      const newId = sensors.length ? Math.max(...sensors.map(s => s.id)) + 1 : 1;
      setSensors([...sensors, { ...sensorForm, id: newId }]);
      showToast('Sensor registered successfully!');
    }
    resetSensorState();
  };
  const resetSensorState = () => {
    setSensorForm({ name: '', type: 'Temperature', sector: 'Sector Alpha', threshold: 80, calibrationStatus: 'Calibrated', status: 'Nominal' });
    setEditingItem(null);
    setIsAdding(false);
    setError('');
  };
  const startEditSensor = (sensor) => {
    setEditingItem(sensor);
    setSensorForm({ ...sensor });
    setIsAdding(true);
  };
  const deleteSensor = (id) => {
    setSensors(sensors.filter(s => s.id !== id));
    showToast('Sensor deleted successfully!');
  };

  // --- 3. WORKFORCE CRUD ---
  const [workerForm, setWorkerForm] = useState({ name: '', department: 'Operations', sector: 'Sector Alpha', shift: 'Day', emergencyContact: '', certifications: 'OSHA 30' });
  const handleWorkerSave = (e) => {
    e.preventDefault();
    if (!workerForm.name || !workerForm.emergencyContact) {
      setError('Worker name and emergency contact are required');
      return;
    }
    if (editingItem) {
      setWorkforce(workforce.map(w => w.id === editingItem.id ? { ...workerForm, id: w.id } : w));
      showToast('Workforce file updated!');
    } else {
      const newId = workforce.length ? Math.max(...workforce.map(w => w.id)) + 1 : 1;
      setWorkforce([...workforce, { ...workerForm, id: newId }]);
      showToast('Worker registered successfully!');
    }
    resetWorkerState();
  };
  const resetWorkerState = () => {
    setWorkerForm({ name: '', department: 'Operations', sector: 'Sector Alpha', shift: 'Day', emergencyContact: '', certifications: 'OSHA 30' });
    setEditingItem(null);
    setIsAdding(false);
    setError('');
  };
  const startEditWorker = (worker) => {
    setEditingItem(worker);
    setWorkerForm({ ...worker });
    setIsAdding(true);
  };
  const deleteWorker = (id) => {
    setWorkforce(workforce.filter(w => w.id !== id));
    showToast('Worker file removed!');
  };

  // --- 4. EQUIPMENT CRUD ---
  const [equipmentForm, setEquipmentForm] = useState({ name: '', type: 'Machine', sector: 'Sector Alpha', maintenanceSchedule: '', status: 'Active' });
  const handleEquipmentSave = (e) => {
    e.preventDefault();
    if (!equipmentForm.name || !equipmentForm.maintenanceSchedule) {
      setError('Equipment name and maintenance date are required');
      return;
    }
    if (editingItem) {
      setEquipment(equipment.map(eq => eq.id === editingItem.id ? { ...equipmentForm, id: eq.id } : eq));
      showToast('Equipment file updated!');
    } else {
      const newId = equipment.length ? Math.max(...equipment.map(e => e.id)) + 1 : 1;
      setEquipment([...equipment, { ...equipmentForm, id: newId }]);
      showToast('Equipment device registered!');
    }
    resetEquipmentState();
  };
  const resetEquipmentState = () => {
    setEquipmentForm({ name: '', type: 'Machine', sector: 'Sector Alpha', maintenanceSchedule: '', status: 'Active' });
    setEditingItem(null);
    setIsAdding(false);
    setError('');
  };
  const startEditEquipment = (eq) => {
    setEditingItem(eq);
    setEquipmentForm({ ...eq });
    setIsAdding(true);
  };
  const deleteEquipment = (id) => {
    setEquipment(equipment.filter(eq => eq.id !== id));
    showToast('Equipment device deleted!');
  };

  // --- 5. SAFETY POLICIES CRUD ---
  const [policyForm, setPolicyForm] = useState({ name: '', limitType: 'Temperature', value: 80, priority: 'Critical', notificationRule: 'Control Room Alarm', status: 'Active' });
  const handlePolicySave = (e) => {
    e.preventDefault();
    if (!policyForm.name || !policyForm.value) {
      setError('Policy name and threshold limits are required');
      return;
    }
    if (editingItem) {
      setSafetyPolicies(safetyPolicies.map(p => p.id === editingItem.id ? { ...policyForm, id: p.id } : p));
      showToast('Safety policy updated!');
    } else {
      const newId = safetyPolicies.length ? Math.max(...safetyPolicies.map(p => p.id)) + 1 : 1;
      setSafetyPolicies([...safetyPolicies, { ...policyForm, id: newId }]);
      showToast('Safety policy configured!');
    }
    resetPolicyState();
  };
  const resetPolicyState = () => {
    setPolicyForm({ name: '', limitType: 'Temperature', value: 80, priority: 'Critical', notificationRule: 'Control Room Alarm', status: 'Active' });
    setEditingItem(null);
    setIsAdding(false);
    setError('');
  };
  const startEditPolicy = (p) => {
    setEditingItem(p);
    setPolicyForm({ ...p });
    setIsAdding(true);
  };
  const deletePolicy = (id) => {
    setSafetyPolicies(safetyPolicies.filter(p => p.id !== id));
    showToast('Safety policy removed!');
  };

  // --- 6. AI CONFIG ---
  const [aiForm, setAiForm] = useState({ ...aiConfig });
  const handleAiSave = (e) => {
    e.preventDefault();
    setAiConfig(aiForm);
    showToast('Gemini safety copilot settings saved!');
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] h-screen bg-slate-950/95 border-l border-brand-cyan/20 shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col backdrop-blur-md">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-6 border-b border-brand-cyan/20">
        <div>
          <h2 className="text-xl font-bold tracking-wider text-white uppercase font-orbitron">
            {activeModule.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{activeModule.description}</p>
        </div>
        <button 
          onClick={() => {
            resetSensorState();
            resetWorkerState();
            resetEquipmentState();
            resetPolicyState();
            onClose();
          }}
          className="p-1.5 rounded-lg border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/10 text-slate-400 hover:text-brand-cyan transition-all duration-300"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-500/50 rounded-lg text-red-300 text-xs">
            <FiAlertCircle className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. FACTORY PROFILE FORM */}
        {activeModule.id === 'factory-info' && (
          <form onSubmit={handleFactorySave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Factory Name</label>
              <input 
                type="text" 
                value={factoryForm.name} 
                onChange={(e) => setFactoryForm({ ...factoryForm, name: e.target.value })} 
                className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Location</label>
              <input 
                type="text" 
                value={factoryForm.location} 
                onChange={(e) => setFactoryForm({ ...factoryForm, location: e.target.value })} 
                className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Industry</label>
                <input 
                  type="text" 
                  value={factoryForm.industryType} 
                  onChange={(e) => setFactoryForm({ ...factoryForm, industryType: e.target.value })} 
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Working Hours</label>
                <input 
                  type="text" 
                  value={factoryForm.workingHours} 
                  onChange={(e) => setFactoryForm({ ...factoryForm, workingHours: e.target.value })} 
                  className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Emergency Contact</label>
              <input 
                type="text" 
                value={factoryForm.emergencyContact} 
                onChange={(e) => setFactoryForm({ ...factoryForm, emergencyContact: e.target.value })} 
                className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2.5 rounded-lg transition-all duration-300">
                Save Profile
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* 2. SENSOR CRUD */}
        {activeModule.id === 'sensors' && (
          <div className="space-y-6">
            {isAdding ? (
              <form onSubmit={handleSensorSave} className="space-y-4 p-4 border border-white/5 rounded-xl bg-slate-900/30">
                <h3 className="text-xs font-mono font-bold text-brand-cyan">// {editingItem ? 'EDIT' : 'REGISTER NEW'} SENSOR</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Sensor Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Temp Sensor 10"
                    value={sensorForm.name} 
                    onChange={(e) => setSensorForm({ ...sensorForm, name: e.target.value })} 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Sensor Type</label>
                    <select
                      value={sensorForm.type}
                      onChange={(e) => setSensorForm({ ...sensorForm, type: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Temperature</option>
                      <option>Pressure</option>
                      <option>Gas</option>
                      <option>Humidity</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Sector Mapping</label>
                    <select
                      value={sensorForm.sector}
                      onChange={(e) => setSensorForm({ ...sensorForm, sector: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      {sectors.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Threshold Limit Value</label>
                    <input 
                      type="number" 
                      value={sensorForm.threshold} 
                      onChange={(e) => setSensorForm({ ...sensorForm, threshold: parseInt(e.target.value) || 0 })} 
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Calibration Status</label>
                    <select
                      value={sensorForm.calibrationStatus}
                      onChange={(e) => setSensorForm({ ...sensorForm, calibrationStatus: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Calibrated</option>
                      <option>Pending Calibration</option>
                      <option>Calibration Needed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    {editingItem ? 'Update Sensor' : 'Register Sensor'}
                  </button>
                  <button type="button" onClick={resetSensorState} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search sensors..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan/30 text-brand-cyan font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <FiPlus /> Register
                  </button>
                </div>

                <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-900/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-900/50 text-[10px] font-mono text-slate-400 uppercase">
                        <th className="p-3">Sensor</th>
                        <th className="p-3">Sector</th>
                        <th className="p-3">Type</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                      {sensors.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 100).map(s => (
                        <tr key={s.id} className="hover:bg-white/5">
                          <td className="p-3 font-semibold">{s.name}</td>
                          <td className="p-3 text-slate-400">{s.sector}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[9px] bg-slate-800 text-cyan-400 border border-cyan-400/20">{s.type}</span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => startEditSensor(s)} className="text-slate-400 hover:text-brand-cyan transition-colors"><FiEdit2 size={14} /></button>
                            <button onClick={() => deleteSensor(s.id)} className="text-slate-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. WORKFORCE CRUD */}
        {activeModule.id === 'workforce' && (
          <div className="space-y-6">
            {isAdding ? (
              <form onSubmit={handleWorkerSave} className="space-y-4 p-4 border border-white/5 rounded-xl bg-slate-900/30">
                <h3 className="text-xs font-mono font-bold text-brand-cyan">// {editingItem ? 'EDIT' : 'REGISTER'} WORKER</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Worker Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Worker M149"
                    value={workerForm.name} 
                    onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })} 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Department</label>
                    <select
                      value={workerForm.department}
                      onChange={(e) => setWorkerForm({ ...workerForm, department: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Operations</option>
                      <option>Maintenance</option>
                      <option>Safety</option>
                      <option>Engineering</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Sector Assignment</label>
                    <select
                      value={workerForm.sector}
                      onChange={(e) => setWorkerForm({ ...workerForm, sector: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      {sectors.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Shift</label>
                    <select
                      value={workerForm.shift}
                      onChange={(e) => setWorkerForm({ ...workerForm, shift: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Day</option>
                      <option>Night</option>
                      <option>Swing</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Safety Certification</label>
                    <select
                      value={workerForm.certifications}
                      onChange={(e) => setWorkerForm({ ...workerForm, certifications: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>OSHA 30</option>
                      <option>First Aid</option>
                      <option>Hazardous Materials</option>
                      <option>Fire Safety</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Emergency Contact</label>
                  <input 
                    type="text" 
                    placeholder="e.g. +1 (555) 012-3456"
                    value={workerForm.emergencyContact} 
                    onChange={(e) => setWorkerForm({ ...workerForm, emergencyContact: e.target.value })} 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    {editingItem ? 'Update Worker' : 'Register Worker'}
                  </button>
                  <button type="button" onClick={resetWorkerState} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search workers..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan/30 text-brand-cyan font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <FiPlus /> Register
                  </button>
                </div>

                <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-900/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-900/50 text-[10px] font-mono text-slate-400 uppercase">
                        <th className="p-3">Worker</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Sector</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                      {workforce.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 15).map(w => (
                        <tr key={w.id} className="hover:bg-white/5">
                          <td className="p-3 font-semibold">{w.name}</td>
                          <td className="p-3 text-slate-400">{w.department}</td>
                          <td className="p-3 text-slate-400">{w.sector}</td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => startEditWorker(w)} className="text-slate-400 hover:text-brand-cyan transition-colors"><FiEdit2 size={14} /></button>
                            <button onClick={() => deleteWorker(w.id)} className="text-slate-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. EQUIPMENT CRUD */}
        {activeModule.id === 'equipment' && (
          <div className="space-y-6">
            {isAdding ? (
              <form onSubmit={handleEquipmentSave} className="space-y-4 p-4 border border-white/5 rounded-xl bg-slate-900/30">
                <h3 className="text-xs font-mono font-bold text-brand-cyan">// {editingItem ? 'EDIT' : 'REGISTER'} EQUIPMENT</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Equipment Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Boiler unit 4"
                    value={equipmentForm.name} 
                    onChange={(e) => setEquipmentForm({ ...equipmentForm, name: e.target.value })} 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Equipment Type</label>
                    <select
                      value={equipmentForm.type}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, type: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Cooling Unit</option>
                      <option>Boiler</option>
                      <option>Compressor</option>
                      <option>Machine</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Sector Mapping</label>
                    <select
                      value={equipmentForm.sector}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, sector: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      {sectors.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Maintenance Schedule</label>
                    <input 
                      type="date" 
                      value={equipmentForm.maintenanceSchedule} 
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, maintenanceSchedule: e.target.value })} 
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Equipment Status</label>
                    <select
                      value={equipmentForm.status}
                      onChange={(e) => setEquipmentForm({ ...equipmentForm, status: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Maintenance</option>
                      <option>Idle</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    {editingItem ? 'Update Equipment' : 'Register Equipment'}
                  </button>
                  <button type="button" onClick={resetEquipmentState} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search equipment..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan/30 text-brand-cyan font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <FiPlus /> Register
                  </button>
                </div>

                <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-900/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-900/50 text-[10px] font-mono text-slate-400 uppercase">
                        <th className="p-3">Equipment</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Sector</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                      {equipment.filter(eq => eq.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 15).map(eq => (
                        <tr key={eq.id} className="hover:bg-white/5">
                          <td className="p-3 font-semibold">{eq.name}</td>
                          <td className="p-3 text-slate-400">{eq.type}</td>
                          <td className="p-3 text-slate-400">{eq.sector}</td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => startEditEquipment(eq)} className="text-slate-400 hover:text-brand-cyan transition-colors"><FiEdit2 size={14} /></button>
                            <button onClick={() => deleteEquipment(eq.id)} className="text-slate-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. SAFETY POLICIES CRUD */}
        {activeModule.id === 'safety-policies' && (
          <div className="space-y-6">
            {isAdding ? (
              <form onSubmit={handlePolicySave} className="space-y-4 p-4 border border-white/5 rounded-xl bg-slate-900/30">
                <h3 className="text-xs font-mono font-bold text-brand-cyan">// {editingItem ? 'EDIT' : 'CONFIGURE'} SAFETY RULE</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Policy Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Critical Thermal Limit Alert"
                    value={policyForm.name} 
                    onChange={(e) => setPolicyForm({ ...policyForm, name: e.target.value })} 
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Limit Type</label>
                    <select
                      value={policyForm.limitType}
                      onChange={(e) => setPolicyForm({ ...policyForm, limitType: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Temperature</option>
                      <option>Gas</option>
                      <option>Pressure</option>
                      <option>Humidity</option>
                      <option>Personnel</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Threshold Limit Value</label>
                    <input 
                      type="number" 
                      value={policyForm.value} 
                      onChange={(e) => setPolicyForm({ ...policyForm, value: parseInt(e.target.value) || 0 })} 
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Alert Priority</label>
                    <select
                      value={policyForm.priority}
                      onChange={(e) => setPolicyForm({ ...policyForm, priority: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Notification Protocol</label>
                    <select
                      value={policyForm.notificationRule}
                      onChange={(e) => setPolicyForm({ ...policyForm, notificationRule: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option>Control Room Alarm</option>
                      <option>SMS & Email</option>
                      <option>Push Notification</option>
                      <option>Email Alert</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    {editingItem ? 'Update Policy' : 'Configure Policy'}
                  </button>
                  <button type="button" onClick={resetPolicyState} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2 rounded-lg transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search safety rules..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan/30 text-brand-cyan font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <FiPlus /> Configure
                  </button>
                </div>

                <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-900/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-slate-900/50 text-[10px] font-mono text-slate-400 uppercase">
                        <th className="p-3">Policy / Rule</th>
                        <th className="p-3">Limit</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                      {safetyPolicies.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                        <tr key={p.id} className="hover:bg-white/5">
                          <td className="p-3 font-semibold">{p.name}</td>
                          <td className="p-3 text-slate-400">{p.limitType}: {p.value}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] border ${
                              p.priority === 'Critical' ? 'bg-red-950/40 border-red-500/30 text-red-400' :
                              p.priority === 'High' ? 'bg-amber-950/40 border-amber-500/30 text-amber-400' :
                              'bg-slate-800 border-slate-700 text-slate-300'
                            }`}>{p.priority}</span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => startEditPolicy(p)} className="text-slate-400 hover:text-brand-cyan transition-colors"><FiEdit2 size={14} /></button>
                            <button onClick={() => deletePolicy(p.id)} className="text-slate-400 hover:text-red-400 transition-colors"><FiTrash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. AI CONFIGURATION FORM */}
        {activeModule.id === 'ai-config' && (
          <form onSubmit={handleAiSave} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-slate-900/20">
                <div>
                  <h4 className="text-sm font-semibold text-white">Gemini Safety Copilot Agent</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Activate Gemini AI real-time risk predictions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={aiForm.geminiEnabled} 
                    onChange={(e) => setAiForm({ ...aiForm, geminiEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cyan peer-checked:after:bg-slate-950"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex justify-between">
                  <span>Confidence Threshold</span>
                  <span className="text-brand-cyan font-bold">{aiForm.confidenceThreshold}%</span>
                </label>
                <input 
                  type="range" 
                  min="50" 
                  max="99" 
                  value={aiForm.confidenceThreshold} 
                  onChange={(e) => setAiForm({ ...aiForm, confidenceThreshold: parseInt(e.target.value) })}
                  className="w-full accent-brand-cyan h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Recommendation Mode</label>
                  <select
                    value={aiForm.recommendationMode}
                    onChange={(e) => setAiForm({ ...aiForm, recommendationMode: e.target.value })}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="auto">Automatic (Auto-Execute)</option>
                    <option value="manual">Manual (Operator Review)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">AI Alert Sensitivity</label>
                  <select
                    value={aiForm.sensitivity}
                    onChange={(e) => setAiForm({ ...aiForm, sensitivity: e.target.value })}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <h5 className="text-xs font-mono tracking-wider text-slate-400 uppercase">// COGNITIVE SETTINGS</h5>
                <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={aiForm.autoIncidentAnalysis}
                    onChange={(e) => setAiForm({ ...aiForm, autoIncidentAnalysis: e.target.checked })}
                    className="rounded border-white/10 bg-slate-900 text-brand-cyan focus:ring-0" 
                  />
                  <span>Perform Automatic incident analysis & root cause mapping</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={aiForm.autoSnapshotGeneration}
                    onChange={(e) => setAiForm({ ...aiForm, autoSnapshotGeneration: e.target.checked })}
                    className="rounded border-white/10 bg-slate-900 text-brand-cyan focus:ring-0" 
                  />
                  <span>Create System states backup snapshots on DEFCON shift</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={aiForm.riskPrediction}
                    onChange={(e) => setAiForm({ ...aiForm, riskPrediction: e.target.checked })}
                    className="rounded border-white/10 bg-slate-900 text-brand-cyan focus:ring-0" 
                  />
                  <span>Predict safety anomalies using neural network forecast</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <button type="submit" className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-slate-950 font-semibold text-sm py-2.5 rounded-lg transition-all duration-300">
                Save AI Settings
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-all duration-300">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
