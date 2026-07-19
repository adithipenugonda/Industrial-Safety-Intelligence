import ProgressBar from "./ProgressBar";
import BootText from "./BootText";

export default function BootLoader({ progress, message }) {
  return (
    <div className="w-full max-w-2xl">
      <BootText text={message} />
      <ProgressBar progress={progress} />
    </div>
  );
}