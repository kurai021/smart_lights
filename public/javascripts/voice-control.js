var artyom = new Artyom();

$(document).ready(function() {

    $("#microphone").on('touchstart mousedown', function(e){
      e.preventDefault();

      artyom.initialize({
          continuous:true,
          lang:"es-ES",
          listen:true,
          debug:true
      });
      $("#microphone").removeClass("btn-primary");
      $("#microphone").addClass("btn-danger");
    });

    $("#microphone").on("touchend mouseup", function(e){
      e.preventDefault();

      artyom.fatality();
      $("#microphone").removeClass("btn-danger");
      $("#microphone").addClass("btn-primary");
    });
});
