import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiClock, FiBell, FiGrid, FiActivity, FiCloudRain, FiPieChart, FiAlertTriangle, FiTool } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: '/mission-control', label: 'Mission Control', icon: FiGrid },
  { path: '/builder', label: 'Twin Builder', icon: FiTool },
  { path: '/telemetry', label: 'Telemetry', icon: FiActivity },
  { path: '/weather', label: 'Environment', icon: FiCloudRain },
  { path: '/analytics', label: 'Analytics', icon: FiPieChart },
  { path: '/alerts', label: 'Alerts', icon: FiAlertTriangle, isAlert: true }
];

export default function SystemStatusBar() {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' });
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState(null);

  const getModuleTitle = (path) => {
    switch (path) {
      case '/mission-control': return 'COMMAND CENTER';
      case '/builder': return 'DIGITAL TWIN BUILDER';
      case '/telemetry': return 'TELEMETRY OPERATIONS';
      case '/weather': return 'ENVIRONMENTAL INTELLIGENCE';
      case '/analytics': return 'OPERATIONAL INTELLIGENCE';
      case '/alerts': return 'ALERT COMMAND CENTER';
      case '/time-machine': return 'TIME MACHINE';
      default: return 'SYSTEM STANDBY';
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-between items-center"
    >
      {/* LEFT: Branding & Module Name */}
      <div className="flex items-center gap-6">
        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 shadow-lg backdrop-blur-md">
          <FiShield className="text-brand-cyan text-sm animate-pulse" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white font-orbitron leading-none drop-shadow-md">
            {getModuleTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* CENTER: Floating Icon Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel-deep px-3 py-2 border border-brand-cyan/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredNav === item.path;
          const showLabel = isActive || isHovered;
          
          let activeBg = item.isAlert ? "bg-status-danger/20 border-status-danger/50 text-status-danger" : "bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan";
          let inactiveBg = item.isAlert ? "hover:bg-status-danger/10 hover:text-status-danger text-slate-400" : "hover:bg-brand-cyan/10 hover:text-brand-cyan text-slate-400";

          return (
            <Link 
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredNav(item.path)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <motion.div 
                layout
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-transparent transition-colors duration-300 ${isActive ? activeBg : inactiveBg}`}
              >
                <item.icon className="text-lg" />
                <AnimatePresence mode="popLayout">
                  {showLabel && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, scale: 0.8 }}
                      animate={{ opacity: 1, width: "auto", scale: 1 }}
                      exit={{ opacity: 0, width: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-[10px] font-mono tracking-widest uppercase whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* RIGHT: Time & Notifications */}
      <div className="flex items-center gap-4">
        {/* Time */}
        <div className="flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/5">
          <FiClock className="text-slate-400" size={12} />
          <span className="font-mono text-sm tracking-widest text-slate-200 font-bold">{currentTime}</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <div className="p-2 rounded-full glass-panel border border-white/5 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 transition-all duration-300 shadow-md">
            <FiBell className="text-slate-300 group-hover:text-brand-cyan" size={16} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-danger shadow-[0_0_8px_rgba(239,68,68,0.6)] border border-black">
            <span className="text-[8px] font-bold text-white">3</span>
          </span>
        </div>
      </div>
    </motion.header>
  );
}
