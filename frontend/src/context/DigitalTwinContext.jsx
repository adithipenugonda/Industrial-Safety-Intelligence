import { createContext, useState, useContext } from 'react';

const DigitalTwinContext = createContext(null);

export const DigitalTwinProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'FactoryOS Alpha',
    location: '',
    industryType: '',
    workingHours: '24/7',
    emergencyContact: '',
  });

  const [sectors, setSectors] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [workforce, setWorkforce] = useState([]);
  const [equipment, setEquipment] = useState([]);

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
        safetyConfig,
        setSafetyConfig,
        aiConfig,
        setAiConfig,
      }}
    >
      {children}
    </DigitalTwinContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDigitalTwin = () => {
  const context = useContext(DigitalTwinContext);
  if (!context) {
    throw new Error('useDigitalTwin must be used within a DigitalTwinProvider');
  }
  return context;
};
