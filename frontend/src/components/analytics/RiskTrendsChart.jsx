import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiShield } from "react-icons/fi";

const initialData = Array.from({ length: 30 }, (_, i) => ({
  time: `-${30 - i}m`,
  risk: Math.max(10, Math.min(100, 30 + Math.random() * 40))
}));

export default function RiskTrendsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        newData.push({
          time: 'NOW',
          risk: Math.max(10, Math.min(100, last.risk + (Math.random() * 20 - 10)))
        });
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 h-full flex flex-col hover-glow transition-all">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-status-danger/10 border border-status-danger/30 rounded">
            <FiShield className="text-status-danger" size={18} />
          </div>
          <div>
            <h3 className="text-status-danger text-sm tracking-widest uppercase font-orbitron font-bold">Threat Index</h3>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">LIVE RISK ASSESSMENT</span>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(5, 8, 22, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
