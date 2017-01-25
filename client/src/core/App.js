import { createComponentSystem } from './Behaviour.js'

import SceneManager from './SceneManager'

import Clock from 'clock-timer.js'

import Tweener from 'tweener'

window.SCALE_RATIO = 1

class App {

  constructor () {

    this.clock = new Clock();
    this.tweens = new Tweener();

    this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {
      // resolution: window.devicePixelRatio,
      antialias: true
    })

    this.renderer.backgroundColor = config.colors.back

    document.body.appendChild(this.renderer.view)

    this.sceneManager = new SceneManager(SCALE_RATIO)

    this.renderer.view.width = window.innerWidth
    this.renderer.view.height = window.innerHeight

    if (this.renderer.view.width > window.innerWidth) {
      this.renderer.view.style.position = "absolute"
      this.sceneManager.x = (window.innerWidth - this.renderer.view.width) / 2
    }

    this.componentSystem = createComponentSystem( PIXI.DisplayObject )

    window.addEventListener( 'resize', this.onResize.bind(this) )
  }

  onResize ( e ) {
    this.renderer.resize( window.innerWidth, window.innerHeight )
  }

  update () {
    window.requestAnimationFrame( this.update.bind( this) )
    this.clock.tick()

    this.tweens.update(this.clock.deltaTime)
    this.componentSystem.update(this.clock.deltaTime)

    this.renderer.render(this.sceneManager)

    //PIXI.keyboardManager.update()
  }

}

module.exports = new App
