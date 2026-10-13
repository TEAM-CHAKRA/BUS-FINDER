import React, { useState } from 'react';
import { Search, LocateFixed, Plus, Minus } from 'lucide-react';
import { LiveBus } from '../data/mockData';
import styles from './LiveTrackingMap.module.css';

interface LiveTrackingMapProps {
  selectedBus: LiveBus;
  onSelectBus: (busId: string) => void;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({
  selectedBus,
  onSelectBus
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchOverlayText, setSearchOverlayText] = useState('');
  const [showCallout, setShowCallout] = useState(true);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.7));
  const handleRecenter = () => {
    setZoomLevel(1);
    setShowCallout(true);
  };

  return (
    <div className={styles.mapContainer}>
      {/* Top Overlay Controls */}
      <div className={styles.topOverlay}>
        <div className={styles.searchOverlay}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            placeholder="Search overlay"
            className={styles.searchOverlayInput}
            value={searchOverlayText}
            onChange={(e) => setSearchOverlayText(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.overlayActionBtn}
          title="Search area"
          onClick={() => {}}
        >
          <Search size={18} />
        </button>
        <button
          type="button"
          className={styles.overlayActionBtn}
          title="Recenter Map"
          onClick={handleRecenter}
        >
          <LocateFixed size={18} />
        </button>
      </div>

      {/* Zoom in / out controls */}
      <div className={styles.zoomControls}>
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 1000 700"
        className={styles.mapSvg}
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Subtle pulse animation for active buses */}
          <style>{`
            @keyframes pulseRing {
              0% { r: 16px; opacity: 0.8; }
              50% { r: 26px; opacity: 0.2; }
              100% { r: 16px; opacity: 0.8; }
            }
            .pulsing-ring {
              animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>

          <pattern id="city-blocks" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#587c72" />
            <rect x="2" y="2" width="36" height="36" fill="#64887e" rx="2" />
          </pattern>
        </defs>

        {/* Base Map Terrain */}
        <rect width="1000" height="700" fill="#5c8177" />

        {/* City Blocks Patterned Districts */}
        <rect x="20" y="20" width="300" height="660" fill="url(#city-blocks)" opacity="0.6" />
        <rect x="340" y="20" width="640" height="660" fill="url(#city-blocks)" opacity="0.75" />

        {/* Parks and Green Reserves */}
        <path
          d="M 520,380 C 530,350 560,350 570,380 C 580,410 560,450 520,440 Z"
          fill="#446b5e"
        />
        <rect x="560" y="100" width="30" height="35" rx="3" fill="#446b5e" />
        <rect x="410" y="380" width="25" height="30" rx="3" fill="#446b5e" />
        <path
          d="M 380,680 C 390,620 440,640 460,700 Z"
          fill="#446b5e"
        />
        <path
          d="M 870,550 C 890,520 950,560 980,620 L 1000,700 L 860,700 Z"
          fill="#446b5e"
        />

        {/* River / Water Canal */}
        <path
          d="M 280,380 C 310,400 300,430 320,450 C 300,500 290,540 280,600 C 270,640 330,680 340,700"
          stroke="#41616c"
          strokeWidth="32"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 960,400 C 940,480 970,560 960,700"
          stroke="#41616c"
          strokeWidth="48"
          fill="none"
        />

        {/* Major Road Arterials */}
        <g stroke="#7ea499" strokeWidth="6" fill="none">
          {/* Horizontal Streets */}
          <line x1="300" y1="90" x2="1000" y2="90" />
          <line x1="280" y1="180" x2="1000" y2="180" />
          <line x1="0" y1="260" x2="1000" y2="260" />
          <line x1="320" y1="360" x2="1000" y2="360" />
          <line x1="0" y1="470" x2="1000" y2="470" />
          <line x1="320" y1="560" x2="1000" y2="560" />
          <line x1="0" y1="650" x2="1000" y2="650" />

          {/* Vertical Avenues */}
          <line x1="320" y1="0" x2="320" y2="700" />
          <line x1="370" y1="0" x2="370" y2="700" />
          <line x1="440" y1="0" x2="440" y2="700" strokeWidth="8" />
          <line x1="500" y1="0" x2="500" y2="700" />
          <line x1="580" y1="0" x2="580" y2="700" />
          <line x1="640" y1="0" x2="640" y2="700" />
          <line x1="710" y1="0" x2="710" y2="700" strokeWidth="8" />
          <line x1="780" y1="0" x2="780" y2="700" />
          <line x1="860" y1="0" x2="860" y2="700" />
        </g>

        {/* Diagonal Expressway & Bridges */}
        <path
          d="M 680,680 C 740,650 820,530 830,420 C 840,320 800,220 880,100"
          stroke="#425862"
          strokeWidth="10"
          fill="none"
        />

        {/* Teal Route Path (Line matching reference image) */}
        <path
          d="M 515,595 C 500,560 450,560 450,590 C 450,630 435,650 380,645 L 375,470 L 440,470 L 440,215 L 650,180 L 685,180 L 705,360 L 520,560"
          stroke="#00E5C9"
          strokeWidth="5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Secondary Route Path towards upper right */}
        <path
          d="M 705,360 L 890,130"
          stroke="#00E5C9"
          strokeWidth="4"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Bus Stops along route */}
        <g fill="#0F172A">
          {/* Stop 1 */}
          <rect x="645" y="170" width="12" height="12" rx="3" />
          <text x="651" y="179" fill="#FFF" fontSize="8" textAnchor="middle">🚏</text>

          {/* Stop 2 */}
          <rect x="686" y="270" width="12" height="12" rx="3" />
          <text x="692" y="279" fill="#FFF" fontSize="8" textAnchor="middle">🚏</text>

          {/* Stop 3 (Central Plaza) */}
          <rect x="686" y="390" width="12" height="12" rx="3" />
          <text x="692" y="399" fill="#FFF" fontSize="8" textAnchor="middle">🚏</text>

          {/* Stop 4 */}
          <rect x="590" y="525" width="12" height="12" rx="3" />
          <text x="596" y="534" fill="#FFF" fontSize="8" textAnchor="middle">🚏</text>

          {/* Additional Stop Pins around the city */}
          <rect x="758" y="140" width="12" height="12" rx="3" />
          <rect x="822" y="130" width="12" height="12" rx="3" />
          <rect x="765" y="225" width="12" height="12" rx="3" />
          <rect x="797" y="220" width="12" height="12" rx="3" />
          <rect x="797" y="240" width="12" height="12" rx="3" />
          <rect x="403" y="510" width="12" height="12" rx="3" />
        </g>

        {/* "You are here" User Location Marker */}
        <g transform="translate(520, 430)">
          <circle cx="0" cy="0" r="14" fill="#3B82F6" opacity="0.3" />
          <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          <rect x="20" y="-12" width="82" height="24" rx="12" fill="#0F172A" opacity="0.85" />
          <text x="61" y="4" fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle">You are here</text>
        </g>

        {/* Bus 10B Marker (Lower Left) */}
        <g
          transform="translate(386, 528)"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectBus('bus-10b')}
        >
          <circle cx="0" cy="0" r="22" fill="#F59E0B" opacity="0.25" className="pulsing-ring" />
          <circle cx="0" cy="0" r="15" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">10B</text>
        </g>

        {/* Bus 10B Marker (Upper Right) */}
        <g
          transform="translate(838, 200)"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectBus('bus-10b')}
        >
          <circle cx="0" cy="0" r="20" fill="#F59E0B" opacity="0.25" />
          <circle cx="0" cy="0" r="14" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">10B</text>
        </g>

        {/* Bus 42 Marker (Top Loop) */}
        <g
          transform="translate(690, 172)"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectBus('bus-42')}
        >
          <circle cx="0" cy="0" r="20" fill="#00BFA5" opacity="0.25" />
          <circle cx="0" cy="0" r="15" fill="#00BFA5" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="4" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">42 →</text>
        </g>

        {/* Bus 42 Marker (Active at Central Plaza) */}
        <g
          transform="translate(690, 375)"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onSelectBus('bus-42');
            setShowCallout(!showCallout);
          }}
        >
          {/* Pulsing ring */}
          <circle cx="0" cy="0" r="24" fill="#00BFA5" opacity="0.3" className="pulsing-ring" />
          <circle cx="0" cy="0" r="16" fill="#00BFA5" stroke="#FFFFFF" strokeWidth="2.5" />
          <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="800" textAnchor="middle">42</text>
        </g>

        {/* Callout Bubble */}
        {showCallout && (
          <g
            transform={`translate(${selectedBus.coordinates.x - 5}, ${selectedBus.coordinates.y - 50})`}
            className={styles.calloutWrapper}
            onClick={() => setShowCallout(false)}
          >
            {/* Callout Box */}
            <rect
              x="-115"
              y="-32"
              width="240"
              height="34"
              rx="6"
              fill="#FFFFFF"
              filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.25))"
            />
            {/* Pointer arrow down */}
            <polygon points="-5,2 0,9 5,2" fill="#FFFFFF" />
            <text
              x="5"
              y="-10"
              fill="#0F172A"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
            >
              Bus {selectedBus.routeNumber}: Next Stop - {selectedBus.currentStop} | {selectedBus.eta}
            </text>
          </g>
        )}
      </svg>

      {/* Map Legend (Bottom Right) */}
      <div className={styles.legendCard}>
        <div className={styles.legendItem}>
          <span className={styles.legendDotLive} />
          <span>Live Bus</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDotStop} />
          <span>Stop</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendLineRoute} />
          <span>Route Path</span>
        </div>
      </div>

      {/* Visual Prototype Notice */}
      <div className={styles.prototypeNotice}>
        Visual Prototype Map • Live GPS Ingestion Planned for Phase 2
      </div>
    </div>
  );
};
