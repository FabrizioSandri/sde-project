const axios = require('axios');

module.exports.userTeamsOfInterest = (req,res)=>{
    if(!req.query.token){
        return res.status(401).json({
            status:'error',
            msg:'token not provided'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/getTeams`;
    const options={
        method: 'GET',
        url: db_endpoint,
        params: {
          token: req.query.token
        }
    }
    axios.request(options)
    .then((response)=>{
        return res.status(200).json({
            status: "success",
            result: response.data.result
        });
    })
    .catch(error=>{
        return res.status(400).json({
            status: "error",
            msg: error
        })
    })
};

module.exports.addTeamOfInterest = (req,res)=>{
    if(!req.body.token){
        return res.status(401).json({
            status:'error',
            msg:'token not provided'
        });
    }
    if(!req.body.teamId || !req.body.leagueId){
        return res.status(400).json({
            status:'error',
            msg:'invalid team or league id'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/addTeam`;
    const options={
        method: 'POST',
        url: db_endpoint,
        data:{
          token: req.body.token,
          leagueId: req.body.leagueId,
          teamId: req.body.teamId 
        }
    }
    axios.request(options)
    .then((response)=>{
        return res.status(200).json({
            status: "success",
            result: response.data.msg
        });
    })
    .catch(error=>{
        return res.status(400).json({
            status: "error",
            msg: error
        })
    })
};

module.exports.removeTeamOfInterest = (req,res)=>{
    if(!req.body.token){
        return res.status(401).json({
            status:'error',
            msg:'token not provided'
        });
    }
    if( !req.body.teamId ){
        return res.status(400).json({
            status:'error',
            msg:'invalid team id'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/removeTeam`;
    const options={
        method: 'DELETE',
        url: db_endpoint,
        params: {
          token: req.body.token,
          teamId: req.body.teamId 
        }
    }
    axios.request(options)
    .then((response) => {
        return res.status(200).json({
            status: "success",
            result: response.data.msg
        });
    })
    .catch(error=>{        
        return res.status(400).json({
            status: "error",
            msg: error
        })
    })
};