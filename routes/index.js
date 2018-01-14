var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time', function(req, res){
  var date = req.params.time;
  var unix = null;
  var natural = null;

  // Check for initial unix time
  if (+date >= 0) {
    unix = +date;
    natural = unixToNat(unix);
  }

  // Check for initial natural time
  if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
    unix = natToUnix(date);
    natural = unixToNat(unix);
  }

  var dateObj = { 'unix' : unix, 'natural' : natural };
  res.json(dateObj);
})

  function natToUnix(date) {
  // Conver from natural date to unix timestamp
    return moment(date, "MMMM D, YYYY").format("X");
  }

  function unixToNat(unix) {
    // Convert unix timestamp to natural date
    return moment.unix(unix).format("MMMM D, YYYY");
  }

module.exports = router;
