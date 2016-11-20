$(document).ready(){
  socket.on('connect', function(data){
    socket.emit('join', 'Hello World from client');
  });

  $("#microphone").keydown() = function(){
    hearing();
  }
}
