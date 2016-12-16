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

var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

var wikipedia = require("wikipedia-js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/client', express.static(__dirname + '/node_modules'));
app.set('view engine', 'pug');

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
        data: 6,
        length: 103,
        color_order: pixel.COLOR_ORDER.GRB,
        board: this,
        controller: "FIRMATA"
    })

    strip.on("ready", function() {

        console.log("Strip ready, let's go");

        var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
        var current_pos = [0, 1, 2, 3, 4, 5, 6];
        var panel = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

        io.on('connection', function(socket) {
            console.log("cliente conectado");

            socket.on('light_on_blue', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("blue");
              });
              console.log(data);
            });

            socket.on('light_on_green', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("green");
              });
              console.log(data);
            });

            socket.on('light_on_yellow', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("yellow");
              });
              console.log(data);
            });

            socket.on('light_on_orange', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("orange");
              });
              console.log(data);
            });

            socket.on('light_on_red', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("red");
              });
              console.log(data);
            });

            socket.on('light_on_purple', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("purple");
              });
              console.log(data);
            });

            socket.on('light_on_pink', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("pink");
              });
              console.log(data);
            });

            socket.on('light_on_white', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              current_pos.forEach((pos) => {
                strip.pixel(pos).color("white");
              });
              console.log(data);
            });

            socket.on('light_rainbow', function(data) {
              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);
              current_pos.forEach((pos) => {
                strip.pixel(pos).color(colors[pos]);
              });
              console.log(data);
            });

            socket.on('light_rainbow_panel', function(data){
              var showColor;
              var cwi = 0;

              if (++cwi > 255) {
                  cwi = 0;
              }

              setInterval(function(){
                strip.shift(1, pixel.FORWARD, true);
                strip.show();
              }, 50);

              panel.forEach((pos) => {
                var rand = Math.random() * (255 - 1) + 1;
                showColor = colorWheel( ( cwi+rand ) & 255 );
                strip.pixel(pos).color(showColor);
              });

              console.log(data);
            });

            var twinkle_on, twinkle_clean;

            socket.on('twinkle', function(data){
              twinkle_on = setInterval( function() {
                rand = Math.floor(Math.random() * (102 - 1 + 1)) + 1;
                r =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                g =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                b =Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                strip.pixel(rand).color("rgb("+r+","+g+","+b+")");
                strip.show();
              }, 200 );

              twinkle_clean = setInterval(function(){
                strip.off();
              }, 10000);

              console.log(data);
            });

            socket.on('light_off', function(data) {
              strip.off();
              clearInterval(twinkle_on);
              clearInterval(twinkle_clean);
              console.log(data);
            });

            socket.on('search_wikipedia', function(data){
              var query = data;
              var options = {query: query, format: "html", summaryOnly: true, lang: "es"};
              wikipedia.searchArticle(options, function(err, htmlWikiText){
                if(err){
                  console.log("An error occurred[query=%s, error=%s]", query, err);
                  socket.emit('wikipedia_response', err);
                }
                console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", query, htmlWikiText);
                var regexHTML = /(<([^>]+)>)/ig,
                result = htmlWikiText.replace(regexHTML, "");
                socket.emit('wikipedia_response', result);
            });
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
