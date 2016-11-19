var five = require("johnny-five");
var chipio = require("chip-io");
var pixel = require("node-pixel");

var board = new five.Board({
  io: new chipio()
});

board.on("ready", function(){
  console.log("Board ready, lets add lights!");

  var strip = new pixel.Strip({
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: "I2CBACKPACK",
    strips:[8]
  })

  strip.on("ready", function(){
    console.log("Strip ready, let's go!");
    strip.color("#FF0000");

    strip.show();
  });
});

module.exports = j5;
