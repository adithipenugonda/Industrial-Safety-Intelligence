import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiActivity } from "react-icons/fi";

const initialData = Array.from({ length: 30 }, (_, i) => ({
  time: `-${30 - i}m`,
  temp: 800 + Math.random() * 100,
  pressure: 40 + Math.random() * 10
}));

export default function SensorTrendsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        newData.push({
          time: 'NOW',
          temp: Math.max(500, Math.min(1500, last.temp + (Math.random() * 50 - 25))),
          pressure: Math.max(20, Math.min(80, last.pressure + (Math.random() * 4 - 2)))
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
          <div className="p-2 bg-brand-cyan/10 border border-brand-cyan/30 rounded">
            <FiActivity className="text-brand-cyan" size={18} />
          </div>
          <div>
            <h3 className="text-brand-cyan text-sm tracking-widest uppercase font-orbitron font-bold">Telemetry Trends</h3>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">CORE TEMP VS PRESSURE</span>
          </div>
        </div>
        <div className="flex gap-4 text-[10px] font-mono tracking-widest text-slate-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#f59e0b] rounded-full"></div> TEMP</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#22d3ee] rounded-full"></div> PRESSURE</div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(5, 8, 22, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#22d3ee" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
