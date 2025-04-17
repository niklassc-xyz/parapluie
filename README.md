# parapluie

<p align="center">
<img src="parapluie.svg" width="25%">
<br>
A simple, build- and dependency-free JavaScript engine
</p>


## Variables

| Variable     | Description                      |
| ------------ | -------------------------------- |
| roomWidth    | Room size (not canvas size)      |
| roomHeight   | Room size (not canvas size)      |
| canvasWidth  | TODO replace with canvas.width?  |
| canvasHeight | TODO replace with canvas.height? |
| room         | Stores active room               |

## Room

All rooms extend the Room class. Stores list of objects `objects` and creates
objects.

Each room can optionally be initialized with a `returnRoom` (use
`Game.gotoRoom`). When `Room.return` is called it will return to this room.

## step() and draw()

In each interval first step() and then draw() from the room is called. In the
superclass Room the list of objects `objects` is traversed and step() or resp.
draw() of each object is called.

Each room and each object should always call super.step() or super.draw() if
they override one of these methods.

The step() method is used for non-visible functional changes and the draw()
method then draws on the canvas.

## Entities

### Coordinates

Each GameEntity has coordinates x and y which define the x and y value on the
in the room.
When the canvas is scaled to a different size, these values do not match the
coordinates on the canvas any more.
Use variables xScalar and yScalar to scale internal distances and xD and yD
for coordinates mapped to the screen.

| Variable | Description                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| x        | x-coordinate in the room                                                                                                              |
| y        | y-coordinate in the room                                                                                                              |
| width    | Entity-width in room                                                                                                                  |
| height   | Entity-heigh in room                                                                                                                  |
| ox       | Origin-variable (Usually when a sprite is drawn at point (x,y) top-left corner will be at this coordinate, this describes the offset) |
| oy       | Origin-variable                                                                                                                       |

### Entity types

* `GameEntity` (Most basic class that can be added to the game loop, has `step` and `draw`)
* `PhysicalEntity` (Extends `GameEntity`, has coordinates, dimension, collision, speeds, direction)
* `SpriteEntity` (Extends `PhysicalEntity`, has Sprite)
