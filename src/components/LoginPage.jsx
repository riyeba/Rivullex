import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('company'); // 'company' or 'general'
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe, userType });
  };

  const toggleUserType = (type) => {
    setUserType(type);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 lg:px-12">
        <div className="w-full max-w-sm sm:max-w-md space-y-4 sm:space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded opacity-90"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">Rivulex</span>
              {/* <div className="text-xs text-blue-600 font-medium">Nigeria</div> */}
            </div>
          </div>

          {/* User Type Toggle */}
          <div className="bg-gray-50 p-1 rounded-lg mb-4 sm:mb-6">
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => toggleUserType('company')}
                className={`flex-1 py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                  userType === 'company'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden sm:inline">Company Access</span>
                <span className="sm:hidden">Company</span>
              </button>
              <button
                type="button"
                onClick={() => toggleUserType('general')}
                className={`flex-1 py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ${
                  userType === 'general'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden sm:inline">General User</span>
                <span className="sm:hidden">General</span>
              </button>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Welcome Back ✨
            </h1>
            {userType === 'company' ? (
              <>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access the full dashboard with AI assistant and damage assessment tools.
                </p>
                <p className="text-gray-500 text-xs">
                  Company domain email required for full system access.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get location-specific flood insights and analytics for your area.
                </p>
                <p className="text-gray-500 text-xs">
                  Access personalized flood monitoring without resource-intensive features.
                </p>
              </>
            )}
          </div>

          {/* Login Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                {userType === 'company' ? 'Company Email Address' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder={
                    userType === 'company' 
                      ? 'yourname@company.com' 
                      : 'Enter your email'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 hover:border-gray-400"
                  required
                />
                {userType === 'company' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {userType === 'company' && (
                <p className="text-xs text-amber-600 flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Corporate domain email required for full access</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 hover:border-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button 
                type="button"
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                userType === 'company'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500'
                  : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500'
              }`}
            >
              {userType === 'company' ? 'Access Full Dashboard' : 'Get Location Insights'}
            </button>
          </div>

          {/* Access Level Info */}
          <div className={`p-3 rounded-lg border ${
            userType === 'company' 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <h4 className={`text-xs font-medium mb-1 ${
              userType === 'company' ? 'text-blue-800' : 'text-green-800'
            }`}>
              {userType === 'company' ? 'Full Access Includes:' : 'Your Access Includes:'}
            </h4>
            <ul className={`text-xs space-y-0.5 ${
              userType === 'company' ? 'text-blue-700' : 'text-green-700'
            }`}>
              {userType === 'company' ? (
                <>
                  <li>• AI Assistant & Chat Support</li>
                  <li>• Damage Assessment Tools</li>
                  <li>• Complete Analytics Dashboard</li>
                  <li>• Emergency Response System</li>
                </>
              ) : (
                <>
                  <li>• Location-Specific Insights</li>
                  <li>• Flood Risk Analytics</li>
                  <li>• Personal Alerts & Notifications</li>
                  <li>• Community Updates</li>
                </>
              )}
            </ul>
          </div>

          {/* Divider */}
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">New to FloodWatch?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <button 
              type="button"
              onClick={() => setShowSignUp(true)}
              className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-sm transition-all duration-200"
            >
              Create new account
            </button>
          </div>

          {/* Demo Access for Testing */}
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 flex items-start space-x-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>
                <strong>Testing Access:</strong> Demo credentials available for authorized testers. 
                Contact admin for temporary access credentials.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Nigerian Flood Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full h-48 sm:h-64 lg:h-96 max-w-lg rounded-xl overflow-hidden shadow-2xl">
          {/* Updated flood image more representative of Nigerian flooding */}
          <img
            src="https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zmxvb2R8ZW58MHx8MHx8fDA%3D"
            alt="Flood monitoring scene in Nigeria - emergency response system"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
          
          {/* Floating Information Card */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-2.5 sm:p-3 text-white">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500/80 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-xs">Nigeria Flood Alert</h3>
                <p className="text-xs opacity-90">Real-time Monitoring</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
              <span className="text-xs opacity-75">
                {userType === 'company' ? 'Full System Access' : 'Community Insights'}
              </span>
              <div className="flex items-center space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  userType === 'company' ? 'bg-blue-400' : 'bg-green-400'
                }`}></div>
                <span className="text-xs">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;