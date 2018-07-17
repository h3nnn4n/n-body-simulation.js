function Body(params={}) {
  if (params.position) {
    this.position = params.position;
  } else {
    this.position = createVector(floor(random(width)), floor(random(height)));
  }

  if (params.velocity) {
    this.velocity = params.velocity;
  } else {
    this.velocity = createVector(0, 0);
  }

  this.acceleration = createVector(0, 0);

  if (params.mass) {
    this.mass = params.mass;
  } else {
    this.mass = 1e8;
  }

  this.lastPosition = this.position.copy();

  this.update = function(time_step=1.0) {
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  this.show = function() {
    var dir = this.position.copy();
    dir.sub(this.lastPosition);

    dir.setMag(20);

    line(this.position.x,
         this.position.y,
         this.position.x + dir.x,
         this.position.y + dir.y);

    ellipse(this.position.x,
            this.position.y,
            10, 10);

    //text(this.position.x + ' ' + this.position.y, this.position.x + 5, this.position.y - 10);
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }
}
