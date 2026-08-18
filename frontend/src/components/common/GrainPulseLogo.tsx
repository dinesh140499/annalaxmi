import React from "react";

export interface GrainPulseLogoProps {
  variant?: "full" | "horizontal" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  showText?: boolean;
}

const GrainPulseLogo: React.FC<GrainPulseLogoProps> = ({
  variant = "horizontal",
  size = "md",
  className = "",
  showText = true,
}) => {
  const getDimensionClass = () => {
    if (typeof size === "number") return "";
    switch (size) {
      case "sm":
        return "h-8";
      case "md":
        return "h-10";
      case "lg":
        return "h-12";
      case "xl":
        return "h-16";
      default:
        return "h-10";
    }
  };

  const style = typeof size === "number" ? { height: `${size}px` } : undefined;

  if (variant === "badge" || variant === "full") {
    return (
      <img
        src="/logo.svg"
        alt="GrainPulse Logo"
        className={`object-contain ${getDimensionClass()} ${className}`}
        style={style}
      />
    );
  }

  if (variant === "icon") {
    return (
      <img
        src="/grainpulse-logo.png"
        alt="GrainPulse Icon"
        className={`object-contain rounded-xl ${getDimensionClass()} ${className}`}
        style={style}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={style}>
      <img
        src="/logo.png"
        alt="GrainPulse Emblem"
        className={`${getDimensionClass()} w-auto object-contain rounded-xl shadow-xs`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-extrabold text-emerald-950 tracking-tight leading-none">
            Grain<span className="text-amber-500">Pulse</span>
          </span>
          <span className="text-[9px] font-bold text-emerald-700 tracking-widest uppercase mt-0.5">
            Organic Harvest
          </span>
        </div>
      )}
    </div>
  );
};

export default GrainPulseLogo;
