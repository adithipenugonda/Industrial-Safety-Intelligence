import { useState, useEffect } from "react";

import SystemStatusBar from "../../components/common/SystemStatusBar";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

import HeroIncident from "../../components/alerts/HeroIncident";
import IncidentTimeline from "../../components/alerts/IncidentTimeline";
import IncidentMap from "../../components/alerts/IncidentMap";
import AIIncidentCopilot from "../../components/alerts/AIIncidentCopilot";
import AlertRegistry from "../../components/alerts/AlertRegistry";

const initialAlerts = [
  { id: "A-992", time: "10:42:15", severity: "CRITICAL", title: "Core Temperature Spike", description: "Sector 7G reactor core temperature exceeded nominal thresholds. Automatic cooling systems engaged but struggling to compensate.", status: "ACTIVE", sector: "SECTOR 7G", affectedWorkers: "14 Personnel", elapsed: "00:04:12" },
  { id: "A-991", time: "10:35:00", severity: "WARN", title: "Methane Levels Elevated", description: "Sensors in sub-level 4 detecting abnormal gas concentrations. Ventilation increased to 80%.", status: "ACTIVE", sector: "SECTOR 4", affectedWorkers: "0 Personnel", elapsed: "00:11:27" },
  { id: "A-990", time: "10:15:30", severity: "INFO", title: "Shift Change Complete", description: "Alpha team relieved. Bravo team on site. Total active personnel: 148.", status: "RESOLVED", resolution: "Logged in registry.", sector: "FACTORY WIDE" },
  { id: "A-989", time: "09:50:22", severity: "CRITICAL", title: "Containment Pressure Drop", description: "Main containment vessel pressure dropped by 15% unexpectedly.", status: "RESOLVED", resolution: "Backup seal deployed. Pressure stabilized.", sector: "SECTOR 2", affectedWorkers: "4 Personnel" },
];

const mockNewAlerts = [
  { severity: "WARN", title: "Perimeter Breach Attempt", description: "Unauthorized access detected at North Gate. Security dispatched.", sector: "NORTH GATE", affectedWorkers: "0 Personnel" },
  { severity: "CRITICAL", title: "Coolant Pump Failure", description: "Primary coolant pump #3 offline. Immediate maintenance required.", sector: "SECTOR 3", affectedWorkers: "2 Personnel" },
  { severity: "INFO", title: "Routine Maintenance", description: "Scheduled diagnostic scan running on server rack B.", sector: "SERVER ROOM B", affectedWorkers: "1 Personnel" },
  { severity: "WARN", title: "Vibration Anomaly", description: "Turbine 2 exhibiting abnormal vibration patterns.", sector: "TURBINE HALL", affectedWorkers: "5 Personnel" }
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeIncidentId, setActiveIncidentId] = useState(initialAlerts[0].id);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(currentAlerts => {
        let newAlerts = [...currentAlerts];
        
        // 1. Randomly resolve an active alert
        if (Math.random() > 0.5) {
          const activeAlerts = newAlerts.filter(a => a.status === "ACTIVE" && a.id !== activeIncidentId); // don't auto resolve what we're looking at for UX
          if (activeAlerts.length > 0) {
            const alertToResolve = activeAlerts[Math.floor(Math.random() * activeAlerts.length)];
            const index = newAlerts.findIndex(a => a.id === alertToResolve.id);
            newAlerts[index] = { 
              ...alertToResolve, 
              status: "RESOLVED", 
              resolution: "Automated counter-measures deployed successfully." 
            };
          }
        }

        // 2. Randomly add a new alert
        if (Math.random() > 0.6) {
          const mockAlert = mockNewAlerts[Math.floor(Math.random() * mockNewAlerts.length)];
          const now = new Date();
          const newId = `A-${Math.floor(1000 + Math.random() * 9000)}`;
          
          newAlerts.unshift({
            id: newId,
            time: now.toLocaleTimeString('en-US', { hour12: false }),
            severity: mockAlert.severity,
            title: mockAlert.title,
            description: mockAlert.description,
            status: "ACTIVE",
            sector: mockAlert.sector,
            affectedWorkers: mockAlert.affectedWorkers,
            elapsed: "00:00:01"
          });
        }

        // Keep list manageable
        if (newAlerts.length > 20) {
          newAlerts = newAlerts.slice(0, 20);
        }

        return newAlerts;
      });
    }, 4000); // Run every 4 seconds

    return () => clearInterval(interval);
  }, [activeIncidentId]);

  // Derive the currently selected incident
  const activeIncident = alerts.find(a => a.id === activeIncidentId) || alerts[0];

  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative text-slate-200">
      <SVGConnectionLayer />
      
      {/* Top Bar: System Status */}
      <div className="absolute top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar />
        </div>
      </div>

      <div className="pt-[140px] px-8 pb-6 h-full flex flex-col z-10 relative pointer-events-auto w-full mx-auto max-w-[1600px]">
        
        {/* Header (Removed redundant title to prevent overlap with global header) */}
        <div className="mb-4 flex justify-end shrink-0">
          <div>
            <p className="text-status-danger text-sm font-mono tracking-widest mt-1">EMERGENCY OPERATIONS & RESPONSE</p>
          </div>
        </div>

        {/* 5-Zone Grid Layout */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT COLUMN (Zones 1, 2, 5) */}
          <div className="col-span-8 flex flex-col gap-6 min-h-0">
            {/* Zone 1: Hero Active Incident */}
            <div className="shrink-0">
              <HeroIncident incident={activeIncident} />
            </div>
            
            {/* Split Bottom Left into Timeline and Registry */}
            <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
              {/* Zone 2: Incident Timeline */}
              <div className="min-h-0">
                <IncidentTimeline incident={activeIncident} />
              </div>
              
              {/* Zone 5: Historical Alert Registry */}
              <div className="min-h-0">
                <AlertRegistry 
                  alerts={alerts} 
                  activeIncidentId={activeIncidentId} 
                  onSelectAlert={(a) => setActiveIncidentId(a.id)} 
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Zones 3, 4) */}
          <div className="col-span-4 flex flex-col gap-6 min-h-0">
            {/* Zone 3: Incident Map */}
            <div className="h-[40%] min-h-[300px]">
              <IncidentMap incident={activeIncident} />
            </div>

            {/* Zone 4: AI Copilot */}
            <div className="flex-1 min-h-0">
              <AIIncidentCopilot incident={activeIncident} />
            </div>
          </div>

        </div>

      </div>
    </CinematicTransition>
  );
}
