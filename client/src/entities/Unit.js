export default class Unit extends PIXI.Container {

  constructor ( options, hasBorder = false ) {

    super()

    this.radius = config.circleRadius

    this.circle = new PIXI.Graphics()

    if (hasBorder) {
      this.circle.lineStyle ( 1 , 0x000000, 0.8 )
    }

    this.circle.beginFill( config.colors.main )
    this.circle.drawCircle( 0, 0, this.radius )

    this.addChild( this.circle )

  }

  kill () {

    App.tweens.add( this.scale ).to( { x: 0.3, y: 0.3 }, 800, Tweener.ease.quadOut )

    App.tweens.add( this ).to( { alpha: 0 }, 800, Tweener.ease.quadOut ).then( () => {

      this.parent.removeChild( this )

    })

  }

}
