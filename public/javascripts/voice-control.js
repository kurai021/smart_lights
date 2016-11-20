$(document).ready(function() {
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    $("#microphone").keypress(function() {
        hearing();
    });
});
