
import SystemStatusBar from "../../components/common/SystemStatusBar";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

import ExecutiveSummary from "../../components/analytics/ExecutiveSummary";
import AIBriefing from "../../components/analytics/AIBriefing";
import StoryTimeline from "../../components/analytics/StoryTimeline";
import InteractiveWorkspace from "../../components/analytics/InteractiveWorkspace";

export default function AnalyticsScreen() {
  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative bg-factory-bg-base text-slate-200">
      {/* Background connections */}
      <SVGConnectionLayer />
      
      {/* Analytics-style background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xTTAgNDB2LTFsMzktMzlWMHoiIGZpbGw9IiMzMzQxNTUiIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-40 pointer-events-none"></div>

      {/* Top Bar: System Status */}
      <div className="absolute top-0 left-0 z-50 w-full pointer-events-none p-4">
        <div className="pointer-events-auto w-full">
          <SystemStatusBar />
        </div>
      </div>

      <div className="pt-[140px] px-8 pb-8 h-full flex flex-col z-10 relative pointer-events-auto gap-6">
        {/* ZONE 1: Executive Summary */}
        <div className="shrink-0 w-full">
          <ExecutiveSummary />
        </div>

        {/* Content Area (Zones 2, 3, 4) */}
        <div className="flex-1 flex gap-6 min-h-0">
          
          {/* Left Column (35%) */}
          <div className="w-[35%] flex flex-col gap-6 h-full min-w-[350px]">
            {/* ZONE 2: AI Intelligence Briefing */}
            <div className="flex-[4] min-h-0">
              <AIBriefing />
            </div>

            {/* ZONE 3: Story Timeline */}
            <div className="flex-[6] min-h-0">
              <StoryTimeline />
            </div>
          </div>

          {/* Right Column (65%) */}
          <div className="w-[65%] h-full min-h-0">
            {/* ZONE 4: Interactive Analysis Workspace */}
            <InteractiveWorkspace />
          </div>
        </div>
      </div>
    </CinematicTransition>
  );
}
