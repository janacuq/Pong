var b_canvas = document.getElementById("table");
var context = b_canvas.getContext("2d");

function drawPista() {
  context.beginPath();
  context.rect(10, 10, 480, 280);
  context.fillStyle = 'rgba(255, 255, 0,0.5)';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'white';
  context.stroke();
  context.closePath();
  context.beginPath();
  context.moveTo(250, 10);
  context.lineTo(250, 290);
  context.stroke();
  context.closePath();

};

var pista = {
  width: 480,
  height: 280,
};

function Paddle(x, y, height, width) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.speed = 7;  
}

Paddle.prototype.render = function() {
  context.beginPath();
  context.rect(this.x, this.y, this.height, this.width);
  context.fillStyle = '#E6EE9C';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#AFB42B';
  context.stroke()
}

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.x_speed = 2 * Math.random() * (1 * Math.random()) + 3;
  this.y_speed = 1 * Math.random() + 1;
  this.counterMachine = 0;
  this.counterPlayer = 0;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = '#1DE9B6';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#1DE9B6';
  context.stroke();
};

var newBall = new Ball(50, 255, 8);
var Player = new Paddle(475, 130, 6, 60);
var Computer = new Paddle(20, 220, 6, 60);

