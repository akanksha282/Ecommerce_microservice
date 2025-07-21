const axioswithRetry = require('../../shared/axioswithRetry');
const USER_SERVICE_URL = 'http://localhost:3000';

async function validateUser(userId,token) {
  console.log("ii")
  try {
    console.log("went")
    const response = await axioswithRetry.get(`${USER_SERVICE_URL}/api/users/${userId}`, {
      headers: {
        'x-api-key': process.env.API_KEY ,    
        'Authorization': `Bearer ${token}`,        
      },
      timeout: 5000
      
    });

    console.log("check")
    return response.data;
  } catch (error) {
    console.error("validateUser error:", error.response?.data || error.message);
    throw new Error("User validation failed: " + (error.response?.data?.error || error.message));
  }
}

module.exports = { validateUser };
