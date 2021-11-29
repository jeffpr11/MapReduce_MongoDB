var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController.js');
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/employment");
});

/*
 * MAPREDUCE
 */
router.get('/map_reduce', indexController.mapReduce);


router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Detail' });
});


router.get('/new', function(req, res, next) {
  res.render('detail', { title: 'New' });
});



module.exports = router;
