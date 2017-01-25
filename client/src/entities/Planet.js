export default class Planet extends PIXI.Container {

  constructor ( options, hasBorder = false ) {

    super()

    this.radius = options.radius
    this.orbitRadius = options.orbitRadius

    this.orbit = new PIXI.Graphics()
    this.orbit.beginFill( config.colors.stroke, 0.5 )
    this.orbit.drawCircle( 0, 0, this.orbitRadius )

    this.planet = new PIXI.Graphics()
    this.planet.lineStyle ( 1 , config.colors, 0.8 );
    this.planet.beginFill( options.color );
    this.planet.drawCircle( 0, 0, this.radius );

    this.addChild( this.orbit )
    this.addChild( this.planet )

  }

  kill () {

    App.tweens.add( this.scale ).to( { x: 0.3, y: 0.3 }, 800, Tweener.ease.quadOut )

    App.tweens.add( this ).to( { alpha: 0 }, 800, Tweener.ease.quadOut ).then( () => {

      this.parent.removeChild( this )

    })

  }

}
