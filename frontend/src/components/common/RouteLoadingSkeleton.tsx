import React from "react";
import { FaLeaf } from "react-icons/fa";

const RouteLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-slate-50/60 p-6">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer aura */}
        <div className="absolute h-20 w-20 rounded-full bg-emerald-500/20 animate-ping" />
        
        {/* Spinning border ring */}
        <div className="h-16 w-16 rounded-2xl border-2 border-emerald-800/30 border-t-emerald-800 animate-spin flex items-center justify-center shadow-lg bg-white" />
        
        {/* Center brand leaf */}
        <div className="absolute text-amber-500">
          <FaLeaf className="text-xl animate-pulse transform -rotate-12" />
        </div>
      </div>

      {/* Loading title & subtitle */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-sm font-bold text-slate-800 tracking-tight">
          Grain<span className="text-amber-500">Pulse</span>
        </p>
        <p className="text-xs text-slate-400">Loading fresh harvest details...</p>
      </div>

      {/* Skeleton placeholders to prevent layout shift */}
      <div className="mt-8 w-full max-w-2xl space-y-3 px-4">
        <div className="h-4 bg-slate-200/80 rounded-full w-3/4 mx-auto animate-pulse" />
        <div className="h-3 bg-slate-200/60 rounded-full w-1/2 mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export default RouteLoadingSkeleton;
