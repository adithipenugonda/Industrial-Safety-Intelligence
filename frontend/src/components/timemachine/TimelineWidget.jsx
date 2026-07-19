import { Link } from "react-router-dom";

export default function TimelineWidget() {
  const events = [
    { time: "-2H", status: "ok" },
    { time: "-1H", status: "warning" },
    { time: "NOW", status: "ok", active: true },
    { time: "+1H", status: "prediction" },
    { time: "+2H", status: "prediction" },
  ];

  return (
    <Link to="/time-machine" className="glass-panel hover-scale hover-glow px-8 py-4 flex flex-col w-full max-w-3xl cursor-pointer">
      <h3 className="text-brand-cyan text-xs tracking-widest uppercase mb-4 text-center">Temporal Projection <span className="ml-2 bg-brand-cyan/20 px-2 py-0.5 rounded text-brand-cyan">CLICK TO ENTER TIME MACHINE</span></h3>
      
      <div className="relative flex items-center justify-between">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0">
          <div className="h-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent w-1/2 animate-pulse" />
        </div>

        {events.map((evt, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              evt.active 
                ? "bg-brand-cyan border-brand-cyan shadow-[0_0_12px_rgba(34,211,238,1)] scale-125" 
                : evt.status === "warning"
                ? "bg-factory-bg-base border-status-warning hover:bg-status-warning"
                : evt.status === "prediction"
                ? "bg-factory-bg-base border-brand-cyan/30 border-dashed hover:border-brand-cyan"
                : "bg-factory-bg-base border-status-success hover:bg-status-success"
            }`} />
            <span className={`text-[10px] font-mono tracking-wider ${evt.active ? "text-brand-cyan neon-text" : "text-slate-500 group-hover:text-slate-300"}`}>
              {evt.time}
            </span>
          </div>
        ))}
      </div>
    </Link>
  );
}
