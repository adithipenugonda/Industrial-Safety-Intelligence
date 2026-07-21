import { createContext, useState, useEffect, useContext } from 'react';

const DigitalTwinContext = createContext(null);

const initialSectors = ['Sector Alpha', 'Sector Beta', 'Sector Gamma', 'Sector Delta'];

const initialSensors = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `${['Temp Sensor', 'Pressure Gauge', 'Gas Sniffer', 'Humidity Probe'][i % 4]} ${i + 1}`,
  type: ['Temperature', 'Pressure', 'Gas', 'Humidity'][i % 4],
  sector: initialSectors[i % 4],
  threshold: [80, 120, 50, 60][i % 4],
  calibrationStatus: ['Calibrated', 'Pending Calibration', 'Calibration Needed'][i % 3],
  status: ['Nominal', 'Warning', 'Nominal'][i % 3],
}));

const initialWorkforce = Array.from({ length: 148 }, (_, i) => ({
  id: i + 1,
  name: `Worker ${String.fromCharCode(65 + (i % 26))}${100 + i}`,
  department: ['Operations', 'Maintenance', 'Safety', 'Engineering'][i % 4],
  sector: initialSectors[i % 4],
  shift: ['Day', 'Night', 'Swing'][i % 3],
  emergencyContact: `+1 (555) 01${i % 10}-${1000 + i}`,
  certifications: ['OSHA 30', 'First Aid', 'Hazardous Materials', 'Fire Safety'][i % 4],
}));

const initialEquipment = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `${['HVAC Unit', 'Steam Boiler', 'Air Compressor', 'Chill Water Pump', 'Turbine Generator'][i % 5]} ${i + 1}`,
  type: ['Cooling Unit', 'Boiler', 'Compressor', 'Cooling Unit', 'Machine'][i % 5],
  sector: initialSectors[i % 4],
  maintenanceSchedule: `2026-08-${10 + (i % 15)}`,
  status: ['Active', 'Maintenance', 'Idle'][i % 3],
}));

const initialSafetyPolicies = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: [
    'High Temperature Shutoff',
    'Gas Leak Alert Protocol',
    'Steam Boiler Pressure Vent',
    'Low Level Humidity Trigger',
    'Sector Overcrowding Response',
    'Emergency Power Failover',
    'Cooling Vent Automatic Cycle',
    'Intrusion Detection Evac',
    'Chemical Sprinkler System',
    'Facility Wide Defcon Warning',
    'Turbine Thermal Safety Valve',
    'Control Room Emergency Evac'
  ][i % 12],
  limitType: ['Temperature', 'Gas', 'Pressure', 'Humidity', 'Personnel', 'System'][i % 6],
  value: [80, 50, 120, 30, 45, 1][i % 6],
  priority: ['Critical', 'High', 'Medium', 'Low'][i % 4],
  notificationRule: ['Control Room Alarm', 'SMS & Email', 'Push Notification', 'Email Alert'][i % 4],
  status: 'Active',
}));

export const DigitalTwinProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'FactoryOS Alpha',
    location: 'Houston, TX',
    industryType: 'Chemical & Power Gen',
    workingHours: '24/7',
    emergencyContact: '+1 (555) 911-SAFE',
    sectorsCount: 4,
  });

  const [sectors, setSectors] = useState(initialSectors);
  const [sensors, setSensors] = useState(initialSensors);
  const [workforce, setWorkforce] = useState(initialWorkforce);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [safetyPolicies, setSafetyPolicies] = useState(initialSafetyPolicies);

  const [wsConnected, setWsConnected] = useState(false);

  // REAL-TIME SCADA WEBSOCKET AUTO-CONNECT ENGINE WITH FALLBACK
  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket('ws://localhost:8000/ws/telemetry');

      ws.onopen = () => {
        console.log('⚡ Connected to FastAPI SCADA Real-Time WebSocket Server!');
        setWsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data && data.sensors) {
            // Update sensor telemetry state with backend stream
            setSensors(prev => {
              const updated = [...prev];
              data.sensors.forEach((streamed, idx) => {
                if (updated[idx]) {
                  updated[idx] = {
                    ...updated[idx],
                    status: streamed.status === 'CRITICAL' ? 'Warning' : 'Nominal',
                  };
                }
              });
              return updated;
            });
          }
        } catch (err) {
          // ignore parse errors
        }
      };

      ws.onerror = () => {
        setWsConnected(false);
      };

      ws.onclose = () => {
        setWsConnected(false);
      };
    } catch (e) {
      setWsConnected(false);
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const [safetyConfig, setSafetyConfig] = useState({
    gasThreshold: 50,
    tempThreshold: 80,
    pressureThreshold: 120,
    humidityThreshold: 60,
    workerLimits: 100,
    riskRules: 'strict',
    alertPriorities: 'high',
  });

  const [aiConfig, setAiConfig] = useState({
    geminiEnabled: true,
    confidenceThreshold: 90,
    recommendationMode: 'auto',
    autoIncidentAnalysis: true,
    autoSnapshotGeneration: true,
    riskPrediction: true,
    sensitivity: 'High',
  });

  return (
    <DigitalTwinContext.Provider
      value={{
        profile,
        setProfile,
        sectors,
        setSectors,
        sensors,
        setSensors,
        workforce,
        setWorkforce,
        equipment,
        setEquipment,
        safetyPolicies,
        setSafetyPolicies,
        safetyConfig,
        setSafetyConfig,
        aiConfig,
        setAiConfig,
        wsConnected,
      }}
    >
      {children}
    </DigitalTwinContext.Provider>
  );
};

export const useDigitalTwin = () => {
  const context = useContext(DigitalTwinContext);
  if (!context) {
    throw new Error('useDigitalTwin must be used within a DigitalTwinProvider');
  }
  return context;
};
