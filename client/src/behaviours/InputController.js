import { Behaviour } from '../core/Behaviour.js'
import { send } from '../core/Network.js'

import lerp from 'lerp'

export default class InputController extends Behaviour {

  onAttach ( entity ) {

    this.entity = entity

    this.entity.input = []

    PIXI.keyboardManager.on( 'pressed', this.onKeyPressed.bind( this ) )
    PIXI.keyboardManager.on( 'released', this.onKeyReleased.bind( this ) )

  }

  update () {

  }

  onKeyPressed ( pressedKey ) {
    
    this.entity.input[pressedKey] = true

    send(['kp', pressedKey])

  }

  onKeyReleased ( releasedKey ) {

    this.entity.input[releasedKey] = false

    send(['kr', releasedKey])

  }

  onDetach () {
    console.log( "InputController detached!" )
  }

}
