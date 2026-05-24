const Loader = () => (
  <>
    <style>{`
      @keyframes loader-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes loader-pulse {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40%            { transform: scale(1);   opacity: 1;   }
      }
      .loader-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }
      .loader-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      .loader-ring {
        position: relative;
        width: 56px;
        height: 56px;
      }
      .loader-ring svg {
        width: 56px;
        height: 56px;
      }
      .loader-track {
        fill: none;
        stroke: #E6E6E6;
        stroke-width: 3;
      }
      .loader-arc {
        fill: none;
        stroke: #0F6E56;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 88 110;
        transform-origin: 28px 28px;
        animation: loader-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .loader-arc2 {
        fill: none;
        stroke: #9FE1CB;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 30 168;
        transform-origin: 28px 28px;
        animation: loader-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation-delay: -0.3s;
      }
      .loader-dots {
        display: flex;
        gap: 5px;
      }
      .loader-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #0F6E56;
        animation: loader-pulse 1.2s ease-in-out infinite;
      }
      .loader-dot:nth-child(2) {
        animation-delay: 0.2s;
        background: #1D9E75;
      }
      .loader-dot:nth-child(3) {
        animation-delay: 0.4s;
        background: #9FE1CB;
      }
      .loader-label {
        font-size: 13px;
        color: #808080;
        letter-spacing: 0.02em;
      }
    `}</style>

    <div className="loader-overlay">
      <div className="loader-inner">
        <div className="loader-ring">
          <svg viewBox="0 0 56 56">
            <circle className="loader-track" cx="28" cy="28" r="22" />
            <circle className="loader-arc2" cx="28" cy="28" r="22" />
            <circle className="loader-arc"  cx="28" cy="28" r="22" />
          </svg>
        </div>
        <div className="loader-dots">
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
        <span className="loader-label">Loading...</span>
      </div>
    </div>
  </>
);

export default Loader;