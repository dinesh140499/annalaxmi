import { useState, useEffect, useRef, type JSX } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  autoDismissMs?: number;  // default: 3000
  onDismiss?: () => void;
  className?: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

const CONFIG: Record<
  AlertVariant,
  {
    bg: string;
    border: string;
    titleColor: string;
    msgColor: string;
    badgeBg: string;
    badgeRing: string;
    iconColor: string;
    progressBar: string;
    closeColor: string;
    label: string;
    icon: JSX.Element;
  }
> = {
  // ✅ Success — brand green
  success: {
    bg: "bg-[#f0f7f2]",
    border: "border-[#2d6a4f]",
    titleColor: "text-[#1a3d2b]",
    msgColor: "text-[#2d6a4f]",
    badgeBg: "bg-[#2d6a4f]",
    badgeRing: "ring-[#1a3d2b]",
    iconColor: "text-white",
    progressBar: "bg-[#2d6a4f]",
    closeColor: "text-[#2d6a4f]",
    label: "Success",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
      </svg>
    ),
  },
  // ❌ Error — warm red, still readable on white
  error: {
    bg: "bg-[#fff4f4]",
    border: "border-[#c0392b]",
    titleColor: "text-[#7b1a1a]",
    msgColor: "text-[#c0392b]",
    badgeBg: "bg-[#c0392b]",
    badgeRing: "ring-[#7b1a1a]",
    iconColor: "text-white",
    progressBar: "bg-[#c0392b]",
    closeColor: "text-[#c0392b]",
    label: "Error",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    ),
  },
  // ⚠️ Warning — amber/yellow matching the top banner
  warning: {
    bg: "bg-[#fffbea]",
    border: "border-[#e6b800]",
    titleColor: "text-[#6b4c00]",
    msgColor: "text-[#8a6200]",
    badgeBg: "bg-[#e6b800]",
    badgeRing: "ring-[#c49b00]",
    iconColor: "text-white",
    progressBar: "bg-[#e6b800]",
    closeColor: "text-[#8a6200]",
    label: "Warning",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
    ),
  },
  // ℹ️ Info — muted green-teal, consistent with the brand
  info: {
    bg: "bg-[#eef6f3]",
    border: "border-[#3a7d5e]",
    titleColor: "text-[#1a3d2b]",
    msgColor: "text-[#3a7d5e]",
    badgeBg: "bg-[#3a7d5e]",
    badgeRing: "ring-[#2d6a4f]",
    iconColor: "text-white",
    progressBar: "bg-[#3a7d5e]",
    closeColor: "text-[#3a7d5e]",
    label: "Info",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px]">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const POSITION_CLASSES: Record<NonNullable<AlertProps["position"]>, string> = {
  "top-left":      "top-4 left-4  items-start",
  "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-4 right-4 items-end",
  "bottom-left":   "bottom-4 left-4  items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-4 right-4 items-end",
};

function getEnterTransform(position: NonNullable<AlertProps["position"]>): string {
  if (position.startsWith("top"))    return "translateY(-110%) scale(0.96)";
  if (position.startsWith("bottom")) return "translateY(110%)  scale(0.96)";
  return "translateY(-110%) scale(0.96)";
}

export function Alert({
  variant = "info",
  title,
  message,
  dismissible = true,
  autoDismissMs = 3000,
  onDismiss,
  className = "",
  position = "top-right",
}: AlertProps) {
  const [phase, setPhase] = useState<"entering" | "visible" | "leaving">("entering");
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("visible"));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!autoDismissMs || autoDismissMs <= 0) return;
    const step = (50 / autoDismissMs) * 100;
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev - step;
        if (next <= 0) {
          clearInterval(timerRef.current!);
          handleDismiss();
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDismissMs]);

  function handleDismiss() {
    setPhase("leaving");
    setTimeout(() => onDismiss?.(), 300);
  }

  const c = CONFIG[variant];
  const transform = phase === "visible" ? "translateY(0) scale(1)" : getEnterTransform(position);
  const opacity   = phase === "visible" ? 1 : 0;

  const card = (
    <div
      role="alert"
      aria-live="assertive"
      aria-label={c.label}
      className={[
        "relative flex items-start gap-3 rounded-2xl px-4 py-3.5 overflow-hidden",
        "border shadow-md w-[340px] max-w-[calc(100vw-2rem)]",
        c.bg,
        c.border,
        className,
      ].join(" ")}
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        transform,
        opacity,
        transition:
          phase === "leaving"
            ? "transform 260ms ease-in, opacity 220ms ease-in"
            : "transform 360ms cubic-bezier(0.34,1.56,0.64,1), opacity 280ms ease",
        willChange: "transform, opacity",
      }}
    >
      <span
        className={[
          "mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl ring-1",
          c.badgeBg,
          c.badgeRing,
          c.iconColor,
        ].join(" ")}
      >
        {c.icon}
      </span>

      <div className="flex-1 min-w-0 pt-0.5">
        {title && (
          <p className={["text-[13px] font-semibold leading-tight mb-0.5", c.titleColor].join(" ")}>
            {title}
          </p>
        )}
        <p className={["text-[12.5px] leading-relaxed", c.msgColor].join(" ")}>{message}</p>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className={[
            "flex-shrink-0 mt-0.5 p-1 rounded-lg opacity-50 hover:opacity-100 transition-opacity focus:outline-none",
            c.closeColor,
          ].join(" ")}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      )}

      {autoDismissMs > 0 && (
        <div
          className={["absolute bottom-0 left-0 h-[2px]", c.progressBar].join(" ")}
          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
        />
      )}
    </div>
  );

  return (
    <div
      className={[
        "fixed z-[9999] flex flex-col pointer-events-none",
        POSITION_CLASSES[position],
      ].join(" ")}
    >
      <div className="pointer-events-auto">{card}</div>
    </div>
  );
}

export default Alert;