// axiosWithRetry.js
const axios = require('axios');
const axiosRetry = require('axios-retry').default;

// Create an axios instance with timeout
const axiosInstance = axios.create({
  timeout: 5000 // 5 seconds
});

// Attach retry logic (3 times with exponential backoff)
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkError(error) || error.response?.status >= 500;
  }
});

module.exports = axiosInstance;
