var express = require('express');
var router = express.Router();
//console.log('aaa');
/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log('sss');
  res.render('index', { title: 'Task Board' });
});

module.exports = router;
