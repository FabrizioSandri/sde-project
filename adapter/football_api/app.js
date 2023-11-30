// Import the express module
const express = require('express');
const axios = require('axios');

// Create an instance of express
const app = express();

app.get('/getLeagues', (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/leagues',
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      }
    };
  
    axios.request(options)
    .then(response => {
      res.status(200).json({
        status:'success',
        data:response.data
      })
    })
    .catch(error => {
      res.status(400).json({
        status:'error',
        msg: error
      })
    });
  });
  

  app.get('/getTeams', (req, res) => {
    if (!req.query.league){
        return res.status(400).json({
            status:'error',
            msg:'league value is mising'
        });
    }
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/teams',
      params:{
        season:currentFootballSeasonYear.toString(),
        league:req.query.league
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      }
    };
  
    axios.request(options)
    .then(response => {
      res.status(200).json({
        status:'success',
        data:response.data
      })
    })
    .catch(error => {
      res.status(400).json({
        status:'error',
        msg: error
      })
    });
  });
  
  app.get('/getTeamInfoById', (req, res) => {
    const {league, teamId}= req.query;
    if (!league || !teamId){
        return res.status(400).json({
            status:'error',
            msg:'league or tema ID value is mising'
        });
    }
    console.log(req.query);
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/teams',
      params:{
        season:currentFootballSeasonYear.toString(),
        league:league,
        id:teamId
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      }
    };
  
    axios.request(options)
    .then(response => {
      res.status(200).json({
        status:'success',
        data:response.data
      })
    })
    .catch(error => {
      res.status(400).json({
        status:'error',
        msg: error
      })
    });
  });
  
  // Define a simple endpoint
  app.get('/getFixtures', (req, res) => {
    if (!req.query.teamId){
        return res.status(400).json({
            status:'error',
            msg:'team Id value is mising'
        });
    }
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/fixtures',
      params: {
        team: req.query.teamId,
        next: req.query.numberOfNextMatches.toString() ||'40',
        season: currentFootballSeasonYear()
      },
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      }
    };
      
    axios.request(options)
    .then(response => {
      res.status(200).json({
        status:'success',
        data:response.data
      })
    })
    .catch(error => {
      res.status(400).json({
        status:'error',
        msg: error
      })
    });
  });
  

const PORT = process.env.FOOTBALL_ADAPTER_SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
// ===========================utility functions===========================

function currentFootballSeasonYear(){
    let seasonYear=new Date().getFullYear();
    if (seasonYear%2==0){
      return seasonYear-1;
    }
    return seasonYear;
  }