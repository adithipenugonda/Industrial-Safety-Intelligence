export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mt-8">
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}