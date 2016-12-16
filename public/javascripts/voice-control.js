$(document).ready(function() {

    $("#microphone").mousedown(function() {
      artyom.initialize({
          continuous:true,
          lang:"es-CO",
          listen:true,
          debug:true
      });
      $("#microphone").removeClass("btn-primary");
      $("#microphone").addClass("btn-danger");
    });

    $("#microphone").mouseup(function() {
        artyom.fatality();
        $("#microphone").removeClass("btn-danger");
        $("#microphone").addClass("btn-primary");
    });
});
