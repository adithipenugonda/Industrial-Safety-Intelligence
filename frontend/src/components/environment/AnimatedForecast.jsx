import { motion } from "framer-motion";
import { FiSun, FiCloud, FiCloudRain, FiCloudLightning, FiCloudDrizzle } from "react-icons/fi";

const forecastData = [
  { day: "TUE", temp: "22°", condition: "Clear", icon: FiSun, color: "text-yellow-400" },
  { day: "WED", temp: "19°", condition: "Clouds", icon: FiCloud, color: "text-slate-300" },
  { day: "THU", temp: "17°", condition: "Rain", icon: FiCloudRain, color: "text-blue-400" },
  { day: "FRI", temp: "15°", condition: "Storm", icon: FiCloudLightning, color: "text-purple-400" },
  { day: "SAT", temp: "18°", condition: "Drizzle", icon: FiCloudDrizzle, color: "text-cyan-400" },
];

export default function AnimatedForecast() {
  return (
    <div className="glass-panel p-6 w-full flex flex-col hover-glow transition-all">
      <h3 className="text-brand-cyan text-sm tracking-widest uppercase font-orbitron font-bold mb-6">5-Day Projection</h3>
      
      <div className="grid grid-cols-5 gap-4">
        {forecastData.map((data, index) => {
          const Icon = data.icon;
          
          return (
            <motion.div 
              key={data.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-panel-deep p-4 flex flex-col items-center justify-center gap-3 rounded-lg hover-scale cursor-default border border-white/5 hover:border-brand-cyan/30"
            >
              <span className="text-[10px] text-slate-400 font-mono tracking-widest">{data.day}</span>
              
              <motion.div
                animate={
                  data.condition === "Clear" ? { rotate: 360 } :
                  data.condition === "Rain" ? { y: [0, 5, 0] } :
                  data.condition === "Storm" ? { x: [-2, 2, -2, 2, 0], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] } :
                  { scale: [1, 1.1, 1] }
                }
                transition={{ 
                  duration: data.condition === "Clear" ? 20 : 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Icon className={`text-3xl ${data.color}`} />
              </motion.div>
              
              <span className="text-xl font-orbitron font-bold text-slate-200">{data.temp}</span>
              <span className="text-[9px] text-brand-cyan font-mono tracking-widest uppercase">{data.condition}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
