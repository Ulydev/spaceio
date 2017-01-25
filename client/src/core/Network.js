import * as Colyseus from 'colyseus.js'

const url = ( window.location.href.match(/localhost/) )
  ? "ws://localhost:3000"
  : window.location.protocol.replace("http", "ws") + "//" + window.location.host

let client = new Colyseus.Client( url )
let connectedRoom = null

export function getClientId () {
  return client.id
}

export function join ( name, options = {} ) {
  connectedRoom = client.join( name, options )
  return connectedRoom
}

export function send ( data ) {
  connectedRoom.send ( data )
}
