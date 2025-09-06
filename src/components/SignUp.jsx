import { useState, useCallback, useMemo } from 'react';

// API Configuration - Easy to modify for your backend
const API_CONFIG = {
  baseURL: '/api', // Change this to your API base URL
  endpoints: {
    signup: '/signup'
  },
  timeout: 10000
};

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    stateOfResidence: '',
    companyEmail: '',
    generalEmail: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [accessType, setAccessType] = useState('general');

  // Reset form data
  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      stateOfResidence: '',
      country: '',
      companyEmail: '',
      generalEmail: '',
      password: ''
    });
    setMessage('');
  }, []);

  // Handle access type change
  const handleAccessTypeChange = useCallback((type) => {
    setAccessType(type);
    setFormData(prev => ({
      ...prev,
      companyEmail: type === 'general' ? '' : prev.companyEmail,
      generalEmail: type === 'company' ? '' : prev.generalEmail
    }));
    setMessage('');
  }, []);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message) setMessage('');
  }, [message]);

  // API Service - Easy to customize
  const apiService = useCallback(async (data) => {
    const activeEmail = accessType === 'company' ? data.companyEmail : data.generalEmail;
    
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      country: data.country,
      stateOfResidence: data.stateOfResidence,
      email: activeEmail,
      password: data.password,
      accessType: accessType
    };

    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.signup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers here (auth, etc.)
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(API_CONFIG.timeout)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }, [accessType]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage('');

    try {
      const result = await apiService(formData);
      setMessage(result.message || `Account created successfully with ${accessType} access!`);
      resetForm();
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'TimeoutError') {
        setMessage('Request timeout. Please check your connection and try again.');
      } else if (error.name === 'AbortError') {
        setMessage('Request was cancelled. Please try again.');
      } else {
        setMessage(error.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [formData, loading, apiService, accessType, resetForm]);

  // Form validation
  const isFormValid = useMemo(() => {
    const activeEmail = accessType === 'company' ? formData.companyEmail : formData.generalEmail;
    return formData.firstName.trim() &&
           formData.lastName.trim() &&
           formData.gender &&
           formData.country.trim() &&
           formData.stateOfResidence.trim() &&
           activeEmail.includes('@') &&
           formData.password.length >= 8;
  }, [formData, accessType]);

  // Static data
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const basicFields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
    { name: 'country', label: 'Country', type: 'text', placeholder: 'Nigeria' },
    { name: 'stateOfResidence', label: 'State of Residence', type: 'text', placeholder: 'Borno' }
  ];

  const accessInfo = {
    general: {
      type: 'General Access',
      features: ['Basic platform access', 'Standard features', 'Community support', 'Limited storage'],
      theme: 'gray'
    },
    company: {
      type: 'Company Access', 
      features: ['Full platform access', 'Advanced analytics', 'Team collaboration', 'Priority support'],
      theme: 'blue'
    }
  };

  const currentAccess = accessInfo[accessType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Main Container - Responsive width and spacing */}
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
        
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Choose your access type and fill the form below
          </p>
        </header>

        {/* Access Type Selector - Responsive grid */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4">Choose Access Type</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            
            {/* General Access Button */}
            <button
              type="button"
              onClick={() => handleAccessTypeChange('general')}
              className={`p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                accessType === 'general'
                  ? 'border-gray-500 bg-gray-50 shadow-lg ring-2 ring-gray-200'
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 transition-colors ${
                  accessType === 'general' ? 'bg-gray-500' : 'bg-gray-300'
                }`}></div>
                <span className="text-sm sm:text-base md:text-lg font-semibold">General Access</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-7">
                Personal email • Basic features
              </p>
            </button>

            {/* Company Access Button */}
            <button
              type="button"
              onClick={() => handleAccessTypeChange('company')}
              className={`p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                accessType === 'company'
                  ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 transition-colors ${
                  accessType === 'company' ? 'bg-blue-500' : 'bg-gray-300'
                }`}></div>
                <span className="text-sm sm:text-base md:text-lg font-semibold">Company Access</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 ml-5 sm:ml-7">
                Work email • Full features
              </p>
            </button>
          </div>
        </div>

        {/* Access Benefits Card  */}
        <div className={`${
          accessType === 'company' 
            ? 'bg-blue-50 border-blue-200 text-blue-800' 
            : 'bg-gray-50 border-gray-200 text-gray-800'
        } border rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8`}>
          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
            {currentAccess.type} Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {currentAccess.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className={`${accessType === 'company' ? 'text-blue-600' : 'text-gray-600'} mr-2 text-sm sm:text-base`}>
                  ✓
                </span>
                <span className="text-xs sm:text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Success/Error Messages - Responsive */}
        {message && (
          <div 
            className={`p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-sm sm:text-base border ${
              message.toLowerCase().includes('success') 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          
          {/* Basic Fields  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {basicFields.map((field) => (
              <div key={field.name} className={field.name === 'country' || field.name === 'stateOfResidence' ? 'md:col-span-1' : ''}>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  {field.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  disabled={loading}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-gray-100"
                />
              </div>
            ))}
          </div>

          {/* Gender - Full width */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Gender
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-gray-100"
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email Field  */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              {accessType === 'company' ? 'Company Email' : 'Personal Email'}
              <span className="text-red-500 ml-1">*</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                accessType === 'company' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {currentAccess.type}
              </span>
            </label>
            <input
              type="email"
              name={accessType === 'company' ? 'companyEmail' : 'generalEmail'}
              value={accessType === 'company' ? formData.companyEmail : formData.generalEmail}
              onChange={handleChange}
              placeholder={accessType === 'company' ? 'john@company.com' : 'john@gmail.com'}
              required
              disabled={loading}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base border rounded-lg sm:rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 ${
                accessType === 'company'
                  ? 'border-blue-300 focus:ring-blue-500 bg-blue-50'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              minLength="8"
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 md:py-4 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 disabled:bg-gray-100"
            />
          </div>

          {/* Submit Button - Responsive sizing */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full font-semibold py-3 sm:py-4 md:py-5 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] ${
              accessType === 'company'
                ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white focus:ring-blue-300'
                : 'bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white focus:ring-gray-300'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-3"></div>
                <span className="hidden sm:inline">Creating {currentAccess.type}...</span>
                <span className="sm:hidden">Creating...</span>
              </div>
            ) : (
              `Create ${currentAccess.type}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;