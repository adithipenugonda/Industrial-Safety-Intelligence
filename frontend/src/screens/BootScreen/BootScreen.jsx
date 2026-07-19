import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu } from "react-icons/fi";

const bootSequence = [
  "AI initialization sequence...",
  "Sensor initialization...",
  "Weather engine initialization...",
  "Risk engine initialization...",
  "AI Advisor initialization...",
  "Time Machine initialization...",
  "SYSTEM ONLINE"
];

export default function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Total boot time around 4 seconds
    const totalTime = 4000;
    const intervalTime = 50;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (totalTime / intervalTime));
        
        // Calculate which step we should be on based on progress
        const currentStep = Math.floor((next / 100) * bootSequence.length);
        if (currentStep !== stepIndex && currentStep < bootSequence.length) {
          setStepIndex(currentStep);
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate("/mission-control");
          }, 800); // Wait a moment before transitioning
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [navigate, stepIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-screen h-screen bg-factory-bg-deep flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background cinematic grid */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/10 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="z-10 flex flex-col items-center max-w-3xl w-full px-8">
        {/* Logo Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mb-6 text-brand-cyan opacity-80"
          >
            <FiCpu size={64} className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </motion.div>
          <h1 className="text-6xl font-bold font-orbitron text-slate-100 tracking-[12px] uppercase neon-text mb-2">
            FactoryOS
          </h1>
          <p className="text-brand-cyan/70 font-mono tracking-widest text-sm uppercase">
            Industrial Mission Control System
          </p>
        </motion.div>

        {/* Boot Sequence Terminal */}
        <div className="w-full glass-panel-deep p-6 rounded-lg mb-8 h-48 flex flex-col justify-end overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-factory-bg-elevated to-transparent z-10" />
          
          <div className="flex flex-col gap-2 font-jetmono text-sm">
            <AnimatePresence>
              {bootSequence.slice(0, stepIndex + 1).map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${idx === stepIndex ? 'text-brand-cyan' : 'text-slate-500'} flex items-center gap-3`}
                >
                  <span className="text-xs opacity-50">{`[${(idx * 0.142).toFixed(3)}s]`}</span>
                  {idx === stepIndex && idx < bootSequence.length - 1 ? (
                    <span className="animate-pulse">{msg}</span>
                  ) : (
                    <span>{msg}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full relative">
          <div className="flex justify-between font-mono text-xs text-brand-cyan/70 mb-2 uppercase tracking-wider">
            <span>System Core Boot</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)] rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}