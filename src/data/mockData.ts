export interface BusStopTimeline {
  name: string;
  status: 'departed' | 'current' | 'upcoming';
  timeInfo?: string;
  distanceInfo?: string;
  busyLevel?: string;
}

export interface LiveBus {
  id: string;
  routeNumber: string;
  routeName: string;
  status: 'ON TIME' | 'DELAYED (4m)' | 'DELAYED (5m)';
  isOnTime: boolean;
  occupancy: 'Low' | 'Medium Busy' | 'High';
  lastUpdated: string;
  currentStop: string;
  nextStop: string;
  eta: string;
  distance: string;
  stops: BusStopTimeline[];
  coordinates: { x: number; y: number };
}

export interface JourneyRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  serviceType: 'Express' | 'Commuter' | 'Other';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: 'On Time' | 'Delayed';
  delayMinutes?: number;
  stopsCount: number;
  from: string;
  to: string;
  isFavorite?: boolean;
}

export interface NearbyStop {
  id: string;
  name: string;
  distanceMeters: number;
  distanceText: string;
  availableRoutes: string[];
  nextDepartures: string;
  coordinates: { x: number; y: number };
}

export interface TimetableEntry {
  id: string;
  routeId: string;
  departure: string;
  destination: string;
  arrival: string;
  status: 'On Time' | 'Delayed 5m' | 'Delayed 10m';
  isLiveEstimate?: boolean;
}

export interface UserProfileData {
  name: string;
  email: string;
  avatarText: string;
  favouriteRoutes: Array<{ id: string; name: string; details: string }>;
  savedStops: string[];
  recentSearches: string[];
  notificationPreferences: {
    arrivalAlerts: boolean;
    delayNotifications: boolean;
    serviceDisruptions: boolean;
  };
}

export const MOCK_LIVE_BUSES: LiveBus[] = [
  {
    id: 'bus-42',
    routeNumber: '42',
    routeName: 'Bus 42 — Downtown Express',
    status: 'ON TIME',
    isOnTime: true,
    occupancy: 'Medium Busy',
    lastUpdated: '30s ago',
    currentStop: 'Central Plaza',
    nextStop: 'Grand Ave',
    eta: '5m ETA',
    distance: '0.8 miles',
    stops: [
      { name: 'Westside Terminal', status: 'departed', busyLevel: 'Medium Busy' },
      { name: 'Central Plaza', status: 'current', timeInfo: '5 mins', distanceInfo: '0.8 miles' },
      { name: 'Grand Ave', status: 'upcoming' },
      { name: 'Waterfront Depot', status: 'upcoming' }
    ],
    coordinates: { x: 690, y: 535 }
  },
  {
    id: 'bus-10b',
    routeNumber: '10B',
    routeName: 'Bus 10B — Uptown Express',
    status: 'DELAYED (4m)',
    isOnTime: false,
    occupancy: 'Medium Busy',
    lastUpdated: '45s ago',
    currentStop: 'Westside Terminal',
    nextStop: 'Arts District',
    eta: '4m ETA',
    distance: '1.2 miles',
    stops: [
      { name: 'North Park Hub', status: 'departed' },
      { name: 'Westside Terminal', status: 'current', timeInfo: '4 mins', distanceInfo: '1.2 miles' },
      { name: 'Arts District', status: 'upcoming' },
      { name: 'Metro Terminal', status: 'upcoming' }
    ],
    coordinates: { x: 386, y: 755 }
  },
  {
    id: 'bus-12',
    routeNumber: '12',
    routeName: 'Bus 12 — Uptown Express',
    status: 'DELAYED (4m)',
    isOnTime: false,
    occupancy: 'High',
    lastUpdated: '1m ago',
    currentStop: 'Harbor Gate',
    nextStop: 'Market St',
    eta: '7m ETA',
    distance: '1.8 miles',
    stops: [
      { name: 'Grand Terminal', status: 'departed' },
      { name: 'Harbor Gate', status: 'current', timeInfo: '7 mins', distanceInfo: '1.8 miles' },
      { name: 'Market St', status: 'upcoming' }
    ],
    coordinates: { x: 840, y: 290 }
  },
  {
    id: 'bus-7',
    routeNumber: '7',
    routeName: 'Bus 7 — Broadway Line',
    status: 'ON TIME',
    isOnTime: true,
    occupancy: 'Low',
    lastUpdated: '15s ago',
    currentStop: 'Broadway 4th',
    nextStop: 'Central Plaza',
    eta: '2m ETA',
    distance: '0.4 miles',
    stops: [
      { name: 'South Station', status: 'departed' },
      { name: 'Broadway 4th', status: 'current', timeInfo: '2 mins', distanceInfo: '0.4 miles' },
      { name: 'Central Plaza', status: 'upcoming' }
    ],
    coordinates: { x: 690, y: 245 }
  }
];

