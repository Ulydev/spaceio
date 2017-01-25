import { Behaviour } from '../core/Behaviour.js'

import lerp from 'lerp'

export default class Collision extends Behaviour {

  onAttach () {

    //this.object

  }

  update (dt) {

    if (!this.object.planet || !this.object.velocity)
      return false;

    //

  }

}
