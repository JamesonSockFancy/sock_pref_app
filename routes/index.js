var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.showSubscribers);


router.get('/api/data', (req, res, next) => {

})
module.exports = router;
