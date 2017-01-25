import Resources from './core/Resources.js'
import GameScene from './scenes/GameScene.js'

import { Howl } from 'howler'
App.sound = new Howl( require('./data/audio.json') )

var keyboard = require('pixi-keyboard')

Resources.load(function () {

  App.sceneManager.goTo( GameScene )
  App.update()

})
