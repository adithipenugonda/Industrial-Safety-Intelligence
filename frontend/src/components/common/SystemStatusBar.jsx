import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiClock, FiBell, FiGrid, FiActivity, FiCloudRain, FiPieChart, FiAlertTriangle, FiTool } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: '/mission-control', label: 'Mission Control', icon: FiGrid },
  { path: '/builder', label: 'Factory Configuration', icon: FiTool },
  { path: '/telemetry', label: 'Telemetry', icon: FiActivity },
  { path: '/weather', label: 'Environment', icon: FiCloudRain },
  { path: '/analytics', label: 'Analytics', icon: FiPieChart },
  { path: '/alerts', label: 'Alerts', icon: FiAlertTriangle, isAlert: true }
];

export default function SystemStatusBar({ extraRight }) {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' });
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState(null);

  const isMissionControl = location.pathname === '/mission-control' || location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex justify-between items-center"
    >
      {/* LEFT: Show FactoryOS branding ONLY on Mission Control page */}
      <div className="flex items-center gap-3">
        {isMissionControl ? (
          <Link to="/mission-control" className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-brand-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md shrink-0 hover:border-brand-cyan/60 transition-all">
            <FiShield className="text-brand-cyan text-base animate-pulse" />
            <span className="text-xs font-bold font-orbitron tracking-wider text-white">FACTORY<span className="text-brand-cyan">OS</span> <span className="text-slate-400 text-[10px] tracking-normal font-normal">v2.4.1</span></span>
          </Link>
        ) : (
          <div className="w-8 h-8 pointer-events-none" />
        )}
      </div>

      {/* CENTER: Floating Icon Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 glass-panel-deep px-2 md:px-3 py-1.5 md:py-2 border border-brand-cyan/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
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
                className={`flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-xl border border-transparent transition-colors duration-300 ${isActive ? activeBg : inactiveBg}`}
              >
                <item.icon className="text-sm md:text-lg" />
                <AnimatePresence mode="popLayout">
                  {showLabel && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, scale: 0.8 }}
                      animate={{ opacity: 1, width: "auto", scale: 1 }}
                      exit={{ opacity: 0, width: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-[9px] font-mono tracking-widest uppercase whitespace-nowrap overflow-hidden hidden md:inline"
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

      {/* RIGHT: Page Controls, Time & Notifications */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Page-Specific Badges / Controls (Placed directly beside time clock) */}
        {extraRight && (
          <div className="shrink-0 flex items-center">
            {extraRight}
          </div>
        )}

        {/* Time */}
        <div className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/5 hidden md:flex shrink-0">
          <FiClock className="text-slate-400" size={12} />
          <span className="font-mono text-xs tracking-widest text-slate-200 font-bold">{currentTime}</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer group shrink-0">
          <div className="p-2 rounded-full glass-panel border border-white/5 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10 transition-all duration-300 shadow-md">
            <FiBell className="text-slate-300 group-hover:text-brand-cyan" size={15} />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-status-danger shadow-[0_0_8px_rgba(239,68,68,0.6)] border border-black">
            <span className="text-[8px] font-bold text-white">3</span>
          </span>
        </div>
      </div>
    </motion.header>
  );
}
