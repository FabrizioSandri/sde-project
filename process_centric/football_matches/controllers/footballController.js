const axios = require('axios');

module.exports.getLeagues = (req, res) => {
    let football_endpoint = `http://football:${process.env.FOOTBALL_SERVICE_PORT}/getLeaguesAvailable`;
    const options = {
        method: 'GET',
        url: football_endpoint,
      };
    
    axios.request(options)
    .then(response => {
        return res.status(200).json({
            status:'success',
            leagues:response.data.leagues
        })  
    })
    .catch(error => {
        return res.status(400).json({
            status:'error',
            msg: error.response.data
        })
    });
};

module.exports.getTeamsByLeagueId = (req, res) => {
    let football_endpoint = `http://football:${process.env.FOOTBALL_SERVICE_PORT}/getTeamsOfLeague`;
    if(!req.query.leagueId){
        return res.status(400).json({
            status: 'error',
            msg: 'no league id provided'
        });
    }
    const options = {
        method: 'GET',
        url: football_endpoint,
        params: {
          leagueId: req.query.leagueId
        }
      };
    
    axios.request(options)
    .then(response => {
        return res.status(200).json({
            status:'success',
            teams:response.data.teams
        })  
    })
    .catch(error => {
        res.status(400).json({
            status:'error',
            msg: error.response.data
        })
    });
};

module.exports.getTeamInfoById = (req, res) => {

    let football_endpoint = `http://football:${process.env.FOOTBALL_SERVICE_PORT}/getTeamInfo`;
    if(!req.query.teamId || !req.query.leagueId){
        return res.status(400).json({
            status:'error',
            msg: 'no league id provided'
        });
    }
    const options = {
        method: 'GET',
        url: football_endpoint,
        params: {
          teamId: req.query.teamId,
          leagueId: req.query.leagueId
        }
      };
    
    axios.request(options)
    .then(response => {
        return res.status(200).json({
            status:'success',
            teamInfo:response.data.teamInfo
        })  
    })
    .catch(error => {
        res.status(400).json({
            status:'error',
            msg: error.response.data
        })
    });
};

module.exports.getMatchesOfInterest = (req,res)=>{
    if(!req.body.token){
        return res.status(401).json({
            status:'error',
            problem:'token not provided'
        });
    }

    if(!req.body.numberOfMatches || req.body.numberOfMatches >= 40 || req.body.numberOfMatches <= 0){
        return res.status(400).json({
            status:'error',
            msg:'invalid number of matches'
        });
    }

    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/getTeams`;
    const options={
        method: 'GET',
        url: db_endpoint,
        params: {
          token: req.body.token 
        }
    }
    axios.request(options)
    .then(async (response) => {
        let options;
        let completeMatchesWithInfo=[];
        let teamIds=[];
        const footapi_endpoint = `http://football:${process.env.FOOTBALL_SERVICE_PORT}/getInfoMatches`;
        
        for(const data of response.data.result){
            teamIds.push(data.teamId);
        }

        options = {
            method: 'POST',
            url: footapi_endpoint,
            data:{
                teamIds:teamIds,
                numberOfNextMatches: req.body.numberOfMatches
            }
        };
        try {
            let {data: data} = await axios.request(options);

            const placeforecast_endpoint = `http://place_forecast:${process.env.PLACEFORECAST_SERVICE_PORT}/getWeatherMatches`;
            for(match of data.matches){
                options = {
                    method: 'GET',
                    url: placeforecast_endpoint,
                    params: {
                        stadium: match.stadium,
                        matchDate: match.matchDate
                    }
                };
                try {
                    const {data: weatherResp} = await axios.request(options);
                    match.weather=weatherResp.weather;
                    completeMatchesWithInfo.push(match);
                } catch (error) {
                    return res.status(400).json({
                        status: 'error',
                        msg: error
                    });
                }
            }
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                msg: error
            });
        }
        
        return res.status(200).json({
            status:'success',
            matches: completeMatchesWithInfo
        })
    })
    .catch(error=>{
        return res.status(400).json({
            status: "error",
            msg: error
        });
    })

};

