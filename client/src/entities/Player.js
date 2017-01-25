import Unit from './Unit.js'

import RespawnCountdown from '../behaviours/RespawnCountdown.js'

import { getClientId } from '../core/Network.js'

export default class Player extends Unit {

  constructor ( options ) {

    super( options, true )

    this.isCurrentPlayer = (getClientId() === options.id)

    this.name = new PIXI.Text(options.name, {
      font: '14px Arial',
      fill: config.colors.element,
      align: 'center',
      stroke: config.colors.stroke,
      strokeThickness: 1
    })
    this.name.anchor.set( 0.5 )
    this.name.y = this.circle.y + this.circle.height / 2

    this.addChild( this.name )

    this.on('removed', this.onRemovedFromContainer.bind( this ) )

  }

  update () {

  }

  onRemovedFromContainer ( container ) {

    this.getEntity().detachAll()

    if ( this.isCurrentPlayer ) {
      container.parent.getEntity().detachAll()
      container.parent.addBehaviour( new RespawnCountdown, this )
    }

  }

}
