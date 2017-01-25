"use strict";

const Planet = require('../entities/Planet.js')

let generator = {};

generator.randomColor = function () {
  return '0x'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
}

generator.generate = function (callback) {

  let error = null;
  let map = {};

  map.width = 4096 * 2;
  map.height = 4096 * 2;

  map.entities = {
    planets: []
  };

  map.entities.planets.push(new Planet({
    x: 3900,
    y: 3850,
    radius: 120,
    color: generator.randomColor()
  }));
  map.entities.planets.push(new Planet({
    x: 4200,
    y: 4250,
    radius: 80,
    color: generator.randomColor()
  }));

  callback(error, map);
};

module.exports = generator
