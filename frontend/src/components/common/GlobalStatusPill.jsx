import { motion } from "framer-motion";

export default function GlobalStatusPill() {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 group pointer-events-auto"
    >
      <div className="glass-panel px-4 py-2 flex items-center gap-3 rounded-full border-brand-cyan/20 cursor-pointer hover:border-status-success/50 hover:bg-status-success/5 transition-all duration-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-success"></span>
        </span>
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase group-hover:text-status-success transition-colors">
          System Online
        </span>
      </div>
    </motion.div>
  );
}
