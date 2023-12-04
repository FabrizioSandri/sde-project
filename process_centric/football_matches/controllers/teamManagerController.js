const axios = require('axios');

module.exports.userTeams = (req,res)=>{
    if(!req.body.userId){
        return res.status(400).json({
            status:'error',
            msg:'user not authenticated'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/getTeams`;
    const options={
        method: 'GET',
        url: db_endpoint,
        params:{
          userId: req.body.userId 
        }
    }
    axios.request(options)
    .then((response)=>{
        
        if(response.status != 200){
            res.status(400).json({
                status: "error",
                result: response.data.msg
            });    
        }
        res.status(200).json({
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

module.exports.addTeam = (req,res)=>{
    if(!req.body.userId){
        return res.status(400).json({
            status:'error',
            msg:'user not authenticated'
        });
    }
    if(!req.body.teamId || !req.body.leagueId){
        return res.status(400).json({
            status:'error',
            msg:'invalid tema or league id'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/addTeam`;
    const options={
        method: 'POST',
        url: db_endpoint,
        data:{
          userId: req.body.userId,
          leagueId: req.body.leagueId,
          teamId: req.body.teamId 
        }
    }
    axios.request(options)
    .then((response)=>{
        if(response.status != 200){
            res.status(400).json({
                status: "error",
                result: response.data.msg
            });    
        }
        res.status(200).json({
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

module.exports.removeTeam = (req,res)=>{
    if(!req.body.userId){
        return res.status(400).json({
            status:'error',
            msg:'user not authenticated'
        });
    }
    if(!req.body.teamId ){
        return res.status(400).json({
            status:'error',
            msg:'invalid team id'
        });
    }
    let db_endpoint = `http://db_adapter:${process.env.DB_ADAPTER_SERVER_PORT}/removeTeam`;
    const options={
        method: 'DELETE',
        url: db_endpoint,
        params:{
          userId: req.body.userId,
          teamId: req.body.teamId 
        }
    }
    axios.request(options)
    .then((response)=>{
        if(response.status != 200){
            res.status(400).json({
                status: "error",
                result: response.data.msg
            });    
        }
        res.status(200).json({
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