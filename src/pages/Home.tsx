import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Radio, MapPin, Calendar, ArrowRightLeft, Search, Bus } from 'lucide-react';
import { MiniMap } from '../components/MiniMap';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('Central Station');
  const [toLocation, setToLocation] = useState('University');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      `/find-routes?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(
        toLocation
      )}&date=${encodeURIComponent(travelDate)}`
    );
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Left Column: Heading + Shortcuts */}
          <div className={styles.heroLeft}>
            <h1 className={styles.headline}>
              Find Your Bus.<br />
              Plan Your Journey.
            </h1>
            <p className={styles.subtext}>
              Check bus routes, find nearby stops, and plan your next trip with ease.
            </p>

            {/* Shortcuts Section */}
            <div className={styles.shortcutsSection}>
              <h2 className={styles.sectionTitle}>Shortcuts</h2>
              <div className={styles.shortcutsGrid}>
                {/* Shortcut 1: Live Tracking */}
                <Link to="/live-tracking" className={styles.shortcutCard}>
                  <div className={styles.shortcutIcon}>
                    <Radio size={22} />
                  </div>
                  <span className={styles.shortcutLabel}>Live Tracking</span>
                </Link>

                {/* Shortcut 2: Nearby Stops */}
                <Link to="/nearby-stops" className={styles.shortcutCard}>
                  <div className={styles.shortcutIcon}>
                    <MapPin size={22} />
                  </div>
                  <span className={styles.shortcutLabel}>Nearby Stops</span>
                </Link>

                {/* Shortcut 3: Timetable */}
                <Link to="/timetable" className={styles.shortcutCard}>
                  <div className={styles.shortcutIcon}>
                    <Calendar size={22} />
                  </div>
                  <span className={styles.shortcutLabel}>Timetable</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Plan Journey Form + Frequent Routes */}
          <div className={styles.heroRight}>
            <div className={styles.planCard}>
              <h2 className={styles.planCardTitle}>Plan Journey</h2>
              <form className={styles.planForm} onSubmit={handleSearch}>
                {/* From Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="home-from" className={styles.inputLabel}>
                    From
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="home-from"
                      type="text"
                      className={styles.inputField}
                      placeholder="Origin stop or station"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.swapBtn}
                      onClick={handleSwap}
                      title="Swap From and To"
                      aria-label="Swap departure and arrival locations"
                    >
                      <ArrowRightLeft size={14} />
                    </button>
                  </div>
                </div>

                {/* To Field */}
                <div className={styles.inputGroup}>
                  <label htmlFor="home-to" className={styles.inputLabel}>
                    To
                  </label>
                  <input
                    id="home-to"
                    type="text"
                    className={styles.inputField}
                    placeholder="Destination stop or landmark"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Travel Date */}
                <div className={styles.inputGroup}>
                  <label htmlFor="home-date" className={styles.inputLabel}>
                    Travel Date
                  </label>
                  <input
                    id="home-date"
                    type="date"
                    className={styles.dateInput}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>

                {/* Submit CTA */}
                <button type="submit" className={styles.searchSubmitBtn}>
                  <Search size={18} />
                  <span>Search Buses</span>
                </button>
              </form>
            </div>

            {/* Frequent Routes Section */}
            <div className={styles.frequentSection}>
              <h2 className={styles.sectionTitle}>Frequent Routes</h2>
              <div className={styles.mapPreviewWrapper}>
                <MiniMap showControls={false} />
              </div>
              <div className={styles.routesPills}>
                <Link to="/find-routes?route=42B" className={styles.routePill}>
                  <Bus size={14} color="#00BFA5" />
                  <span>Route 42B (Downtown)</span>
                </Link>
                <Link to="/find-routes?route=104" className={styles.routePill}>
                  <Bus size={14} color="#00BFA5" />
                  <span>Route 104 (Suburban)</span>
                </Link>
                <Link to="/find-routes?route=7" className={styles.routePill}>
                  <Bus size={14} color="#00BFA5" />
                  <span>Route 7 (Broadway)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
