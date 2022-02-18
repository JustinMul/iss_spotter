// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('99.229.5.178',(error,data) => {
//   if (error) {
//     console.log("error: ", error);
//     return;
//   }
//   console.log(data);
// });

// let exampleCoords = { latitude: 43.8678, longitude: -79.442 };

// fetchISSFlyOverTimes(exampleCoords,(error,data) => {
//   if (error) {
//     console.log("error: ", error);
//     return;
//   }
//   console.log(data);
// });


const printPassTimes = function(passTimes) {
  for (let times of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(times.risetime);
    const durration = times.duration;
    console.log(`Next pass at ${dateTime} for ${durration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});