var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*necesario para manejar las luces*/
var five = require("johnny-five");
var chipio = require("chip-io");
var pixel = require("node-pixel");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(__dirname + '/node_modules'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var board = new five.Board({
  io: new chipio()
});

board.on("ready", function(){

  console.log("Board ready, lets add lights!");

  var strip = new pixel.Strip({
    board: this,
    controller: "I2CBACKPACK",
    bus: 2,
    strips:[8]
  })

  strip.on("ready", function(){
    console.log("luces listas!");
  });

  io.on('connection', function(socket){
    console.log("cliente conectado");

    socket.on('light_on', function(data){
      console.log(data);
      strip.color("#ff0000");
      strip.show;
    });

    socket.on('light_off', function(data){
      console.log(data);
      strip.color("#000000");
      strip.show;
    });
  });

});


module.exports = {app: app, server: server};
