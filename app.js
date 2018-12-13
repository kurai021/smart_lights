var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*necesario para manejar las luces*/
var five = require("johnny-five");
var pixel = require("./node_modules/node-pixel/lib/pixel.js");

var index = require('./routes/index');
var users = require('./routes/users');

var fs = require('fs');

var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express();

var server = require('https').Server(options, app);
var io = require("socket.io")(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(__dirname + '/node_modules'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
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

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board();
var strip = null;

board.on("ready", function() {

    console.log("Board ready, lets add lights!");

    strip = new pixel.Strip({
        data: 7,
        length: 62,
        color_order: pixel.COLOR_ORDER.GRB,
        board: this,
        controller: "FIRMATA"
    })

    strip.on("ready", function() {

        console.log("Strip ready, let's go");

        var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
        var current_pos = [0, 1, 2, 3, 4, 5, 6];
        var panel = [0,1,2,3,4,5,6,7,8,9]

        io.on('connection', function(socket) {
            console.log("cliente conectado");

            var twinkle_on, twinkle_clean, light_blue, light_green, light_red, light_yellow, light_orange, light_purple, light_pink, light_white, light_rainbow, light_rainbow_panel;

            socket.on('light_on_blue', function(data) {
              light_blue = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("blue");
              });
            });

            socket.on('light_on_green', function(data) {
              light_green = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("green");
              });
            });

            socket.on('light_on_yellow', function(data) {
              light_yellow = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("yellow");
              });
            });

            socket.on('light_on_orange', function(data) {
              light_orange = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("orange");
              });
            });

            socket.on('light_on_red', function(data) {
              light_red = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("red");
              });
            });

            socket.on('light_on_purple', function(data) {
              light_purple = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("purple");
              });
            });

            socket.on('light_on_pink', function(data) {
              light_pink = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("pink");
              });
            });

            socket.on('light_on_white', function(data) {
              light_white = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("white");
              });
            });

            socket.on('light_rainbow', function(data) {
              light_rainbow = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);
              current_pos.forEach((pos) => {
                strip.pixel(pos).color(colors[pos]);
              });
            });

            socket.on('light_rainbow_panel', function(data){
              var showColor;
              var cwi = 0;

              if (++cwi > 255) {
                  cwi = 0;
              }

              light_rainbow_panel = setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              panel.forEach((pos) => {
                var rand = Math.random() * (255 - 1) + 1;
                showColor = colorWheel( ( cwi+rand ) & 255 );
                strip.pixel(pos).color(showColor);
              });

            });

            socket.on('twinkle', function(data){
              twinkle_on = setInterval( function() {
                rand = Math.floor(Math.random() * (29 - 1 + 1)) + 1;
                r =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                g =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                b =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                strip.pixel(rand).color("rgb("+r+","+g+","+b+")");
                strip.show();
              }, 200 );

              twinkle_clean = setInterval(function(){
                strip.off();
              }, 1000);

            });

            socket.on('light_off', function(data) {
              clearInterval(twinkle_on);
              clearInterval(twinkle_clean);
              clearInterval(light_red);
              clearInterval(light_blue);
              clearInterval(light_pink);
              clearInterval(light_green);
              clearInterval(light_yellow);
              clearInterval(light_white);
              clearInterval(light_purple);
              clearInterval(light_rainbow);
              strip.off();
            });

        });
    });

    // Input a value 0 to 255 to get a color value.
    // The colors are a transition r - g - b - back to r.
    function colorWheel( WheelPos ){
        var r,g,b;
        WheelPos = 255 - WheelPos;

        if ( WheelPos < 85 ) {
            r = 255 - WheelPos * 3;
            g = 0;
            b = WheelPos * 3;
        } else if (WheelPos < 170) {
            WheelPos -= 85;
            r = 0;
            g = WheelPos * 3;
            b = 255 - WheelPos * 3;
        } else {
            WheelPos -= 170;
            r = WheelPos * 3;
            g = 255 - WheelPos * 3;
            b = 0;
        }
        // returns a string with the rgb value to be used as the parameter
        return "rgb(" + r +"," + g + "," + b + ")";
    }

});

module.exports = {
    app: app,
    server: server
};
