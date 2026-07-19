import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiActivity } from "react-icons/fi";

const initialData = Array.from({ length: 20 }, (_, i) => ({
  time: `-${20 - i}m`,
  temp: 15 + Math.random() * 10,
  wind: 10 + Math.random() * 20,
  rain: Math.random() * 5 > 4 ? Math.random() * 15 : 0
}));

export default function AtmosphericsChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const last = prevData[prevData.length - 1];
        
        let newRain = last.rain > 0 
            ? Math.max(0, last.rain + (Math.random() * 10 - 5)) 
            : Math.random() * 10 > 8 ? Math.random() * 10 : 0;

        newData.push({
          time: 'NOW',
          temp: Math.max(10, Math.min(35, last.temp + (Math.random() * 2 - 1))),
          wind: Math.max(0, last.wind + (Math.random() * 8 - 4)),
          rain: newRain
        });
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 h-full flex flex-col hover-glow transition-all">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FiActivity className="text-brand-cyan animate-pulse" />
          <h3 className="text-brand-cyan text-sm tracking-widest uppercase font-orbitron font-bold">Atmospheric Trends</h3>
        </div>
        <div className="flex gap-4 text-[10px] font-mono tracking-widest text-slate-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#ff7300] rounded-full"></div> TEMP</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#22d3ee] rounded-full"></div> WIND</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#3b82f6] rounded-full"></div> RAIN</div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderColor: 'rgba(34,211,238,0.3)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="rain" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRain)" isAnimationActive={false} />
            <Area type="monotone" dataKey="wind" stroke="#22d3ee" fillOpacity={1} fill="url(#colorWind)" isAnimationActive={false} />
            <Area type="monotone" dataKey="temp" stroke="#ff7300" fillOpacity={1} fill="url(#colorTemp)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
