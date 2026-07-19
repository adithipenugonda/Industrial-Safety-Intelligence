import { motion } from "framer-motion";
import { FiClock, FiShield, FiAlertTriangle } from "react-icons/fi";

export default function MissionControlLayout({ children }) {
  const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="w-screen h-screen flex flex-col p-4 box-border">
      {/* Top Header Bar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel flex justify-between items-center px-6 py-3 mb-4 shrink-0"
      >
        <div className="flex items-center gap-4">
          <FiShield className="text-brand-cyan text-2xl animate-pulse" />
          <h1 className="text-xl font-bold tracking-widest uppercase neon-text font-orbitron">
            FactoryOS <span className="text-slate-400 text-sm tracking-normal">v2.4.1</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/50 rounded-full">
            <FiAlertTriangle className="text-red-400" />
            <span className="text-red-400 text-sm font-semibold tracking-wider">DEFCON 4</span>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-cyan-200">
            <FiClock className="text-brand-cyan" />
            <span>{currentTime}</span>
          </div>
        </div>
      </motion.header>

      {/* Main Grid Content */}
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
}
