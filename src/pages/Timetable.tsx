import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MiniMap } from '../components/MiniMap';
import { MOCK_TIMETABLE_ENTRIES, TimetableEntry } from '../data/mockData';
import styles from './Timetable.module.css';

export const Timetable: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('42B');
  const [selectedStop, setSelectedStop] = useState('Central Station');
  const [selectedDate, setSelectedDate] = useState('Today');

  const [filteredEntries] = useState<TimetableEntry[]>(MOCK_TIMETABLE_ENTRIES);

  return (
    <div className={styles.timetablePage}>
      <div className={styles.container}>
        <div className={styles.mainLayout}>
          {/* Left Sidebar Controls */}
          <aside className={styles.sidebar}>
            <div className={styles.filterCard}>
              {/* Route Selector */}
              <div className={styles.controlRow}>
                <label htmlFor="tt-route" className={styles.controlLabel}>
                  Route
                </label>
                <select
                  id="tt-route"
                  className={styles.selectInput}
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                >
                  <option value="42B">42B</option>
                  <option value="104">104</option>
                  <option value="10B">10B</option>
                  <option value="7">7</option>
                </select>
              </div>

              {/* Stop Selector */}
              <div className={styles.controlRow}>
                <label htmlFor="tt-stop" className={styles.controlLabel}>
                  Stop
                </label>
                <select
                  id="tt-stop"
                  className={styles.selectInput}
                  value={selectedStop}
                  onChange={(e) => setSelectedStop(e.target.value)}
                >
                  <option value="Central Station">Central Station</option>
                  <option value="Central Plaza">Central Plaza</option>
                  <option value="Market St">Market St</option>
                  <option value="University">University</option>
                </select>
              </div>

              {/* Date Selector */}
              <div className={styles.controlRow}>
                <label htmlFor="tt-date" className={styles.controlLabel}>
                  Date
                </label>
                <select
                  id="tt-date"
                  className={styles.dateInput}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Next Weekday">Next Weekday</option>
                </select>
              </div>

              {/* Search button */}
              <button type="button" className={styles.searchBtn}>
                <Search size={16} />
                <span>Update Schedule</span>
              </button>
            </div>

            {/* Mini Map Preview */}
            <div className={styles.miniMapCard}>
              <MiniMap showControls={false} />
            </div>
          </aside>

          {/* Right Schedule Table */}
          <main className={styles.scheduleCard}>
            <div className={styles.scheduleHeader}>
              <h1 className={styles.scheduleTitle}>
                Route {selectedRoute} Schedule
              </h1>
              <span className={styles.legendNote}>
                Live tracking feeds refresh every 30s
              </span>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.timetable}>
                <thead>
                  <tr>
                    <th>Departure</th>
                    <th>Destination</th>
                    <th>Arrival</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((row) => (
                    <tr key={row.id}>
                      <td><strong>{row.departure}</strong></td>
                      <td>{row.destination}</td>
                      <td>{row.arrival}</td>
                      <td>
                        <span
                          className={
                            row.status.startsWith('On Time')
                              ? styles.statusOnTime
                              : styles.statusDelayed
                          }
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
