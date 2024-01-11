const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getWeatherMatches', (req, res) => {
    if(!req.query.stadium || !req.query.matchDate){
        return res.status(400).json({
            status:'error',
            msg: 'empty stadium name or date'
        })
    }
    const weather_endpoint = `http://weather_adapter:${process.env.WEATHER_ADAPTER_SERVER_PORT}/getWeather`;
    const stackpoint_endpoint = `http://positionstack_adapter:${process.env.POSITIONSTACK_ADAPTER_SERVER_PORT}/getCoordinates`;
    const options_stackpoint = {
        method: 'GET',
        url: stackpoint_endpoint,
        params: {
            place:req.query.stadium
        }
    };
    axios.request(options_stackpoint)
    .then((result)=>{
      if (!result.data.data.latitude || !result.data.data.longitude){
        return res.status(400).json({
          status: "error",
          msg: "coordinates of the stadium not found"
        });
      }
      
      const options_weather = {
        method: 'GET',
        url: weather_endpoint,
        params: {
          lat: result.data.data.latitude,
          lon: result.data.data.longitude
        }
      };

      axios.request(options_weather)
      .then((result) => {
        let weatherForecast = filterWeatherForecast(result.data.data.data,  req.query.matchDate);
        return res.status(200).json({
          status: "success",
          weather: weatherForecast
        });
      })
      .catch((error)=>{
        return res.status(400).json({
          status: 'error',
          msg: error
        });
      });

    })
    .catch((error)=>{
      return res.status(400).json({
        status: 'error',
        msg: error
      });
    });
  })
  
// Start the server
const PORT = process.env.PLACEFORECAST_SERVICE_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ===========================utility functions===========================

function filterWeatherForecast(forecasts, date){

  const truncatedDate = (date.toString()).slice(0, 10);
  for (const forecast of forecasts){
    if( forecast.datetime == truncatedDate){
      return {
        min_temp: forecast.min_temp,
        max_temp: forecast.max_temp,
        description: forecast.weather.description
      };
    }
  }
  return {
      min_temp: 'data still not computed',
      max_temp: 'data still not computed',
      description: 'data still not computed'
  };
}