import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bus, Search, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-routes?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Left: Brand + Nav Links (Items 1-5) */}
        <div className={styles.leftSection}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.brandIcon}>
              <Bus size={24} strokeWidth={2.2} />
            </span>
            <span>
              <span className={styles.brandTeal}>BUS</span> Finder
            </span>
          </NavLink>

          <nav>
            <ul className={styles.navLinks}>
              {/* 1. Home */}
              <li className={styles.navItem}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* 2. Live Tracking */}
              <li className={styles.navItem}>
                <NavLink
                  to="/live-tracking"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Live Tracking
                </NavLink>
              </li>

              {/* 3. Find Routes */}
              <li className={styles.navItem}>
                <NavLink
                  to="/find-routes"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Find Routes
                </NavLink>
              </li>

              {/* 4. Nearby Stops */}
              <li className={styles.navItem}>
                <NavLink
                  to="/nearby-stops"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Nearby Stops
                </NavLink>
              </li>

              {/* 5. Timetable */}
              <li className={styles.navItem}>
                <NavLink
                  to="/timetable"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Timetable
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right: Search, Sign In / Profile, Track My Bus (Items 6-8) */}
        <div className={styles.rightSection}>
          {/* 6. Search */}
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search routes or stops"
            />
          </form>

          {/* 7. Sign In / Profile */}
          <NavLink to="/profile" className={styles.authLink}>
            Sign In
          </NavLink>

          {/* 8. Track My Bus */}
          <NavLink to="/live-tracking" className={styles.trackBusBtn}>
            Track My Bus
          </NavLink>

          {/* Profile Avatar icon */}
          <NavLink
            to="/profile"
            className={styles.avatarLink}
            title="User Profile"
            aria-label="User Profile"
          >
            <User size={18} />
          </NavLink>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            1. Home
          </NavLink>
          <NavLink
            to="/live-tracking"
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            2. Live Tracking
          </NavLink>
          <NavLink
            to="/find-routes"
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            3. Find Routes
          </NavLink>
          <NavLink
            to="/nearby-stops"
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            4. Nearby Stops
          </NavLink>
          <NavLink
            to="/timetable"
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            5. Timetable
          </NavLink>

          {/* Mobile Search */}
          <form className={styles.mobileSearchForm} onSubmit={handleSearchSubmit}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="6. Search routes..."
              className={styles.mobileSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${styles.mobileDrawerLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            7. Sign In / Profile
          </NavLink>
          <NavLink
            to="/live-tracking"
            className={styles.trackBusBtn}
            style={{ textAlign: 'center', justifyContent: 'center', marginTop: '0.5rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            8. Track My Bus
          </NavLink>
        </div>
      )}
    </header>
  );
};
