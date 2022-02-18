const {nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (let times of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(times.risetime);
    const durration = times.duration;
    console.log(`Next pass at ${dateTime} for ${durration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error)=>{
    console.log('It didn\'t work: ', error.message);
  });