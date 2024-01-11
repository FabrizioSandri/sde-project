const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getLeaguesAvailable',(req,res)=>{
  const footapi_endpoint = `http://football_adapter:${process.env.FOOTBALL_ADAPTER_SERVER_PORT}/getLeagues`;
  const options = {
    method: 'GET',
    url: footapi_endpoint
  };
  axios.request(options)
  .then(response => {

    let leagues = filterLeaguesInfo(response.data.leagues);
    return res.status(200).json({
      status:'success',
      leagues: leagues
    })
  })
  .catch(error => {
    return res.status(400).json({
      status:'error',
      msg: error
    })
  });
})

app.get('/getTeamsOfLeague',(req,res)=>{
  const footapi_endpoint = `http://football_adapter:${process.env.FOOTBALL_ADAPTER_SERVER_PORT}/getTeams`;
  const options = {
    method: 'GET',
    url: footapi_endpoint,
    params: {
      leagueId: req.query.leagueId
    }
  };

  axios.request(options)
  .then(response => {
    let teams = filterTeamsInfo(response.data.teams);
    return res.status(200).json({
      status:'success',
      teams: teams
    })
  })
  .catch(error => {
    return res.status(400).json({
      status:'error',
      msg: error
    })
  });
})

app.get('/getTeamInfo',(req,res)=>{
  const footapi_endpoint = `http://football_adapter:${process.env.FOOTBALL_ADAPTER_SERVER_PORT}/getTeamInfoById`;
  const options = {
    method: 'GET',
    url: footapi_endpoint,
    params: {
      leagueId: req.query.leagueId,
      teamId: req.query.teamId
    }
  };

  axios.request(options)
  .then(response => {
    return res.status(200).json({
      status:'success',
      teamInfo:response.data.teamInfo[0]
    })
  })
  .catch(error => {
    return res.status(400).json({
      status:'error',
      msg: error
    })
  });
})


app.post('/getInfoMatches', (req, res) => {
    const footapi_endpoint = `http://football_adapter:${process.env.FOOTBALL_ADAPTER_SERVER_PORT}/getFixtures`;
    const options = {
      method: 'POST',
      url: footapi_endpoint,
      data:{
        teamIds: req.body.teamIds,
        numberOfNextMatches: req.body.numberOfNextMatches
      }
    };
  
    axios.request(options)
    .then(response => {
      let filteredMatches = filterMatches(response.data.matches);

      return res.status(200).json({
          status: 'success',
          matches: filteredMatches
        })
    })
    .catch(error => {
      return res.status(400).json({
        status: 'error',
        msg: error
      })
    });
});
  
// Start the server
const PORT = process.env.FOOTBALL_SERVICE_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// ===========================utility functions===========================

function filterMatches(teamsFixtures){
    
    let importantMatchInfo=[];
    for (teamMatches of teamsFixtures){

        for(match of teamMatches){

            importantMatchInfo.push({
                matchReferee: match.fixture.referee,
                matchDate: match.fixture.date,
                stadium: match.fixture.venue.name,
                city: match.fixture.venue.city,
                league: match.league.name,
                country: match.league.country,
                homeTeam: match.teams.home.name,
                homeTeamLogoLink: match.teams.home.logo,
                awayTeam: match.teams.away.name,
                awayTeamLogoLink: match.teams.away.logo
            });
        }
    }
    return importantMatchInfo;
}

function filterLeaguesInfo(leaguesInfo){
  for (let i = 0; i < leaguesInfo.length; i++) {
    if (leaguesInfo[i].hasOwnProperty("country") &&  leaguesInfo[i].hasOwnProperty("seasons")) {
      delete leaguesInfo[i]["seasons"];
      leaguesInfo[i]["league"]["country"]=leaguesInfo[i]["country"].name;
      delete leaguesInfo[i]["country"];
      leaguesInfo[i]=leaguesInfo[i].league;
    }
  }
  return leaguesInfo;
}

function filterTeamsInfo(teamsInfo){
  for (let i = 0; i < teamsInfo.length; i++) {
    if (teamsInfo[i].hasOwnProperty("venue")) {
      delete teamsInfo[i]["venue"];
      teamsInfo[i]=teamsInfo[i].team;

    }
  }
  return teamsInfo;
}