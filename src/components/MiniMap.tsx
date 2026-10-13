import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './MiniMap.module.css';

interface StopPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  isSelected?: boolean;
}

interface MiniMapProps {
  stops?: StopPoint[];
  selectedStopId?: string;
  onSelectStop?: (id: string) => void;
  showControls?: boolean;
  height?: string | number;
}

export const MiniMap: React.FC<MiniMapProps> = ({
  stops,
  selectedStopId,
  onSelectStop,
  showControls = true,
  height = '100%'
}) => {
  const [zoom, setZoom] = useState(1);

  // Default points matching the light map reference
  const defaultStops: StopPoint[] = [
    { id: 'stop-1', name: 'Central Plaza - Stop A', x: 440, y: 160 },
    { id: 'stop-2', name: 'Market St - Stop B', x: 550, y: 220 },
    { id: 'stop-3', name: 'Central Plaza - Stop B', x: 470, y: 190 },
    { id: 'stop-4', name: 'Mid-dartla Station', x: 590, y: 140 },
    { id: 'stop-5', name: 'West End Terminal', x: 360, y: 280 }
  ];

  const activeStops = stops && stops.length > 0 ? stops : defaultStops;

  return (
    <div className={styles.miniMapContainer} style={{ height }}>
      {showControls && (
        <div className={styles.zoomButtons}>
          <button
            type="button"
            className={styles.zoomBtn}
            onClick={() => setZoom((prev) => Math.min(prev + 0.15, 1.6))}
            title="Zoom In"
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            className={styles.zoomBtn}
            onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.8))}
            title="Zoom Out"
          >
            <Minus size={14} />
          </button>
        </div>
      )}

      <svg
        viewBox="0 0 700 400"
        className={styles.miniMapSvg}
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        {/* Background land */}
        <rect width="700" height="400" fill="#E8F1EC" />

        {/* Parks and green areas */}
        <path
          d="M 50,40 C 90,30 160,80 140,140 C 120,200 40,160 30,100 Z"
          fill="#D6EBDD"
        />
        <path
          d="M 540,80 C 580,70 630,90 640,130 C 650,170 590,190 550,170 C 520,150 520,100 540,80 Z"
          fill="#D6EBDD"
        />
        <text x="585" y="135" fill="#4B7763" fontSize="10" fontWeight="600" textAnchor="middle">
          Mid-dartla
        </text>

        {/* Diagonal road network */}
        <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="50" y1="380" x2="680" y2="40" />
          <line x1="120" y1="400" x2="700" y2="120" />
          <line x1="20" y1="260" x2="520" y2="0" />
          <line x1="180" y1="400" x2="650" y2="180" strokeWidth="6" />

          {/* Cross avenues */}
          <line x1="140" y1="60" x2="480" y2="390" strokeWidth="7" />
          <line x1="260" y1="20" x2="620" y2="380" strokeWidth="9" />
          <line x1="390" y1="20" x2="700" y2="320" strokeWidth="7" />
          <line x1="0" y1="120" x2="320" y2="400" strokeWidth="6" />
        </g>

        {/* Inner thin road lines */}
        <g stroke="#D1DDD6" strokeWidth="3" strokeLinecap="round">
          <line x1="50" y1="380" x2="680" y2="40" />
          <line x1="120" y1="400" x2="700" y2="120" />
          <line x1="260" y1="20" x2="620" y2="380" />
        </g>

        {/* Central Plaza Label */}
        <text x="440" y="145" fill="#64748B" fontSize="11" fontWeight="600" textAnchor="middle">
          Central Plaza
        </text>

        {/* Route Line Accent */}
        <path
          d="M 260,260 L 440,160 L 550,220 L 620,180"
          stroke="#00BFA5"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* User Location Pulse Circle */}
        <g transform="translate(480, 240)">
          <circle cx="0" cy="0" r="12" fill="#3B82F6" opacity="0.3" />
          <circle cx="0" cy="0" r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Stops Pins */}
        {activeStops.map((stop) => {
          const isSelected = selectedStopId === stop.id;
          return (
            <g
              key={stop.id}
              transform={`translate(${stop.x}, ${stop.y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectStop && onSelectStop(stop.id)}
            >
              {isSelected && (
                <circle cx="0" cy="0" r="14" fill="#00BFA5" opacity="0.4" />
              )}
              {/* Bus Stop circle pin with dark blue background matching reference */}
              <circle
                cx="0"
                cy="0"
                r="8"
                fill={isSelected ? '#00BFA5' : '#1E293B'}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3"
                fill="#FFFFFF"
                fontSize="7"
                fontWeight="700"
                textAnchor="middle"
              >
                🚏
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.attribution}>Map preview • Phase 1 prototype</div>
    </div>
  );
};
