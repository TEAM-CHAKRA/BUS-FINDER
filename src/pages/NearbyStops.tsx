import React, { useState, useMemo } from 'react';
import { Search, Navigation, Info } from 'lucide-react';
import { MiniMap } from '../components/MiniMap';
import { MOCK_NEARBY_STOPS, NearbyStop } from '../data/mockData';
import styles from './NearbyStops.module.css';

export const NearbyStops: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStopId, setSelectedStopId] = useState<string>('stop-1');
  const [expandedStopId, setExpandedStopId] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const handleUseMyLocation = () => {
    setLocationStatus('Locating nearby stops using browser GPS coordinates...');
    setTimeout(() => {
      setLocationStatus('Found 5 stops within 1 km of your current position.');
      setSelectedStopId('stop-1');
    }, 600);
  };

  const filteredStops = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_NEARBY_STOPS;
    const q = searchQuery.toLowerCase();
    return MOCK_NEARBY_STOPS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.availableRoutes.some((r) => r.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const mapStops = useMemo(() => {
    return MOCK_NEARBY_STOPS.map((s) => ({
      id: s.id,
      name: s.name,
      x: s.coordinates.x,
      y: s.coordinates.y,
      isSelected: s.id === selectedStopId
    }));
  }, [selectedStopId]);

  return (
    <div className={styles.nearbyStopsPage}>
      <div className={styles.container}>
        {/* Top Location Controls */}
        <div className={styles.topControls}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Location search"
              className={styles.locationInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={styles.useLocationBtn}
            onClick={handleUseMyLocation}
          >
            <Navigation size={16} />
            <span>Use My Location</span>
          </button>
        </div>

        {locationStatus && (
          <div
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#E6F7F5',
              border: '1px solid #99E6DC',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              color: '#065F46',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Info size={16} />
            <span>{locationStatus}</span>
          </div>
        )}

        {/* Split Layout: Map on left, Stops on right */}
        <div className={styles.splitLayout}>
          {/* Map Area */}
          <div className={styles.mapPanel}>
            <MiniMap
              stops={mapStops}
              selectedStopId={selectedStopId}
              onSelectStop={(id) => setSelectedStopId(id)}
              showControls={true}
              height="100%"
            />
          </div>

          {/* Nearby Stops List */}
          <div className={styles.stopsPanel}>
            <h1 className={styles.panelTitle}>Nearby Stops</h1>

            {filteredStops.map((stop: NearbyStop) => {
              const isSelected = selectedStopId === stop.id;
              const isExpanded = expandedStopId === stop.id;

              return (
                <article
                  key={stop.id}
                  className={`${styles.stopCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedStopId(stop.id)}
                >
                  <div className={styles.stopCardHeader}>
                    <h2 className={styles.stopName}>{stop.name}</h2>
                    <span className={styles.stopDistance}>{stop.distanceText}</span>
                  </div>

                  {/* Route Numbers Pills */}
                  <div className={styles.routesPillsList}>
                    {stop.availableRoutes.map((route) => (
                      <span key={route} className={styles.routeBadge}>
                        {route}
                      </span>
                    ))}
                  </div>

                  {/* Upcoming departure */}
                  <div className={styles.nextDeparturesText}>
                    {stop.nextDepartures}
                  </div>

                  {/* View Details action */}
                  <button
                    type="button"
                    className={styles.viewDetailsBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedStopId(isExpanded ? null : stop.id);
                    }}
                  >
                    {isExpanded ? 'Hide Stop Details' : 'View Stop Details'}
                  </button>

                  {/* Expanded Stop Schedule Drawer */}
                  {isExpanded && (
                    <div className={styles.stopDetailsDrawer}>
                      <strong>Upcoming departures at this stop:</strong>
                      <div>• Route {stop.availableRoutes[0]}: in 4 mins (Platform 1)</div>
                      <div>• Route {stop.availableRoutes[1] || '104'}: in 9 mins (Platform 2)</div>
                      <div>• Accessibility: Step-free curb access, digital shelter display</div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
