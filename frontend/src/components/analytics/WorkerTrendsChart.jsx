import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FiUsers } from "react-icons/fi";

const initialData = Array.from({ length: 30 }, (_, i) => ({
  time: `-${30 - i}m`,
  workers: 100 + Math.floor(Math.random() * 50)
}));

export default function WorkerTrendsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        newData.push({
          time: 'NOW',
          workers: Math.max(50, Math.min(200, last.workers + Math.floor(Math.random() * 10 - 5)))
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
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
            <FiUsers className="text-emerald-500" size={18} />
          </div>
          <div>
            <h3 className="text-emerald-500 text-sm tracking-widest uppercase font-orbitron font-bold">Workforce Deployment</h3>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">ACTIVE PERSONNEL TRACKING</span>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(5, 8, 22, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#e2e8f0' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="workers" isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.workers < 80 ? '#ef4444' : '#10b981'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
