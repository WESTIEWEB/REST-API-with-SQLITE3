const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user') 

router.post('/signup',usersController.signup);
router.post('/signin',usersController.login)
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
