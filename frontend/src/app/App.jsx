import AppRouter from "./router";
import GlobalBackground from "../components/common/GlobalBackground";
import GlobalStatusPill from "../components/common/GlobalStatusPill";
import { DigitalTwinProvider } from "../context/DigitalTwinContext";

export default function App() {
    return (
      <DigitalTwinProvider>
        <GlobalBackground />
        <AppRouter />
        <GlobalStatusPill />
      </DigitalTwinProvider>
    );
}