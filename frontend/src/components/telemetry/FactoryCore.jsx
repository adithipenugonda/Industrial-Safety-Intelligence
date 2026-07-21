import { motion } from "framer-motion";
import OrbitalSensor from "./OrbitalSensor";

const RADAR_SIZE = 570; // Fixed 570px radar canvas
const NODE_SIZE = 88;   // 88px circular sensor node diameter

const OUTER_RADIUS = RADAR_SIZE / 2; // 285px
const NODE_RADIUS = NODE_SIZE / 2;   // 44px

const ORBIT_RADIUS = OUTER_RADIUS - NODE_RADIUS - 6; // 235px
const LINE_LENGTH = ORBIT_RADIUS - NODE_RADIUS;      // 191px

export default function FactoryCore({ sensors = [] }) {
  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{
        width: RADAR_SIZE,
        height: RADAR_SIZE,
      }}
    >
      {/* Background Outer Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: RADAR_SIZE,
          height: RADAR_SIZE,
          background:
            "radial-gradient(circle, rgba(0,229,255,.14), transparent 70%)",
        }}
      />

      {/* 1. Outer Ring (570px) */}
      <div
        className="absolute rounded-full border border-cyan-400/40 pointer-events-none"
        style={{
          width: RADAR_SIZE,
          height: RADAR_SIZE,
          boxShadow: "0 0 45px rgba(0,229,255,.28)",
        }}
      />

      {/* 2. Second Ring (460px - Clockwise Rotating Dashed) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-dashed border-cyan-400/35 pointer-events-none"
        style={{
          width: 460,
          height: 460,
        }}
      />

      {/* 3. Orbit Marker Ring (370px - Counter-Rotating Dotted) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-dotted border-cyan-400/40 pointer-events-none"
        style={{
          width: 370,
          height: 370,
        }}
      />

      {/* 4. Fourth Ring (270px - Clockwise Rotating Dashed) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-dashed border-cyan-400/45 pointer-events-none"
        style={{
          width: 270,
          height: 270,
        }}
      />

      {/* 5. Inner Ring (170px - Counter-Rotating Dotted) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full border border-dotted border-cyan-400/50 pointer-events-none"
        style={{
          width: 170,
          height: 170,
        }}
      />

      {/* Active 360° Rotating Radar Sweep Line Beam (570px) */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: RADAR_SIZE,
          height: RADAR_SIZE,
          background:
            "conic-gradient(from 0deg, rgba(0,229,255,.26), rgba(0,229,255,.05) 35deg, transparent 70deg)",
        }}
      >
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: OUTER_RADIUS,
            height: 2,
            transformOrigin: "0% 50%",
            background:
              "linear-gradient(to right, rgba(0,229,255,.1), rgba(0,229,255,1))",
            boxShadow: "0 0 16px cyan",
          }}
        />
      </motion.div>

      {/* Radar Pulse Waves */}
      <motion.div
        animate={{
          scale: [0.3, 1],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute rounded-full border border-cyan-400/45 pointer-events-none"
        style={{
          width: RADAR_SIZE,
          height: RADAR_SIZE,
        }}
      />

      {/* 12 Floating Cyan Data Particles */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const r = 210;
        const x = Math.cos((deg * Math.PI) / 180) * r;
        const y = Math.sin((deg * Math.PI) / 180) * r;

        return (
          <motion.div
            key={`particle-${deg}`}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: deg / 120,
            }}
            className="absolute w-2 h-2 rounded-full bg-cyan-300 pointer-events-none shadow-[0_0_8px_cyan]"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%,-50%)",
            }}
          />
        );
      })}

      {/* Radial Connection Lines & 8 Orbital Sensors */}
      {sensors.map((sensor, index) => {
        const angle = (360 / sensors.length) * index - 90;
        const critical = sensor.status === "CRITICAL";
        const color = critical ? "#FF4040" : "#00E5FF";

        return (
          <div key={sensor.id} className="absolute inset-0 pointer-events-none">
            {/* Connection Line */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: LINE_LENGTH,
                height: 2,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0% 50%",
                background: `linear-gradient(to right, rgba(0,229,255,.1), ${color})`,
                zIndex: 1,
              }}
            >
              <motion.div
                animate={{
                  left: ["0%", "100%"],
                }}
                transition={{
                  duration: critical ? 1.2 : 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: color,
                  boxShadow: `0 0 14px ${color}`,
                }}
              />
            </div>

            {/* Orbital Sensor Node */}
            <OrbitalSensor
              {...sensor}
              angle={angle}
              radius={ORBIT_RADIUS}
            />
          </div>
        );
      })}

      {/* Center Glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160,
          height: 160,
          background:
            "radial-gradient(circle, rgba(0,229,255,.28), transparent)",
          filter: "blur(24px)",
        }}
      />

      {/* Enlarged Holographic Factory Icon (135px x 135px) */}
      <div
        className="absolute z-20 flex items-center justify-center pointer-events-none"
        style={{
          width: 135,
          height: 135,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 14px cyan)",
              "drop-shadow(0 0 32px cyan)",
              "drop-shadow(0 0 14px cyan)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="w-full h-full relative"
        >
          <svg
            width="115"
            height="115"
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full"
          >
            {/* Base Platform */}
            <path
              d="M10 80L90 80L82 90L18 90Z"
              fill="#00E5FF"
              fillOpacity=".24"
              stroke="#00E5FF"
              strokeWidth="1.5"
            />
            {/* Main Building */}
            <rect
              x="25"
              y="42"
              width="50"
              height="38"
              fillOpacity=".16"
              fill="#00E5FF"
              stroke="#00E5FF"
              strokeWidth="1.5"
            />
            {/* Smokestacks */}
            <rect
              x="36"
              y="25"
              width="10"
              height="18"
              fill="#00E5FF"
              fillOpacity=".4"
              stroke="#00E5FF"
            />
            <rect
              x="55"
              y="18"
              width="10"
              height="25"
              fill="#00E5FF"
              fillOpacity=".4"
              stroke="#00E5FF"
            />
            {/* Roof */}
            <path
              d="M20 42L50 32L80 42"
              stroke="#00E5FF"
              strokeWidth="2"
            />
            {/* Laser Line */}
            <motion.line
              x1="12" y1="20" x2="88" y2="20" 
              stroke="#00E5FF" strokeWidth="2.5" strokeOpacity="0.9"
              animate={{ y: [18, 86, 18] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
