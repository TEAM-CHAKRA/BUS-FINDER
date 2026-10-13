import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { FindRoutes } from './pages/FindRoutes';
import { NearbyStops } from './pages/NearbyStops';
import { Timetable } from './pages/Timetable';
import { Profile } from './pages/Profile';
import { LiveTracking } from './pages/LiveTracking';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/find-routes" element={<FindRoutes />} />
        <Route path="/nearby-stops" element={<NearbyStops />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
