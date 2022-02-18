/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    }
    const data = JSON.parse(body);
    callback(error,data.ip);
    
  });
};

const fetchCoordsByIP = function(ip,callback) {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {
    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude,longitude} = JSON.parse(body);

    callback(null, {latitude,longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const times = JSON.parse(body).response;
    
    callback(null,times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip)=>{
    if (error) {
      callback(error,null);
    }
    fetchCoordsByIP(ip,(error,loc) => {
      if (error) {
        callback(error,null);
      }
      fetchISSFlyOverTimes(loc,(error,data) => {
        if (error) {
          callback(error,null);
        }
        callback(null,data);
      });
    });
  });
  

};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};