export const MOCK_JOURNEYS: JourneyRoute[] = [
  {
    id: 'journey-1',
    routeNumber: 'Route 42B',
    routeName: 'Downtown Express',
    serviceType: 'Express',
    departureTime: '08:30 AM',
    arrivalTime: '08:52 AM',
    duration: '22m',
    status: 'On Time',
    stopsCount: 6,
    from: 'Central Station',
    to: 'University',
    isFavorite: true
  },
  {
    id: 'journey-2',
    routeNumber: 'Route 104',
    routeName: 'Suburban Commuter',
    serviceType: 'Commuter',
    departureTime: '08:30 AM',
    arrivalTime: '08:57 AM',
    duration: '27m',
    status: 'On Time',
    stopsCount: 8,
    from: 'Central Station',
    to: 'University',
    isFavorite: true
  },
  {
    id: 'journey-3',
    routeNumber: 'Route 104',
    routeName: 'Midtown Commuter',
    serviceType: 'Commuter',
    departureTime: '08:30 AM',
    arrivalTime: '08:57 AM',
    duration: '27m',
    status: 'On Time',
    stopsCount: 8,
    from: 'Central Station',
    to: 'University',
    isFavorite: false
  },
  {
    id: 'journey-4',
    routeNumber: 'Route 104',
    routeName: 'University Express',
    serviceType: 'Commuter',
    departureTime: '08:30 AM',
    arrivalTime: '08:57 AM',
    duration: '27m',
    status: 'On Time',
    stopsCount: 7,
    from: 'Central Station',
    to: 'University',
    isFavorite: false
  },
  {
    id: 'journey-5',
    routeNumber: 'Route 7',
    routeName: 'Broadway Standard',
    serviceType: 'Other',
    departureTime: '09:00 AM',
    arrivalTime: '09:31 AM',
    duration: '31m',
    status: 'On Time',
    stopsCount: 11,
    from: 'Central Station',
    to: 'University',
    isFavorite: false
  },
  {
    id: 'journey-6',
    routeNumber: 'Route 10B',
    routeName: 'Uptown Rapid',
    serviceType: 'Express',
    departureTime: '09:15 AM',
    arrivalTime: '09:39 AM',
    duration: '24m',
    status: 'Delayed',
    delayMinutes: 4,
    stopsCount: 5,
    from: 'Central Station',
    to: 'University',
    isFavorite: false
  }
];

export const MOCK_NEARBY_STOPS: NearbyStop[] = [
  {
    id: 'stop-1',
    name: 'Central Plaza - Stop A',
    distanceMeters: 100,
    distanceText: '100m away',
    availableRoutes: ['42B', '55', '104'],
    nextDepartures: 'Next: 025 to 0 mins (42B)',
    coordinates: { x: 490, y: 280 }
  },
  {
    id: 'stop-2',
    name: 'Market St - Stop B',
    distanceMeters: 250,
    distanceText: '250m away',
    availableRoutes: ['42B', 'E5', '104'],
    nextDepartures: 'Next: 325 to 2 mins (104)',
    coordinates: { x: 580, y: 340 }
  },
  {
    id: 'stop-3',
    name: 'Central Plaza - Stop B',
    distanceMeters: 126,
    distanceText: '126m away',
    availableRoutes: ['42B', 'E5', '104'],
    nextDepartures: 'Next: 42B in 6 mins',
    coordinates: { x: 510, y: 310 }
  },
  {
    id: 'stop-4',
    name: 'Westside Terminal',
    distanceMeters: 480,
    distanceText: '480m away',
    availableRoutes: ['10B', '42', '7'],
    nextDepartures: 'Next: 10B in 4 mins',
    coordinates: { x: 380, y: 460 }
  },
  {
    id: 'stop-5',
    name: 'Waterfront Depot',
    distanceMeters: 620,
    distanceText: '620m away',
    availableRoutes: ['42', '12'],
    nextDepartures: 'Next: 42 in 12 mins',
    coordinates: { x: 700, y: 420 }
  }
];

export const MOCK_TIMETABLE_ENTRIES: TimetableEntry[] = [
  { id: 't-1', routeId: '42B', departure: '07:30 AM', destination: 'University', arrival: '07:32 AM', status: 'On Time' },
  { id: 't-2', routeId: '42B', departure: '08:00 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' },
  { id: 't-3', routeId: '42B', departure: '08:30 AM', destination: 'University', arrival: '07:32 AM', status: 'Delayed 5m' },
  { id: 't-4', routeId: '42B', departure: '08:30 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' },
  { id: 't-5', routeId: '42B', departure: '07:00 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' },
  { id: 't-6', routeId: '42B', departure: '07:30 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' },
  { id: 't-7', routeId: '42B', departure: '07:30 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' },
  { id: 't-8', routeId: '42B', departure: '07:30 AM', destination: 'University', arrival: '07:52 AM', status: 'On Time' }
];

export const MOCK_USER_PROFILE: UserProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarText: 'JD',
  favouriteRoutes: [
    { id: '42B', name: 'Route 42B', details: 'Downtown Express • Every 10 mins • 6 stops' },
    { id: '104', name: 'Route 104', details: 'Suburban Commuter • Every 15 mins • 8 stops' }
  ],
  savedStops: ['Central Plaza', 'Market St - Stop B'],
  recentSearches: ['Central Station → University', 'Westside Terminal → Waterfront Depot'],
  notificationPreferences: {
    arrivalAlerts: true,
    delayNotifications: true,
    serviceDisruptions: false
  }
};
