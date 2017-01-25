import { Behaviour } from '../core/Behaviour.js'

import lerp from 'lerp'

export default class PlanetFinder extends Behaviour {

  onAttach (entity) {

    this.entity = entity

    this.entity.planet = null

  }

  update (dt) {

    for ( let id in this.object.entities ) {

      let entity = this.object.entities[ id ]
      if (entity.orbit && entity.x && entity.y) { //TODO: better check
        let dist = Math.hypot( this.entity.x - entity.x, this.entity.y - entity.y )
        if (dist < this.entity.circle.height + entity.planet.height) {
          this.entity.planet = entity;
          break;
        }
      }

    }

  }

}
