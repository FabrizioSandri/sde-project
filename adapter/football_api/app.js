const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getLeagues', (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/leagues',
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
      },
      params:{
        season: currentFootballSeasonYear().toString()
      }
    };
    axios.request(options)
    .then(response => {
      res.status(200).json({
        status:'success',
        leagues: response.data.response
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
    if (!req.query.leagueId){
        return res.status(400).json({
            status:'error',
            msg:'league value is mising'
        });
    }
    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/teams',
      params:{
        season:currentFootballSeasonYear().toString(),
        league:req.query.leagueId
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
        teams:response.data.response
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
    const {leagueId, teamId} = req.query;
    if (!leagueId || !teamId){
        return res.status(400).json({
            status:'error',
            msg:'league or tema ID value is mising'
        });
    }

    const options = {
      method: 'GET',
      url: 'https://api-football-beta.p.rapidapi.com/teams',
      params:{
        season:currentFootballSeasonYear().toString(),
        league:leagueId,
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
        teamInfo: response.data.response
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
  app.post('/getFixtures', async (req, res) => {
    let data = [];
    const teamIds=req.body.teamIds;
    let resp = '';
    if (!teamIds){
        return res.status(400).json({
            status:'error',
            msg:'team Ids value are mising'
        });
    }
    for (const teamId of teamIds){
      const options = {
        method: 'GET',
        url: 'https://api-football-beta.p.rapidapi.com/fixtures',
        params: {
          team: teamId,
          next: req.body.numberOfNextMatches,
          season: currentFootballSeasonYear().toString()
        },
        headers: {
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY ,
          'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
      };
      try {
        resp = await axios.request(options);
        data.push(resp.data.response)
      } catch (error) {
        return res.status(400).json({
          status:'error',
          msg: error
        })
      }
    }
    return res.status(200).json({
      status:'success',
      matches: data
    });
  });
  
// Start the server
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

