import { FiCloudRain, FiWind, FiSun } from "react-icons/fi";

export default function WeatherWidget({
  temp = "18°C",
  condition = "Acid Rain",
  severity = "LOW",
  wind = "14 km/h",
  uv = "UV 2"
}) {
  return (
    <div className="glass-panel hover-scale hover-glow p-4 flex flex-col w-64">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-brand-cyan text-xs tracking-widest uppercase">External Environment</h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiCloudRain className="text-slate-300 text-3xl" />
          <span className="text-3xl font-orbitron font-bold text-white">{temp}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-brand-cyan uppercase tracking-wider font-mono">{condition}</div>
          <div className="text-[10px] text-slate-400 font-mono">Severity: {severity}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="glass-panel-deep p-2 rounded flex flex-col gap-1 items-center justify-center">
          <FiWind className="text-slate-400" />
          <span className="text-slate-200">{wind}</span>
        </div>
        <div className="glass-panel-deep p-2 rounded flex flex-col gap-1 items-center justify-center">
          <FiSun className="text-slate-400" />
          <span className="text-slate-200">{uv}</span>
        </div>
      </div>
    </div>
  );
}
