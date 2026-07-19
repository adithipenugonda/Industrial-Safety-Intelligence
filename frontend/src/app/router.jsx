import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import BootScreen from "../screens/BootScreen/BootScreen";
import MissionControl from "../screens/MissionControl/MissionControl";
import TimeMachineScreen from "../screens/TimeMachine/TimeMachineScreen";
import TelemetryScreen from "../screens/Telemetry/TelemetryScreen";
import WeatherScreen from "../screens/Weather/WeatherScreen";
import AnalyticsScreen from "../screens/Analytics/AnalyticsScreen";
import AlertsScreen from "../screens/Alerts/AlertsScreen";
import DigitalTwinBuilder from "../screens/DigitalTwinBuilder/DigitalTwinBuilder";

function AnimatedRoutes() {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<BootScreen />} />
                <Route path="/builder" element={<DigitalTwinBuilder />} />
                <Route path="/mission-control" element={<MissionControl />} />
                <Route path="/time-machine" element={<TimeMachineScreen />} />
                <Route path="/telemetry" element={<TelemetryScreen />} />
                <Route path="/weather" element={<WeatherScreen />} />
                <Route path="/analytics" element={<AnalyticsScreen />} />
                <Route path="/alerts" element={<AlertsScreen />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}