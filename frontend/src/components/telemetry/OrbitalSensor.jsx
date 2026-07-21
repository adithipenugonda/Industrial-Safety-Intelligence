import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiActivity,
  FiAlertTriangle,
  FiCpu,
  FiClock,
  FiInfo,
  FiX,
} from "react-icons/fi";

export default function OrbitalSensor({
  name,
  type,
  value,
  unit,
  status,
  icon: Icon,
  angle,
  radius,
}) {
  const [open, setOpen] = useState(false);

  // Compute fixed polar coordinates
  const { x, y } = useMemo(() => {
    const rad = (angle * Math.PI) / 180;

    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  }, [angle, radius]);

  const critical = status === "CRITICAL";
  const accent = critical ? "#FF4040" : "#00E5FF";

  return (
    <>
      {/* 88px Circular Glass Sensor Node (Zero Layout Shift Guaranteed) */}
      <motion.div
        className="absolute cursor-pointer pointer-events-auto select-none"
        style={{
          width: 88,
          height: 88,
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
        }}
        whileHover={{
          scale: 1.1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        onClick={() => setOpen(true)}
      >
        {/* Outer Rotating Dashed Accent Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: critical ? 3 : 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 100,
            height: 100,
            left: -6,
            top: -6,
            border: `2px dashed ${accent}`,
            opacity: 0.6,
          }}
        />

        {/* Outer Radial Glow Layer */}
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 88,
            height: 88,
            background: accent,
            filter: "blur(20px)",
            opacity: critical ? 0.5 : 0.35,
          }}
        />

        {/* Main Glass HUD Sensor Card (Fixed 88px x 88px) */}
        <div
          className="relative backdrop-blur-xl rounded-full border flex flex-col items-center justify-center text-center p-1"
          style={{
            width: 88,
            height: 88,
            borderColor: accent,
            borderWidth: critical ? "2px" : "1.5px",
            background:
              "linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.02))",
            boxShadow: critical
              ? "0 0 35px rgba(255,64,64,.75)"
              : "0 0 30px rgba(0,229,255,.45)",
          }}
        >
          {/* 4 Cardinal Tick Dots */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />

          {/* Sensor Icon */}
          {Icon && (
            <Icon
              size={19}
              color={accent}
              style={{
                marginBottom: 2,
              }}
            />
          )}

          {/* Bold Numeric Value */}
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            {value}
          </div>

          {/* Unit */}
          {unit && (
            <div
              style={{
                fontSize: 9,
                color: "#9EEBFF",
                marginTop: 1.5,
                fontFamily: "monospace",
              }}
            >
              {unit}
            </div>
          )}

          {/* Parameter Title */}
          <div
            style={{
              marginTop: 2,
              fontSize: 8,
              fontWeight: 700,
              color: "#B7F7FF",
              maxWidth: 74,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {name}
          </div>
        </div>
      </motion.div>

      {/* Screen-Fixed Modal Popup Overlay (Removed 100% from Document Flow) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md pointer-events-auto"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="backdrop-blur-2xl rounded-2xl border p-6 text-white shadow-2xl relative"
              style={{
                width: 340,
                background:
                  "linear-gradient(180deg,rgba(10,20,40,.97),rgba(5,10,25,.97))",
                borderColor: accent,
                boxShadow: `0 0 45px ${accent}65`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      background: accent,
                      boxShadow: `0 0 15px ${accent}`,
                    }}
                  >
                    {Icon && <Icon color="#001018" size={22} />}
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: "Orbitron, sans-serif",
                      }}
                    >
                      {name}
                    </div>

                    <div
                      style={{
                        color: "#9CEEFF",
                        fontSize: 12,
                        fontFamily: "monospace",
                      }}
                    >
                      {type}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Status Badge */}
              <div
                className="mt-5 rounded-lg px-3.5 py-2 flex items-center gap-2.5"
                style={{
                  background: critical
                    ? "rgba(255,70,70,.18)"
                    : "rgba(0,229,255,.14)",
                  border: `1px solid ${accent}`,
                }}
              >
                {critical ? (
                  <FiAlertTriangle color="#ff5555" size={16} />
                ) : (
                  <FiActivity color="#00E5FF" size={16} />
                )}

                <span
                  style={{
                    color: accent,
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  {status}
                </span>
              </div>

              {/* Value Cards */}
              <div className="grid grid-cols-2 gap-3.5 mt-5">
                <div
                  className="rounded-xl p-3.5 border bg-white/5"
                  style={{
                    borderColor: "#1D3D55",
                  }}
                >
                  <div className="text-[11px] font-mono text-cyan-300">
                    CURRENT READING
                  </div>

                  <div
                    className="text-white mt-2"
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      fontFamily: "Orbitron, sans-serif",
                    }}
                  >
                    {value}

                    <span
                      style={{
                        fontSize: 13,
                        marginLeft: 4,
                        fontFamily: "monospace",
                        color: "#9EEBFF",
                      }}
                    >
                      {unit}
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-xl p-3.5 border bg-white/5"
                  style={{
                    borderColor: "#1D3D55",
                  }}
                >
                  <div className="text-[11px] font-mono text-cyan-300">
                    DEVICE
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <FiCpu color="#00E5FF" size={16} />

                    <span className="text-xs font-mono text-white">
                      Sensor #{name ? name.slice(0, 3).toUpperCase() : "NODE"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-3 text-xs font-mono text-cyan-200">
                  <FiClock className="text-[#00E5FF]" />
                  Live Stream Update (1.8s Sync)
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-cyan-200">
                  <FiInfo className="text-[#00E5FF]" />
                  SCADA Gateway Mesh Protocol
                </div>
              </div>

              {/* Footer */}
              <div
                className="mt-6 rounded-lg p-3 text-center uppercase tracking-widest font-mono text-[11px]"
                style={{
                  background: "rgba(0,229,255,.1)",
                  color: "#B8F6FF",
                }}
              >
                Industrial Telemetry Node Active
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
