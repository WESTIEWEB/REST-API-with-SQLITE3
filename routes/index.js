const express = require('express');
const router = express.Router();

const userRoutes = require('./users')
const productRoutes = require('./product')

router.use('/', userRoutes)
router.use('/product', productRoutes)
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
