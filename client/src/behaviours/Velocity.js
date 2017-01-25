import { Behaviour } from '../core/Behaviour.js'

import lerp from 'lerp'

export default class Velocity extends Behaviour {

  onAttach () {

    this.object.velocity = {
      x: 0,
      y: 0
    }

  }

  update (dt) {

    if (this.object.planet === null) { //if player has planet, velocity is local
      this.object.x += this.object.velocity.x * dt
      this.object.y += this.object.velocity.y * dt
    }

  }

}
