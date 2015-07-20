//Paddle constructor
function Paddle(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = 7;
    this.collision = false;
}

//Paddle functions
Paddle.prototype.render = function () {
    context.beginPath();
    context.rect(this.x, this.y, this.height, this.width);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fill();
    context.lineWidth = 2;
};

//Computer paddle
Paddle.prototype.update = function () {
    
  var diff = newBall.y - Computer.y -10;
  if (diff > 5) {
    diff = 5;
  }
  Computer.y = Computer.y + diff;
    if (Computer.y + Computer.width > Court.height + Court.margin) {
        Computer.y = Court.height - Computer.width + Court.margin - 2;
    } else if (Computer.y < Court.margin) {
        Computer.y = Court.margin;
    }
};

