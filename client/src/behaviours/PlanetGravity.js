import { Behaviour } from '../core/Behaviour.js'

import { updateMovement } from '../../../shared/movement.js'

import lerp from 'lerp'

export default class PlanetGravity extends Behaviour {

  onAttach () {

    //this.object

  }

  update (dt) {

    if (!this.object.planet || !this.object.velocity)
      return false;
    
    let player = this.object
    let dir = 0
    if (player.input[PIXI.keyboard.Key.LEFT]) dir--
    if (player.input[PIXI.keyboard.Key.RIGHT]) dir++
    updateMovement(dt, player, dir)

  }

}
