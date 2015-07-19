var animate =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };

//cancel animation
window.cancelRequestAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();


var b_canvas = document.getElementById("table");
var context = b_canvas.getContext("2d");
var colors = ['#80cbc4', '#80deea', '#81d4fa', '#a5d6a7', '#c5e1a5', '#e6ee9c', '#ffcc80', '#f48fb1', '#ce93d8', '#ef9a9a', '#bcaaa4 '];

function drawCourt() {
    context.beginPath();
    context.rect(10, 10, 480, 280);
    //toogle background-color Court
    if (!Player.collision) {

        context.fillStyle = '#80cbc4';
    } else {

        context.fillStyle = '#ffcc80';
    }
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


var Court = {
    width: 480,
    height: 280,
    margin: 10,
};
//Paddle and Ball constructors
function Paddle(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = 7;
    this.collision = false;
}



var newBall = new Ball(50, 255, 8);
var Player = new Paddle(475, 130, 6, 60);
var Computer = new Paddle(20, 220, 6, 60);



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
    Computer.y = newBall.y - (Computer.width / 2);
  // var diff = newBall.y - Computer.y
  // if (diff > 10) diff = 10;
  // Computer.y = Computer.y + diff;
    if (Computer.y + Computer.width > Court.height + Court.margin) {
        Computer.y = Court.height - Computer.width + Court.margin - 2;
    } else if (Computer.y < Court.margin) {
        Computer.y = Court.margin;
    }
};


//updating objects
function renderall() {
    context.clearRect(0, 0, 500, 300);
    drawCourt();
    newBall.render();
    newBall.move();
    Player.render();
    Player.move();
    Computer.render();
    Computer.update();
    mousemove();

};


var init;
var step = function () {
    renderall();
    init = animate(step);
}
animate(step);


//arrows functionality
Paddle.prototype.move = function (e) {
    for (var key in keysdown)
        var value = Number(key);
    if (value == 38 && this.y >= Court.margin + 4) {
        this.y -= this.speed;
    }
    if (value == 40 && this.y <= Court.height - this.width + Court.margin - 4) {
        this.y += this.speed;
    }

};
keysdown = [];
document.addEventListener('keydown', function (e) {
    keysdown[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    delete keysdown[e.keyCode];
});

//mousemove
mouse = {};
b_canvas.addEventListener("mousemove", trackPosition, true);

function trackPosition(e) {
    mouse.y = e.pageY;
}
function mousemove() {
    if (mouse.y) {
        Player.y = mouse.y - Player.width * 2;
        if (Player.y >= Court.height - Player.width) {
            Player.y = Court.height - Player.width + Court.margin;
        } else if (Player.y <= Court.margin) {
            Player.y = Court.margin;

        }
        mouse = {};
    }
};


