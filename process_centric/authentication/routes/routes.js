const express = require('express');
const router = express.Router();
const passport = require('../controllers/passport').passport;
const normal_controller = require("../controllers/normal_controller")
const oauth_controller = require("../controllers/oauth_controller")
const isAuthenticated = require("../middleware/middleware").isAuthenticated

router.get('/', (req, res) => {
  res.send('Welcome to the authentication interface');
});

// Normal authentication
router.post('/login', normal_controller.login);
router.post('/registration', normal_controller.registration);

// Oauth authentication
router.get('/google/authenticate', oauth_controller.authenticate);
router.get('/google/callback', oauth_controller.callback, oauth_controller.afterLogin);
router.get('/google/getUserData', isAuthenticated, oauth_controller.getUserData);
router.get('/google/isAuthenticated', oauth_controller.isAuthenticated);
router.get('/google/logout', oauth_controller.logout);


module.exports = router;