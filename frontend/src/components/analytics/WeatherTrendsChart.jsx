import { useState, useEffect } from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiCloudRain } from "react-icons/fi";

const initialData = Array.from({ length: 30 }, (_, i) => ({
  time: `-${30 - i}m`,
  rain: Math.random() * 5 > 3 ? Math.random() * 15 : 0,
  wind: 10 + Math.random() * 20
}));

export default function WeatherTrendsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        let newRain = last.rain > 0 
            ? Math.max(0, last.rain + (Math.random() * 10 - 5)) 
            : Math.random() * 10 > 8 ? Math.random() * 10 : 0;

        newData.push({
          time: 'NOW',
          rain: newRain,
          wind: Math.max(0, last.wind + (Math.random() * 8 - 4))
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
          <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded">
            <FiCloudRain className="text-blue-500" size={18} />
          </div>
          <div>
            <h3 className="text-blue-500 text-sm tracking-widest uppercase font-orbitron font-bold">Atmospheric Overlay</h3>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">PRECIPITATION VS WIND</span>
          </div>
        </div>
        <div className="flex gap-4 text-[10px] font-mono tracking-widest text-slate-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#3b82f6] rounded-full"></div> RAIN</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#22d3ee] rounded-full"></div> WIND</div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(5, 8, 22, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area yAxisId="left" type="monotone" dataKey="rain" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrecip)" isAnimationActive={false} />
            <Line yAxisId="right" type="monotone" dataKey="wind" stroke="#22d3ee" strokeWidth={2} dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
