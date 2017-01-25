const uniqid = require('uniqid')
const config = require('../config.js')

class Unit {

  constructor ( data ) {

    this.x = data.x
    this.y = data.y

    this.type = 'unit'

    this.id = data.id || uniqid()
    //this.data = data

    this.radius = 24

  }

  update ( state ) {

    //

  }

}

module.exports = Unit
