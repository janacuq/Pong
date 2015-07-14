var animate =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60)
  };



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

function renderall() {
  context.clearRect(0, 0, 500, 300);
  drawPista();
  newBall.render();
  newBall.move();
  Player.render();
  Player.move();
  Computer.render();
  Computer.update();

};

//arrows functionality
Paddle.prototype.move = function(e) {
  for(var key in keysdown)
    var value = Number(key);
  if (value == 38 && this.y >= 12) {
    this.y -= this.speed;
  }
  if (value == 40 && this.y <= pista.height - this.width) {
    this.y += this.speed;
  }

};
keysdown = [];
document.addEventListener('keydown', function(e) {
 keysdown[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
  delete keysdown[e.keyCode];
});

//Ball movement
Ball.prototype.move = function() {

  this.x += this.x_speed;
  this.y += this.y_speed;
  //bounding the side walls
  if (this.y + this.radius > (pista.height + 10) || this.y - this.radius < 10) {
    this.y_speed = -this.y_speed;
  }
    
  //Machine & Player points
  else if (this.x + this.radius > pista.width + 10) {
  //  this.counterMachine += 1;
  //  document.getElementById('scoreMachine').innerHTML =                   //newBall.counterMachine;
    newBall.serve();
  } else if (this.x - this.radius < 10) {
  //  this.counterPlayer += 1;
  //  document.getElementById('scorePlayer').innerHTML = newBall.counterPlayer;
    newBall.serve();
      
  //Paddle collision
  } else if (this.x + this.radius >= (Player.x - Player.height) && this.y - this.radius >= Player.y && this.y + this.radius <= Player.y + Player.width) {

    this.y_speed = -this.y_speed + Math.random() * 1.5;
    this.x_speed = -this.x_speed + Math.random() * 2.5;
  } else if (this.x - this.radius <= (Computer.x + Computer.height) && this.y + this.radius >= Computer.y && this.y + this.radius <= Computer.y + Computer.width) {
    this.y_speed = -this.y_speed + Math.random() * 1.5;
    this.x_speed = -this.x_speed + Math.random() * 2.5;  
  }
};
//Computer paddle
Paddle.prototype.update = function() {
  Computer.y = newBall.y - (Computer.width / 2);
  if (Computer.y + Computer.width > pista.height) {
    Computer.y = pista.height - Computer.width;
  } else if (Computer.y < 12){
    Computer.y = 12;
  }
};

//Serving new ball
Ball.prototype.serve = function(){
  this.x = 50;
  this.y = 255;
  this.x += this.x_speed;
  this.y += this.y_speed;  
};
var step = function() {
  renderall();
  animate(step);
}
animate(step);