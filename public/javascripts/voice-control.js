$(document).ready(function() {
    socket.on('connect', function(data) {
        socket.emit('join');
    });

    $("#microphone").mousedown(function() {
      artyom.initialize({
          continuous:true,
          lang:"es-CO",
          listen:true,
          debug:true
      });
    });

    $("#microphone").mouseup(function() {
        artyom.fatality();
        console.log("apagado...")
    });
});
