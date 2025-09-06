import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, MapPin, CloudRain, AlertTriangle, Save } from 'lucide-react';

// API service layer for easy integration
const apiService = {
  // Replace with your actual API endpoints
  async getRoute(origin, destination) {
    // Example API call structure
    const response = await fetch('/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination })
    });
    return response.json();
  },

  async getSafetyData(location) {
    const response = await fetch(`/api/safety/${location}`);
    return response.json();
  },

  async saveAddress(address) {
    const response = await fetch('/api/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address })
    });
    return response.json();
  }
};

const SafetyRoutingApp = () => {
  const [currentLocation, setCurrentLocation] = useState('2972 Westheimer Rd Santa Ana, Illinois 60466');
  const [safetyAlerts, setSafetyAlerts] = useState([
    { id: 1, type: 'weather', icon: CloudRain, text: 'Rainfall: 2mm', severity: 'low' },
    { id: 2, type: 'general', icon: AlertTriangle, text: 'Others', severity: 'medium' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);

  // Mock map component - replace with actual map integration (Google Maps, Mapbox, etc.)
  const MapComponent = () => (
    <div className="relative w-full h-48 sm:h-64 lg:h-80 xl:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      {/* Map container - integrate your preferred mapping library here */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
        {/* Route visualization */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
          {/* Mock route path */}
          <path
            d="M 60 60 Q 120 100 180 80 Q 220 70 240 120"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            strokeDasharray="0"
            className="animate-pulse"
          />
          {/* Start point */}
          <circle cx="60" cy="60" r="6" fill="#ef4444" />
          <circle cx="60" cy="60" r="3" fill="white" />
          {/* End point */}
          <circle cx="240" cy="120" r="6" fill="#ef4444" />
          <circle cx="240" cy="120" r="3" fill="white" />
        </svg>
        
        {/* Street labels */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xs sm:text-sm text-gray-600 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded shadow-sm">
          LINCOLN
        </div>
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-xs sm:text-sm text-gray-600 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded shadow-sm">
          LOWER TOWN HEIGHTS
        </div>
        <div className="absolute bottom-12 left-6 sm:bottom-16 sm:left-8 text-xs sm:text-sm text-gray-600 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded shadow-sm">
          STREET
        </div>
      </div>
    </div>
  );

  const handleBack = useCallback(() => {
    // Navigate back logic
    window.history.back();
  }, []);

  const handleSaveAddress = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiService.saveAddress(currentLocation);
      // Show success notification
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Failed to save address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentLocation]);

  const fetchRouteData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Example of fetching route and safety data
      const [route, safety] = await Promise.all([
        apiService.getRoute('origin', 'destination'),
        apiService.getSafetyData(currentLocation)
      ]);
      
      setRouteData(route);
      if (safety.alerts) {
        setSafetyAlerts(safety.alerts);
      }
    } catch (error) {
      console.error('Failed to fetch route data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentLocation]);

  useEffect(() => {
    // Fetch initial data when component mounts
    // fetchRouteData();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left Panel - Map Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 sm:p-6 lg:p-8 border-b border-gray-200 bg-white">
          <button
            onClick={handleBack}
            className="p-2 sm:p-2.5 lg:p-3 -ml-2 sm:-ml-2.5 lg:-ml-3 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <h1 className="ml-3 sm:ml-4 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Safety Routing
          </h1>
        </div>

        {/* Map Container */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white">
          <MapComponent />
        </div>
      </div>

      {/* Right Panel - Content Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 lg:px-12 bg-white lg:bg-gray-50">
        <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
          
          {/* Location Display */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-sm sm:text-base font-medium text-gray-700">Your Location</h2>
            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 lg:bg-white rounded-lg border border-gray-200 shadow-sm">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm sm:text-base text-gray-800 leading-relaxed">
                {currentLocation}
              </span>
            </div>
          </div>

          {/* Safety Alerts */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-medium text-gray-700">Safety Alerts</h2>
            <div className="space-y-3">
              {safetyAlerts.map((alert) => {
                const IconComponent = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100 shadow-sm"
                  >
                    <IconComponent 
                      className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${getSeverityColor(alert.severity)}`} 
                    />
                    <span className={`text-sm sm:text-base font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Address Button */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={handleSaveAddress}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-400 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Save Address</span>
                </>
              )}
            </button>
          </div>

          {/* Route Information Card */}
          {/* <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-xs sm:text-sm font-medium mb-2 text-blue-800">
              Route Safety Features:
            </h4>
            <ul className="text-xs sm:text-sm space-y-1 text-blue-700">
              <li>• Real-time weather monitoring</li>
              <li>• Hazard detection & alerts</li>
              <li>• Alternative route suggestions</li>
              <li>• Emergency contact integration</li>
            </ul>
          </div> */}

          {/* Additional Actions */}
          {/* <div className="space-y-2 sm:space-y-3">
            <button className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-sm sm:text-base transition-all duration-200">
              Share Route
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-sm sm:text-base transition-all duration-200">
              Alternative Routes
            </button>
          </div> */}

          {/* Emergency Contact Info */}
          {/* <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs sm:text-sm text-yellow-800 flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                <strong>Emergency:</strong> In case of immediate danger, contact local emergency services. 
                This route monitoring is for preventive safety planning.
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SafetyRoutingApp;