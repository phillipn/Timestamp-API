var http = require('http');
var express = require('express');
var app = express();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

function parseTime(time) {
  var regToUnix = Date.parse(time);
  var unixToReg = new Date(+time);
  
  if(!time.match(/^\d+$/) && regToUnix){
    time = new Date(time);
    return {
      natural: months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear(),
      unixtime: regToUnix
    };
  } else if (unixToReg !== 'Invalid Date') {
    return {
      natural: months[unixToReg.getMonth()] + ' ' + unixToReg.getDate() + ', ' + unixToReg.getFullYear(),
      unixtime: time
    };
  } else {
    return {
      natural: null,
      unixtime: null
    };
  }
}

app.get('/:date?', function(req, res){
  var params = req.params.date;
  if(!params){
    res.render('home');
  } else {
    if(params !== 'favicon.ico'){
      res.end(JSON.stringify(parseTime(params)));
    }
  }
})
///changed?
var server = http.createServer(app).listen((process.env.PORT) || 3000);
