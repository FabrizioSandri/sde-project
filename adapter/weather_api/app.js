const express = require('express');
const axios = require('axios');

const app = express();

app.get('/getWeather',(req,res)=>{  
  if (!req.query.lat || !req.query.lon){
      return res.status(400).json({
          status:'error',
          msg:'one or more coordinates are missing'
      });
    }

    const options = {
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      params: {
        lat: req.query.lat,
        lon: req.query.lon
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
      }
    };
    axios.request(options)
    .then((result)=>{
      console.log(result.toString());
      return res.status(200).json({
        status:"success",
        data: result.data
      })
    })
    .catch((err)=>{
      return res.status(400).json({
        status: 'error',
        msg: err
      })
    });  
  })

const PORT = process.env.WEATHER_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    