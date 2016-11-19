function hearing() {
  'use strict';
  
  var commandsGroup = [{
      description: "saludar es importante!",
      smart: false,
      indexes: ["Hola", "Buenos días", "Buenas tardes", "Buenas noches", "Como estas", "Que hora es"],
      action: function(i) {
          var forHola = [
              "Hola, ¿que tal?",
              "Hola, ¿como estás?",
              "Hola, encantado de hablar contigo"
          ];

          var forBuenosDias = [
              "Buenos días",
              "Hola, ¿que tal?",
              "Hola, ¿como estás?",
              "Hola, encantado de hablar contigo"
          ];

          var forBuenasTardes = [
              "Buenas tardes",
              "Hola, ¿que tal?",
              "Hola, ¿como estás?",
              "Hola, encantado de hablar contigo"
          ];

          var forBuenasNoches = [
              "Buenas noches",
              "Hola, ¿que tal?",
              "Hola, ¿como estás?",
              "Hola, encantado de hablar contigo"
          ];

          var forComoEstas = [
              "Estoy bien, gracias",
              "Muy bien, gracias",
              "¡fresco como una lechuga!"
              "Me siento excelente este día",
              "Agradecidamente vivo y me siento de alguna forma joven y saludable"
          ];

          var forQueHoraEs = [
            "La hora es"
          ]

          switch (i) {
              case 0:
                var frase = forHola[Math.floor(Math.random() * forHola.length)];
                artyom.say(frase);
                break;
              case 1:
                var frase = forBuenosDias[Math.floor(Math.random() * forBuenosDias.length)];
                artyom.say(frase);
                break;
              case 2:
                var frase = forBuenasTardes[Math.floor(Math.random() * forBuenasTardes.length)];
                artyom.say(frase);
                break;
              case 3:
                var frase = forBuenasNoches[Math.floor(Math.random() * forBuenasNoches.length)];
                artyom.say(frase);
                break;
              case 3:
                var frase = forComoEstas[Math.floor(Math.random() * forComoEstas.length)];
                artyom.say(frase);
                break;
              case 4:
                var d = new Date();
                artyom.say("Son las " + d.getHours + ":" + d.getMinutes);

          }
      }
  }];
}

$("#microphone").keydown() = function(){
  hearing();
}
