const Unit = require('./Unit.js')
const Key = require('../keys.js')

const movement = require('../../shared/movement.js')

class Player extends Unit {

  constructor ( options ) {

    super ( options )

    this.type = 'player'
    this.name = options.name

    this.acceleration = .0015
    this.speed = 0.25

    this.radius = 24 //FIXME:

    this.velocity = { x: 0, y: 0 }

    this.isGrounded = false

    this.jumpHeight = .35

    this.input = {}

    this.planet = null

  }

  onKeyPressed ( key ) {
    this.input[key] = true

    if (key == Key.SPACE && this.hasPlanet() && this.isGrounded)
      this.jump()
  }

  onKeyReleased ( key ) {
    this.input[key] = false
  }

  setPlanet ( planet ) {
    this.planet = planet
  }

  hasPlanet () {
    return this.planet !== null
  }

  update ( state ) {

    if (!this.planet || !this.velocity)
      return false;
    
    let player = this.object
    let dir = 0
    if (this.input[Key.LEFT]) dir--
    if (this.input[Key.RIGHT]) dir++
    movement.updateMovement(state.clock.deltaTime, this, dir)

  }

  jump () {

    let
      x = this.position.x - this.planet.position.x,
      y = this.position.y - this.planet.position.y,
      angle = Math.atan2( y, x ),
      vec = { x: Math.cos( angle ) * this.jumpHeight, y: Math.sin( angle ) * this.jumpHeight }

    this.velocity.x = vec.x
    this.velocity.y = vec.y

  }

}

module.exports = Player
