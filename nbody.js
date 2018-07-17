var bodies = [];
var G_const = 6.67408e-11;

function setup() {
  var cnv = createCanvas(800, 600);

  var star = {};
  star.mass = 3e10;
  star.position = createVector(width / 2, height / 2);
  bodies[0] = new Body(star);

  var p1 = {};
  p1.mass = 4e10;
  p1.position = createVector(width / 2 + 200, height / 2);
  p1.velocity = createVector(0, 1.2);
  bodies[1] = new Body(p1);

  var p2 = {};
  p2.mass = 5e10;
  p2.position = createVector(width / 2 - 200, height / 2);
  p2.velocity = createVector(0, 1.2);
  bodies[2] = new Body(p2);
}

function draw() {
  background(255);

  for (var i = 0, len = bodies.length; i < len; i++) {
    bodies[i].applyForce(get_acceleration_for_one_body(i));
    bodies[i].update();
    bodies[i].show();
  }
}

function get_acceleration_for_one_body(body_index) {
  var acceleration = createVector(0, 0);
  var target_body = bodies[body_index];
  for (var i = 0, len = bodies.length; i < len; i++) {
    if (i != body_index) {
      var external_body = bodies[i];
      var r = Math.sqrt((target_body.position.x - external_body.position.x)**2 + (target_body.position.y - external_body.position.y)**2);
      var tmp = G_const * external_body.mass / r**3;
      acceleration.x += tmp * (external_body.position.x - target_body.position.x);
      acceleration.y += tmp * (external_body.position.y - target_body.position.y);
    }
  }

  return acceleration;
}
