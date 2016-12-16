(function(window){

  'use strict';

  var commandsGroup = [{
      description: "saludar es importante!",
      smart: false,
      indexes: ["Hola", "Buenos días", "Buenas tardes", "Buenas noches", "Cómo estás", ],
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
    indexes: ["qué hora es", "apagar luces", "activar arcoiris", "panel arcoiris", "luces parpadeantes"],
    smart: false,
    action: function(i){
      var forHora = [
        "son las",
        "la hora es"
      ];

      switch(i){
        case 0:
          var d = new Date();
          var frase = forHora[Math.floor(Math.random() * forHora.length)];
          artyom.say(frase + " " + d.getHours() + ":" + d.getMinutes());
          break;
        case 1:
          artyom.say('luces apagadas');
          socket.emit('light_off', 'luces apagadas...');
          break;
        case 2:
          artyom.say('luces arcoiris');
          socket.emit('light_rainbow', 'luces arcoiris...');
          break;
        case 3:
          artyom.say('luces panel arcoiris');
          socket.emit('light_rainbow_panel', 'luces panel arcoiris');
          break;
        case 4:
          artyom.say('luces parpadeantes');
          socket.emit('twinkle', 'luces parpadeantes');
          break;
      }
    }
  },

  {
    description: "Ordenes para luces",
    indexes: ["encender luces *"],
    smart: true,
    action: function(i,wildcard){
      wildcard = wildcard || "";

      switch(wildcard.toLowerCase()){
        case "azules":
          artyom.say("luces azules encendidas");
          socket.emit('light_on_blue', 'luces encendidas...');
        break;

        case "verdes":
          artyom.say("luces verdes encendidas");
          socket.emit('light_on_green', 'luces encendidas...');
        break;

        case "amarillas":
          artyom.say("luces amarillas encendidas");
          socket.emit('light_on_yellow', 'luces encendidas...');
        break;

        case "anaranjadas":
          artyom.say("luces anaranjadas encendidas");
          socket.emit('light_on_orange', 'luces encendidas...');
        break;

        case "rojas":
          artyom.say("luces rojas encendidas");
          socket.emit('light_on_red', 'luces encendidas...');
        break;

        case "púrpura":
          artyom.say("luces purpura encendidas");
          socket.emit('light_on_purple', 'luces encendidas...');
        break;

        case "rosas":
          artyom.say("luces rosas encendidas");
          socket.emit('light_on_pink', 'luces encendidas...');
        break;

        case "blancas":
          artyom.say("luces blancas encendidas");
          socket.emit('light_on_white', 'luces encendidas...');
        break;
      }
    }
  },
  {
    description: "Orden wikipedia",
    indexes: ["Buscar * en Wikipedia"],
    smart: true,
    action: function(i, wildcard){
      artyom.say('buscando ' + wildcard);
      socket.emit('search_wikipedia', wildcard);
      socket.on('wikipedia_response', function(data){
        artyom.say(data);
      });
    }
  },
  {
    description: "silencio",
    indexes: ["Silencio"],
    smart: false,
    action: function(){
      artyom.shutUp();
    }
  }
];
  artyom.addCommands(commandsGroup);
})(window);
