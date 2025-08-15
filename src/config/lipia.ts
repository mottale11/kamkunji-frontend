// Lipia Online M-Pesa Payment Configuration
export const LIPIA_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://lipia-api.kreativelabske.com/api',
  API_KEY: '715bbd11f2ce376c3129513a4532fc8ccb70118c',
  
  // Payment Settings
  CURRENCY: 'KES',
  PHONE_FORMAT: '07XXXXXXXX',
  
  // Error Messages
  ERROR_MESSAGES: {
    INVALID_PHONE: 'Please enter a valid phone number starting with 07',
    INSUFFICIENT_BALANCE: 'Insufficient M-Pesa balance. Please top up and try again.',
    PAYMENT_TIMEOUT: 'Payment timeout. Please try again.',
    USER_CANCELLED: 'Payment was cancelled. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  },
  
  // Success Messages
  SUCCESS_MESSAGES: {
    STK_SENT: 'M-Pesa STK Push Sent! 📱',
    PAYMENT_INITIATED: 'Payment initiated successfully! Check your phone for the M-Pesa prompt.',
  },
  
  // UI Settings
  UI: {
    PRIMARY_COLOR: '#16a34a', // Green
    SECONDARY_COLOR: '#059669', // Darker green
    SUCCESS_COLOR: '#22c55e', // Light green
    ERROR_COLOR: '#ef4444', // Red
  },
  
  // Validation Rules
  VALIDATION: {
    PHONE_REGEX: /^0?7\d{8}$/,
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 100000,
  },
} as const;

// Helper function to get environment-specific configuration
export const getLipiaConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  
  return {
    ...LIPIA_CONFIG,
    // Override with environment variables if available
    API_KEY: import.meta.env.VITE_LIPIA_API_KEY || LIPIA_CONFIG.API_KEY,
    API_BASE_URL: import.meta.env.VITE_LIPIA_API_URL || LIPIA_CONFIG.API_BASE_URL,
  };
};

export default LIPIA_CONFIG;
