import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  LayoutGrid,
  Bus,
  Car,
  Clock,
  Star
} from 'lucide-react';
import { MOCK_LIVE_BUSES, LiveBus } from '../data/mockData';
import { LiveTrackingMap } from '../components/LiveTrackingMap';
import styles from './LiveTracking.module.css';

export const LiveTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const busParam = searchParams.get('bus');

  const initialBus =
    MOCK_LIVE_BUSES.find(
      (b) =>
        b.routeNumber === busParam ||
        b.routeName.toLowerCase().includes((busParam || '').toLowerCase())
    ) || MOCK_LIVE_BUSES[0];

  const [selectedBus, setSelectedBus] = useState<LiveBus>(initialBus);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeRail, setActiveRail] = useState<'grid' | 'bus' | 'car' | 'clock'>('grid');

  const handleSelectBus = (busId: string) => {
    const bus = MOCK_LIVE_BUSES.find((b) => b.id === busId);
    if (bus) {
      setSelectedBus(bus);
    }
  };

  const filteredBuses = MOCK_LIVE_BUSES.filter(
    (b) =>
      b.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.routeNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.liveTrackingPage}>
      {/* 1. Left-most Navigation Rail */}
      <aside className={styles.navRail}>
        <button
          type="button"
          className={`${styles.railItem} ${activeRail === 'grid' ? styles.active : ''}`}
          onClick={() => setActiveRail('grid')}
          title="Dashboard"
        >
          <LayoutGrid size={20} />
        </button>
        <button
          type="button"
          className={`${styles.railItem} ${activeRail === 'bus' ? styles.active : ''}`}
          onClick={() => setActiveRail('bus')}
          title="Buses"
        >
          <Bus size={20} />
        </button>
        <button
          type="button"
          className={`${styles.railItem} ${activeRail === 'car' ? styles.active : ''}`}
          onClick={() => setActiveRail('car')}
          title="Transit Lines"
        >
          <Car size={20} />
        </button>
        <button
          type="button"
          className={`${styles.railItem} ${activeRail === 'clock' ? styles.active : ''}`}
          onClick={() => setActiveRail('clock')}
          title="Schedules"
        >
          <Clock size={20} />
        </button>
      </aside>

      {/* 2. Left Bus Information Panel */}
      <aside className={styles.infoPanel}>
        <div className={styles.panelHeader}>
          <h1 className={styles.panelTitle}>Live Tracking</h1>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Enter bus number or route..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.scrollableList}>
          {/* Active Bus Card */}
          <article className={styles.activeBusCard}>
            <div className={styles.busHeader}>
              <div className={styles.busIconBox}>
                <Bus size={20} />
              </div>
              <div className={styles.busTitleBlock}>
                <h2 className={styles.busName}>{selectedBus.routeName}</h2>
                <span
                  className={
                    selectedBus.isOnTime
                      ? styles.statusPillOnTime
                      : styles.statusPillDelayed
                  }
                >
                  {selectedBus.status}
                </span>
              </div>
            </div>

            {/* Vertical Stop Timeline */}
            <div className={styles.timeline}>
              {selectedBus.stops.map((stop, index) => {
                const isLast = index === selectedBus.stops.length - 1;
                return (
                  <div key={stop.name} className={styles.timelineItem}>
                    {/* Line Connector */}
                    {!isLast && (
                      <div
                        className={
                          stop.status === 'upcoming'
                            ? styles.timelineLineDotted
                            : styles.timelineLine
                        }
                      />
                    )}

                    {/* Dot Indicator */}
                    {stop.status === 'departed' && (
                      <div className={styles.timelineDotDeparted} />
                    )}
                    {stop.status === 'current' && (
                      <div className={styles.timelineDotCurrent} />
                    )}
                    {stop.status === 'upcoming' && (
                      <div className={styles.timelineDotUpcoming} />
                    )}

                    {/* Stop Details */}
                    <div className={styles.timelineContent}>
                      <div>
                        <div className={styles.stopTitle}>{stop.name}</div>
                        {stop.busyLevel && (
                          <div className={styles.stopSubtext}>
                            📶 {stop.busyLevel}
                          </div>
                        )}
                        {stop.status === 'current' && (
                          <div className={styles.stopSubtext}>Current stop</div>
                        )}
                      </div>

                      {stop.status === 'departed' && (
                        <div className={styles.stopBadge}>Departed</div>
                      )}
                      {stop.status === 'current' && (
                        <div className={styles.stopBadge}>
                          <div>{stop.timeInfo || '5 mins'}</div>
                          <div style={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                            {stop.distanceInfo || '0.8 miles'}
                          </div>
                        </div>
                      )}
                      {stop.status === 'upcoming' && (
                        <div className={styles.stopBadge}>Upcoming</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card Meta */}
            <div className={styles.metaBlock}>
              <div>
                Occupancy:{' '}
                <span className={styles.occupancyText}>
                  {selectedBus.occupancy}
                </span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                Last updated: {selectedBus.lastUpdated}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.cardActions}>
              <Link to="/timetable" className={styles.scheduleBtn}>
                View Full Schedule
              </Link>
              <button
                type="button"
                className={`${styles.favBtn} ${isFavorited ? styles.favorited : ''}`}
                onClick={() => setIsFavorited(!isFavorited)}
                title="Save route"
              >
                <Star size={18} fill={isFavorited ? '#F59E0B' : 'none'} />
              </button>
            </div>
          </article>

          {/* Other Buses List */}
          {filteredBuses
            .filter((b) => b.id !== selectedBus.id)
            .map((bus) => (
              <div
                key={bus.id}
                className={styles.busListItem}
                onClick={() => setSelectedBus(bus)}
              >
                <div className={styles.busListItemTitle}>
                  <Bus size={16} color="#64748B" />
                  <span>{bus.routeName}</span>
                </div>
                <span
                  className={
                    bus.isOnTime
                      ? styles.busBadgeOnTime
                      : styles.busBadgeDelayed
                  }
                >
                  {bus.status}
                </span>
              </div>
            ))}
        </div>
      </aside>

      {/* 3. Main Map Area */}
      <main className={styles.mapArea}>
        <LiveTrackingMap
          selectedBus={selectedBus}
          onSelectBus={handleSelectBus}
        />
      </main>
    </div>
  );
};
