const uniqid = require('uniqid')
const Unit = require('./Unit.js')

const config = require('../config.js')

class Planet {

  constructor ( data ) {

    this.type = 'planet'

    this.x = data.x
    this.y = data.y

    this.id = data.id || uniqid()

    this.color = data.color

    this.radius = data.radius || Math.random() * 50 + 100

    this.orbitRadius = data.orbitRadius || this.radius + 120

  }

  setup ( state ) {

    //

  }

}

module.exports = Planet
