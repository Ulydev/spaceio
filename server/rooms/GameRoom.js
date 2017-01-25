"use strict";

var Room = require('colyseus').Room

  , ClockTimer = require('clock-timer.js').default

  , StateHandler = require('./../handlers/StateHandler.js')

const TICK_RATE = 60

class GameRoom extends Room {

  constructor (options) {
    super(options)

    this.players = new WeakMap()

    this.clock = new ClockTimer()

    this.setState(new StateHandler( this.clock, options.map ))

    this.tickInterval = setInterval(this.tick.bind(this), 1000 / TICK_RATE)
    this.started = false
  }

  requestJoin (options) {

    return ( this.clients.length < 16 )

  }

  onJoin (client, options) {

    let player = this.state.createPlayer( {
      id: client.id,
      name: options.name
    } )

    this.players.set( client, player )

    console.log(client.id, 'joined', options)
  }

  onMessage (client, data) {
    let key = data[0]
      , value = data[1]

      , player = this.players.get( client )

    if (!player) {
      console.log("ERROR: message coming from invalid player.", data)
      return
    }

    switch ( key ) {

      case "kp":

        player.onKeyPressed( value )

        break;

      case "kr":

        player.onKeyReleased( value )

        break;

    }

  }

  onLeave (client) {

    this.state.removeEntity( this.players.get( client ) )

  }

  tick () {

    this.state.update()

  }

  onGameOver () {

    // prevent other users from entering finished game
    this.lock()

  }

  dispose () {

    clearInterval(this.tickInterval)
    console.log("dispose GameRoom", this.roomId)

  }

}

module.exports = GameRoom
