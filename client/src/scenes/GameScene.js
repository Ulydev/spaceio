import { join, getClientId } from '../core/Network.js'

import Player from '../entities/Player.js'
import Unit from '../entities/Unit.js'
import Planet from '../entities/Planet.js'

import ViewportFollow from '../behaviours/ViewportFollow.js'
import MovementInterpolation from '../behaviours/MovementInterpolation.js'
import InputController from '../behaviours/InputController.js'
import Velocity from '../behaviours/Velocity.js'
import PlanetFinder from '../behaviours/PlanetFinder.js'
import PlanetGravity from '../behaviours/PlanetGravity.js'
import Collision from '../behaviours/Collision.js'

export default class GameScene extends PIXI.Container {

  constructor () {

    super()

    this.scenery = new PIXI.Container()
    this.addChild( this.scenery )

    this.entityLayer = new PIXI.Container()
    this.addChild( this.entityLayer )

    this.topLayer = new PIXI.Container()
    this.addChild( this.topLayer )

    this.entities = {}
    this.respawnCount = 0

    this.room = join( 'battle', { name: window.prompt("Enter your nickname") || "" } )

    this.room.onError.add( ( err ) => console.error( arguments ) )

    this.on( 'dispose', this.onDispose.bind(this) )

    this.bindListeners( this.room )

  }

  bindListeners ( room ) {

    room.state.listen("entities", "add", (value) => {
      this.createEntities( value )
    })

    room.state.listen("entities/:id", "add", (id, value) => {
      if ( ! this.entities[id] ) {
        this.createEntity(id, value)
      }
    })

    let nested = (id, p1, p2, value) => {

      if (value === undefined) { //level 1 nest
        value = p2
        p2 = null
      }

      if ( ! this.entities[id].remote ) {
        this.entities[id].remote = {}
      }

      if ( p2 !== null ) {
        if ( ! this.entities[id].remote[p1] ) {
          this.entities[id].remote[p1] = {}
        }
        this.entities[id].remote[p1][p2] = value
      } else {
        this.entities[id].remote[p1] = value
      }

    }
    room.state.listen("entities/:id/:id", "add", nested)
    room.state.listen("entities/:id/:id", "replace", nested)
    room.state.listen("entities/:id/:id/:id", "add", nested)
    room.state.listen("entities/:id/:id/:id", "replace", nested)

    room.state.listen("entities/:id", "remove", (id) => {
      if ( this.entities[id] ) {
        this.entities[id].kill()
        delete this.entities[id]
      }
    })

    // check for unhandled patches
    room.state.listen((path, operation, value) => {
      console.log("unhandled: ", path, operation, value);
    });

  }

  createEntities ( entities ) {

    /*
    this.grass.width = state.size.width
    this.grass.height = state.size.height
    */

    for ( let id in entities ) {

      let entity = entities[ id ]
      this.createEntity ( id, entity )

    }

  }

  createEntity ( entityId, data ) {

    if ( ! data ) return

    let entity = null

    switch ( data.type ) {

      case "player":

        entity = new Player( data )

        if ( entityId === getClientId() ) {

          if ( this.respawnCount > 0 ) {
            App.sound.play('respawn')
          }

          this.respawnCount++
          this.addBehaviour( new ViewportFollow, entity )
          this.addBehaviour( new InputController, entity )

          this.addBehaviour( new PlanetFinder, entity ) //attach once to only one entity

          entity.addBehaviour( new Velocity, entity )
          entity.addBehaviour( new PlanetGravity, entity )
          entity.addBehaviour( new Collision, entity )

        }

        break;

      case "planet":

        entity = new Planet( data )

        break;

    }

    if ( !entity ) {
      console.warn( "couldn't create entity. ", data )
      return
    }

    this.entityLayer.addChild( entity )
    this.entities[ entityId ] = entity

    // entity entering animation
    App.tweens.add( entity ).from({ opacity: 0 }, 600, Tweener.ease.quadOut)
    App.tweens.add( entity.scale ).from({ x: 0.4, y: 0.4 }, 500, Tweener.ease.bounceOut)

    if ((data.x || data.y)) {
      if (entityId !== getClientId())
        entity.addBehaviour(new MovementInterpolation)
      entity.x = data.x
      entity.y = data.y
    }

    return entity
  }

  onDispose () {



  }

}
