const express = require('express');
const router = express.Router();
const teamsManager = require('../controllers/teamManagerController');
const footballController = require("../controllers/footballController")

// football endpoints
router.get('/getLeagues', footballController.getLeagues);
router.get('/getUserInfo', footballController.getTeamsByLeagueId);
router.get('/getTeamInfoById', footballController.getTeamInfoById);
router.post('/getMatchesOfInterest', footballController.getMatchesOfInterest);

// teamsManager
router.post('/userTeams', teamsManager.userTeams);
router.post('/addTeam', teamsManager.addTeam);
router.post('/removeTeam', teamsManager.removeTeam);


module.exports = router;