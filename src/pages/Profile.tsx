import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp, Bell, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import { MOCK_USER_PROFILE } from '../data/mockData';
import styles from './Profile.module.css';

export const Profile: React.FC = () => {
  const [profile] = useState(MOCK_USER_PROFILE);
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>('42B');
  const [notifications, setNotifications] = useState(profile.notificationPreferences);
  const [message, setMessage] = useState<string | null>(null);

  const toggleRoute = (id: string) => {
    setExpandedRouteId((prev) => (prev === id ? null : id));
  };

  const handleTogglePref = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setMessage(`Updated ${key} preference successfully.`);
      setTimeout(() => setMessage(null), 2500);
      return next;
    });
  };

  const handleSignOut = () => {
    setMessage('Sign out requested. (Frontend-only prototype)');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEditProfile = () => {
    setMessage('Edit Profile modal placeholder.');
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        {/* User Welcome Banner Card */}
        <section className={styles.userHeaderCard}>
          <div className={styles.userInfo}>
            <div className={styles.avatarCircle}>
              <User size={32} />
            </div>
            <div>
              <span className={styles.welcomeText}>Welcome back,</span>
              <h1 className={styles.userName}>{profile.name}</h1>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.editBtn}
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              type="button"
              className={styles.signOutBtn}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </section>

        {/* Feedback message banner if any action is triggered */}
        {message && (
          <div className={styles.disclaimerNotice}>
            <CheckCircle2 size={16} />
            <span>{message}</span>
          </div>
        )}

        {/* 3-Column Dashboard Grid */}
        <div className={styles.dashboardGrid}>
          {/* Column 1: Favourite Routes & Saved Bus Stops */}
          <div className={styles.column}>
            <div className={styles.dashboardCard}>
              <h2 className={styles.cardTitle}>Favourite Routes</h2>
              {profile.favouriteRoutes.map((route) => {
                const isOpen = expandedRouteId === route.id;
                return (
                  <div key={route.id} className={styles.favouriteItem}>
                    <button
                      type="button"
                      className={styles.favouriteItemHeader}
                      onClick={() => toggleRoute(route.id)}
                    >
                      <span>{route.name}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <div className={styles.favouriteItemBody}>
                        {route.details}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.dashboardCard}>
              <h2 className={styles.cardTitle}>Saved Bus Stops</h2>
              {profile.savedStops.slice(0, 1).map((stop) => (
                <div key={stop} className={styles.savedStopItem}>
                  <span>{stop}</span>
                  <button type="button" title="Remove stop" style={{ color: '#94A3B8' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Additional Saved Bus Stops & Recent Searches */}
          <div className={styles.column}>
            <div className={styles.dashboardCard}>
              <h2 className={styles.cardTitle}>Saved Bus Stops</h2>
              {profile.savedStops.slice(0, 1).map((stop) => (
                <div key={stop} className={styles.savedStopItem}>
                  <span>{stop}</span>
                </div>
              ))}
            </div>

            <div className={styles.dashboardCard}>
              <h2 className={styles.cardTitle}>Recent Searches</h2>
              {profile.recentSearches.map((search) => (
                <div key={search} className={styles.recentSearchItem}>
                  <Clock size={14} color="#64748B" />
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Notification Preferences */}
          <div className={styles.column}>
            <div className={styles.dashboardCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="#00BFA5" />
                <h2 className={styles.cardTitle}>Notification Preferences</h2>
              </div>

              <div className={styles.preferenceItem}>
                <span className={styles.preferenceLabel}>Arrival Alerts</span>
                <button
                  type="button"
                  className={`${styles.toggleSwitch} ${
                    notifications.arrivalAlerts ? styles.active : ''
                  }`}
                  onClick={() => handleTogglePref('arrivalAlerts')}
                  aria-label="Toggle Arrival Alerts"
                >
                  <span className={styles.toggleKnob} />
                </button>
              </div>

              <div className={styles.preferenceItem}>
                <span className={styles.preferenceLabel}>Delay Notifications</span>
                <button
                  type="button"
                  className={`${styles.toggleSwitch} ${
                    notifications.delayNotifications ? styles.active : ''
                  }`}
                  onClick={() => handleTogglePref('delayNotifications')}
                  aria-label="Toggle Delay Notifications"
                >
                  <span className={styles.toggleKnob} />
                </button>
              </div>

              <div className={styles.preferenceItem}>
                <span className={styles.preferenceLabel}>Service Disruptions</span>
                <button
                  type="button"
                  className={`${styles.toggleSwitch} ${
                    notifications.serviceDisruptions ? styles.active : ''
                  }`}
                  onClick={() => handleTogglePref('serviceDisruptions')}
                  aria-label="Toggle Service Disruptions"
                >
                  <span className={styles.toggleKnob} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
