const EventEmitter = require('events').EventEmitter

const Player = require('../entities/Player.js')
const Unit = require('../entities/Unit.js')
const Planet = require('../entities/Planet.js')

class StateHandler extends EventEmitter {

  constructor ( clock, map ) {
    super()

    this.clock = clock

    this.entities = {}

    this.planets = map.entities.planets

    this.size = {
      width: map.width,
      height: map.height
    }

    for (let type in map.entities) {

      let layer = map.entities[type]

      for (let entity in layer) {
        this.addEntity(layer[entity])
      }

    }

  }

  createPlayer ( data ) {

    let [position, planet] = this.randomSpawn()

    let player = new Player({
      id: data.id,
      name: data.name,

      x: position.x,
      y: position.y
    })

    player.setPlanet( planet )

    this.addEntity( player )

    return player

  }

  addEntity ( instance ) {

    if ( instance.setup ) {
      instance.setup( this )
    }

    this.entities[ instance.id ] = instance

  }

  removeEntity ( entity ) {

    delete this.entities[ entity.id ]

  }

  update ( currentTime ) {

    this.clock.tick()

    // update all entities
    for ( let id in this.entities ) {

      let entity = this.entities[ id ]

      if ( entity.update ) {

        let oldPosition = { x: entity.x, y: entity.y }
        entity.update( this )

      }

    }

  }

  respawn ( player ) {

    this.clock.setTimeout(() => {

      this.addEntity ( player )
    }, 3000 )

  }

  randomSpawn () {

    let rand = Math.floor(Math.random() * this.planets.length)
    let planet = this.planets[ rand ]
    let position = {}
    position.x = planet.x
    position.y = planet.y

    let angle = Math.random() * Math.PI
    position.x += Math.cos(angle) * (planet.orbitRadius * .5 - 10)
    position.y += Math.sin(angle) * (planet.orbitRadius * .5 - 10)

    return [ position, this.planets[ rand ] ]

  }

  toJSON () {

    return {
      size: this.size,
      entities: this.entities
    }

  }

}

module.exports = StateHandler
