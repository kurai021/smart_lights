'use strict';

function hearing() {

  var commandsGroup = [{
      description: "saludar es importante!",
      smart: false,
      indexes: ["Hola", "Buenos días", "Buenas tardes", "Buenas noches", "Como estas", ],
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
              "¡fresco como una lechuga!",
              "Me siento excelente este día",
              "Agradecidamente vivo y me siento de alguna forma joven y saludable"
          ];

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
              case 4:
                var frase = forComoEstas[Math.floor(Math.random() * forComoEstas.length)];
                artyom.say(frase);
                break;

          }
      }
  },

  {
    description: "Ordenes",
    smart: false,
    indexes: ["que hora es","encender luces","apagar luces"],
    action: function(i){
      var forHora = [
        "son las",
        "la hora es"
      ];

      switch(i){
        case 0:
          var d = new Date();
          var frase = forComoEstas[Math.floor(Math.random() * forComoEstas.length)];
          artyom.say(frase + " " + d.getHours + ":" + d.getMinutes);
          break;
        case 1:
          artyom.say('encendiendo luces');
          console.log(data);
          client.emit('light_on');
        case 2:
          artyom.say('apagando luces');
          console.log(data);
          client.emit('light_off');
      }
    }
  }];
  artyom.addCommands(commandsGroup);
}
