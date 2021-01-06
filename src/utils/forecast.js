const request = require("request");
require("dotenv").config();

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.weatherstack}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `Currently ${
          body.current.weather_descriptions[0]
        } with a temperature of ${body.current.temperature} degrees and a ${
          body.current.precip * 100
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
