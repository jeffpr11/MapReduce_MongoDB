var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/employment");
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Detail' });
});

router.get('/new', function(req, res, next) {
  res.render('detail', { title: 'New' });
});

router.get('/map_reduce', function(req, res, next) {
  res.render('map_reduce', { title: 'Map Reduce' });
});


module.exports = router;
