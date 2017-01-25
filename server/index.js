"use strict";

var tmxParser = require('tmx-parser')

  , colyseus = require('colyseus')
  , http = require('http')

  , path = require('path')

  , express = require('express')
  , cors = require('cors')

  , port = process.env.PORT || 3000
  , app = express()
  , server = http.createServer(app)
  , gameServer = new colyseus.Server({ server: server })

  , GameRoom = require('./rooms/GameRoom')

  , generator = require('./maps/generator')

generator.generate(function (err, map) {
  if (err) throw err;
  console.log("Generated map: " + map)
  gameServer.register('battle', GameRoom, { map: map })
})

if (process.env.ENVIRONMENT !== "production") {
  app.use(cors())
} else {
  var whitelist = ['http://talk.itch.zone'];
  app.use(cors({
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    }
  }))
}

let servePath = path.resolve( __dirname + '/../client/public');

app.use(express.static( servePath ));

server.listen(port);

console.log(`Listening on http://localhost:${ port }\nServing folder: ${ servePath }`);
