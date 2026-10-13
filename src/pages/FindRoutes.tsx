import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { MOCK_JOURNEYS, JourneyRoute } from '../data/mockData';
import styles from './FindRoutes.module.css';

export const FindRoutes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fromInput, setFromInput] = useState(searchParams.get('from') || 'Central Station');
  const [toInput, setToInput] = useState(searchParams.get('to') || 'University');
  const [dateInput, setDateInput] = useState(
    searchParams.get('date') || new Date().toISOString().split('T')[0]
  );
  const [durationFilter, setDurationFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState<string[]>(['07:00 AM']);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  // Time slots matching design
  const timeSlots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '12:00 PM'];
  const routeTypes = ['Express', 'Commuter', 'Other'];

  const handleTimeToggle = (slot: string) => {
    setTimeFilter((prev) =>
      prev.includes(slot) ? prev.filter((t) => t !== slot) : [...prev, slot]
    );
  };

  const handleTypeToggle = (type: string) => {
    setTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      from: fromInput,
      to: toInput,
      date: dateInput
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedRouteId((prev) => (prev === id ? null : id));
  };

  const filteredJourneys = useMemo(() => {
    return MOCK_JOURNEYS.filter((journey) => {
      // Filter by keyword
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matchesQuery =
          journey.routeNumber.toLowerCase().includes(query) ||
          journey.routeName.toLowerCase().includes(query) ||
          journey.serviceType.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Filter by Route Type
      if (typeFilter.length > 0 && !typeFilter.includes(journey.serviceType)) {
        return false;
      }

      // Duration filter
      if (durationFilter === '<25') {
        const mins = parseInt(journey.duration.replace('m', ''), 10);
        if (mins >= 25) return false;
      } else if (durationFilter === '<30') {
        const mins = parseInt(journey.duration.replace('m', ''), 10);
        if (mins >= 30) return false;
      }

      return true;
    });
  }, [keyword, typeFilter, durationFilter]);

  return (
    <div className={styles.findRoutesPage}>
      <div className={styles.container}>
        {/* Top Journey Search Form Bar */}
        <div className={styles.searchBarCard}>
          <form className={styles.searchBarForm} onSubmit={handleSearchSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="routes-from" className={styles.inputLabel}>
                From
              </label>
              <input
                id="routes-from"
                type="text"
                className={styles.inputField}
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                placeholder="Origin"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="routes-to" className={styles.inputLabel}>
                To
              </label>
              <input
                id="routes-to"
                type="text"
                className={styles.inputField}
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                placeholder="Destination"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="routes-date" className={styles.inputLabel}>
                Travel Date
              </label>
              <input
                id="routes-date"
                type="date"
                className={styles.inputField}
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="routes-duration" className={styles.inputLabel}>
                Max Duration
              </label>
              <select
                id="routes-duration"
                className={styles.selectField}
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                <option value="all">Any duration</option>
                <option value="<25">Under 25 mins</option>
                <option value="<30">Under 30 mins</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Main Content Layout */}
        <div className={styles.mainLayout}>
          {/* Left Sidebar Filter Column */}
          <aside className={styles.sidebarFilter}>
            <h1 className={styles.pageHeading}>Available Journeys</h1>

            {/* Times Filter */}
            <div className={styles.filterSection}>
              <span className={styles.filterTitle}>Times</span>
              <div className={styles.checkboxList}>
                {timeSlots.map((slot) => (
                  <label key={slot} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={timeFilter.includes(slot)}
                      onChange={() => handleTimeToggle(slot)}
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Routes Filter */}
            <div className={styles.filterSection}>
              <span className={styles.filterTitle}>Routes</span>
              <div className={styles.checkboxList}>
                {routeTypes.map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Keyword Search in Sidebar */}
            <div className={styles.sidebarSearch}>
              <Search size={16} className={styles.sidebarSearchIcon} />
              <input
                type="text"
                placeholder="Search"
                className={styles.sidebarSearchInput}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </aside>

          {/* Right Main Results Grid */}
          <main>
            {filteredJourneys.length === 0 ? (
              <div className={styles.emptyState}>
                <Clock size={36} color="#94A3B8" style={{ marginBottom: '1rem' }} />
                <h3>No journeys found</h3>
                <p>Try adjusting your search criteria or resetting the filters.</p>
              </div>
            ) : (
              <div className={styles.resultsGrid}>
                {filteredJourneys.map((journey: JourneyRoute) => {
                  const isExpanded = expandedRouteId === journey.id;
                  return (
                    <article key={journey.id} className={styles.journeyCard}>
                      <div className={styles.cardHeader}>
                        <span className={styles.routeNumber}>{journey.routeNumber}</span>
                        <span className={styles.durationBadge}>{journey.duration}</span>
                      </div>

                      <div className={styles.serviceType}>
                        {journey.serviceType}
                      </div>

                      <div className={styles.cardMetaRow}>
                        <span className={styles.timesText}>
                          {journey.departureTime} - {journey.arrivalTime}
                        </span>
                        <span
                          className={
                            journey.status === 'On Time'
                              ? styles.statusOnTime
                              : styles.statusDelayed
                          }
                        >
                          {journey.status === 'On Time'
                            ? 'On Time'
                            : `Delayed ${journey.delayMinutes || 4}m`}
                        </span>
                      </div>

                      <div className={styles.stopsCount}>
                        {journey.stopsCount} intermediate stops • Direct route
                      </div>

                      {/* Expandable stops details */}
                      {isExpanded && (
                        <div className={styles.expandedStops}>
                          <strong>Stop sequence:</strong>
                          <div>1. Central Station (Departs {journey.departureTime})</div>
                          <div>2. City Market (+7m)</div>
                          <div>3. Central Plaza (+14m)</div>
                          <div>4. University Campus (Arrives {journey.arrivalTime})</div>
                        </div>
                      )}

                      <div className={styles.cardActions}>
                        <Link
                          to={`/live-tracking?bus=${encodeURIComponent(journey.routeNumber)}`}
                          className={styles.trackBusActionBtn}
                        >
                          Track Bus
                        </Link>
                        <button
                          type="button"
                          className={styles.viewRouteActionBtn}
                          onClick={() => toggleExpand(journey.id)}
                        >
                          {isExpanded ? (
                            <>
                              Hide <ChevronUp size={14} style={{ display: 'inline' }} />
                            </>
                          ) : (
                            <>
                              View <ChevronDown size={14} style={{ display: 'inline' }} />
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
