import SystemStatusBar from "../../components/common/SystemStatusBar";
import SVGConnectionLayer from "../../components/common/SVGConnectionLayer";
import CinematicTransition from "../../components/common/CinematicTransition";

import ExecutiveSummary from "../../components/analytics/ExecutiveSummary";
import AIBriefing from "../../components/analytics/AIBriefing";
import StoryTimeline from "../../components/analytics/StoryTimeline";
import InteractiveWorkspace from "../../components/analytics/InteractiveWorkspace";
import RiskBreakdownWidget from "../../components/analytics/RiskBreakdownWidget";

export default function AnalyticsScreen() {
  return (
    <CinematicTransition className="w-screen h-screen overflow-hidden relative bg-factory-bg-base text-slate-200 flex flex-col select-none">
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

      <div className="pt-20 px-6 pb-4 h-full flex flex-col z-10 relative pointer-events-auto max-w-[1800px] mx-auto w-full gap-3.5 min-h-0">
        
        {/* Page Header Bar */}
        <div className="mb-1 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <h1 className="text-base font-bold tracking-wider text-white uppercase font-orbitron">
              Operational Intelligence & Risk Analytics
            </h1>
          </div>
        </div>

        {/* ZONE 1: Executive Summary */}
        <div className="shrink-0 w-full">
          <ExecutiveSummary />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex gap-4 min-h-0">
          
          {/* Left Column (35%) */}
          <div className="w-[35%] flex flex-col gap-3.5 h-full min-h-0">
            {/* Dedicated Risk Engine Breakdown Widget */}
            <div className="h-[210px] shrink-0">
              <RiskBreakdownWidget />
            </div>

            {/* AI Intelligence Briefing */}
            <div className="flex-1 min-h-0">
              <AIBriefing />
            </div>
          </div>

          {/* Right Column (65%) */}
          <div className="w-[65%] h-full min-h-0 flex flex-col gap-3.5">
            {/* Interactive Analysis Workspace */}
            <div className="flex-1 min-h-0">
              <InteractiveWorkspace />
            </div>
          </div>
        </div>
      </div>
    </CinematicTransition>
  );
}
