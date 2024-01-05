const express = require('express');
const router = express.Router();
const teamsManager = require('../controllers/teamManagerController');
const footballController = require("../controllers/footballController")

// football endpoints
router.get('/getLeagues', footballController.getLeagues);
router.get('/getTeamsByLeagueId', footballController.getTeamsByLeagueId);
router.get('/getTeamInfoById', footballController.getTeamInfoById);
router.post('/getMatchesOfInterest', footballController.getMatchesOfInterest);

// teamsManager
router.get('/userTeamsOfInterest', teamsManager.userTeamsOfInterest);
router.post('/addTeamOfInterest', teamsManager.addTeamOfInterest);
router.post('/removeTeamOfInterest', teamsManager.removeTeamOfInterest);


module.exports = router;