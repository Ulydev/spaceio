import { Behaviour } from '../core/Behaviour.js'

import lerp from 'lerp'

//Client side interpolation

export default class MovementInterpolation extends Behaviour {

  onAttach () {

    this.object.remote = {}

  }

  update (dt) {

    let nextPosition = {
      x: this.object.remote.x,
      y: this.object.remote.y
    }

    if ( nextPosition.x ) this.object.x = lerp(this.object.x, nextPosition.x, .1)
    if ( nextPosition.y ) this.object.y = lerp(this.object.y, nextPosition.y, .1)

  }

}
