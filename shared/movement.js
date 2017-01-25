var exports = module.exports

exports.updateMovement = function (dt, player, dir) {
    let planet = player.planet

    let acc = 20
    let maxSpeed = 40

    if (dir === 0)
        player.velocity.x *= .88
    else
        player.velocity.x = Math.min( maxSpeed, Math.max( -maxSpeed, player.velocity.x + dir * acc / planet.radius * dt ))

    //apply gravity
    player.velocity.y = player.velocity.y + player.radius * planet.radius * .0001 * dt

    let
        dx = player.x - planet.x,
        dy = player.y - planet.y,
        angle = Math.atan2( dy, dx ),
        distance = Math.hypot( dx, dy )

    angle += player.velocity.x * .0001 * dt
    distance -= player.velocity.y * dt

    let minDistance = player.radius + planet.radius
    if (distance < minDistance) {
        distance = minDistance
        player.velocity.y = 0
    }

    player.x = planet.x + Math.cos( angle ) * distance
    player.y = planet.y + Math.sin( angle ) * distance
}