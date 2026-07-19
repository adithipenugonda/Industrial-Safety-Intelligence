import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown, FiActivity, FiShield, FiHeart, FiWind } from "react-icons/fi";

const kpis = [
  { id: 'health', label: 'Overall Health', value: '94%', sub: 'Optimal', icon: FiHeart, color: 'text-status-success', trend: 'up' },
  { id: 'risk', label: 'Risk Trend', value: '12%', sub: 'Declining', icon: FiTrendingDown, color: 'text-brand-cyan', trend: 'down' },
  { id: 'efficiency', label: 'Op Efficiency', value: '88%', sub: '+2.4%', icon: FiActivity, color: 'text-brand-cyan', trend: 'up' },
  { id: 'safety', label: 'Safety Index', value: '9.8', sub: '/10', icon: FiShield, color: 'text-status-success', trend: 'up' },
  { id: 'env', label: 'Env Impact', value: 'Low', sub: 'Stable', icon: FiWind, color: 'text-brand-cyan', trend: 'neutral' },
];

export default function ExecutiveSummary() {
  return (
    <div className="w-full flex gap-4">
      {/* Hero KPI */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 flex items-center gap-6 border-brand-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.1)] relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-brand-cyan/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
        <div className="flex flex-col z-10">
          <span className="text-[10px] font-mono text-brand-cyan tracking-[0.2em] uppercase mb-1">Factory Performance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-orbitron font-bold text-white tracking-tight">92.4</span>
            <span className="text-sm font-mono text-slate-400">/100</span>
          </div>
        </div>
        <div className="h-full w-px bg-white/10 z-10 mx-2"></div>
        <div className="flex flex-col z-10">
          <div className="flex items-center gap-2 text-status-success">
            <FiTrendingUp size={14} />
            <span className="text-xs font-mono font-bold">+1.2 pts</span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase">vs Last Shift</span>
        </div>
      </motion.div>

      {/* Supporting KPIs */}
      <div className="flex-1 flex gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="flex-1 glass-panel p-4 flex flex-col justify-center relative overflow-hidden group hover:bg-white/5 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">{kpi.label}</span>
              <kpi.icon size={14} className={kpi.color} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-orbitron font-bold ${kpi.color}`}>{kpi.value}</span>
              <span className="text-[10px] font-mono text-slate-500">{kpi.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
