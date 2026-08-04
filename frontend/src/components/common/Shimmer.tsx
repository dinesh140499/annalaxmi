const Shimmer = ({ className = "" }: { className?: string }) => (
  <>
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 400% 100%;
        animation: shimmer 1.4s ease-in-out infinite;
        border-radius: 6px;
      }
    `}</style>
    <div className={`shimmer ${className}`} />
  </>
);

export default Shimmer;