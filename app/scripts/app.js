var animate =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };



var b_canvas = document.getElementById("table");
var context = b_canvas.getContext("2d");

function drawPista() {
    context.beginPath();
    context.rect(10, 10, 480, 280);
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


var pista = {
    width: 480,
    height: 280,
    margin: 10,
};

function Paddle(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = 7;
    this.collision = false;
}

Paddle.prototype.render = function () {
    context.beginPath();
    context.rect(this.x, this.y, this.height, this.width);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fill();
    context.lineWidth = 2;
}

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.x_speed = 3 + Math.random() * 1.8;
    this.y_speed = -2 * Math.random() + 1;
    this.counterMachine = 0;
    this.counterPlayer = 0;
};

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fill();
    context.lineWidth = 2;

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
    mousemove();

};

//arrows functionality
Paddle.prototype.move = function (e) {
    for (var key in keysdown)
        var value = Number(key);
    if (value == 38 && this.y >= pista.margin + 4) {
        this.y -= this.speed;
    }
    if (value == 40 && this.y <= pista.height - this.width + pista.margin - 4) {
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

//Ball movement
Ball.prototype.move = function () {

    this.x += this.x_speed;
    this.y += this.y_speed;
    //bounding the side walls
    if (this.y + this.radius > (pista.height + pista.margin) || this.y - this.radius < pista.margin) {
        this.y_speed = -this.y_speed;
    }

    //Machine & Player points
    else if (this.x + this.radius > pista.width + pista.margin) {
        this.counterMachine += 1;
        document.getElementById('scoreMachine').lastChild.textContent = newBall.counterMachine;
        newBall.serve();
        if (this.counterMachine >= 11) {
            document.getElementById('gameover').style.display = "inline";
            document.getElementById('table').style.opacity = "0.3";
            document.getElementById('scoreMachine').lastChild.textContent = '';
            document.getElementById('scorePlayer').lastChild.textContent = '';
            document.getElementById('points').innerHTML = '<div id="button">play new round</div>';
            //Play a new round
            document.getElementById('button').addEventListener("click", function (e) {
                location.reload();
            });
            newBall.serve();
        } 
    } else if (this.x - this.radius < 10) {
        this.counterPlayer += 1;
        document.getElementById('scorePlayer').innerHTML = newBall.counterPlayer;
        newBall.serve();

        //Paddle collision
    } else if (this.x + this.radius >= Player.x && this.y - this.radius >= Player.y - 10 && this.y + this.radius <= Player.y + Player.width + 10) {

        var ref = Player.width / 2;
        var difference = Math.abs(Player.y + ref - this.y);
        this.y_speed = -this.y_speed + (1 + ((ref - difference) / ref));
        this.x_speed = -this.x_speed;

        if (!Player.collision) {
            Player.collision = true;
        } else {
            Player.collision = false;
        }
    } else if (this.x - this.radius <= (Computer.x + Computer.height) && this.y + this.radius >= Computer.y && this.y + this.radius <= Computer.y + Computer.width) {
        this.y_speed = -this.y_speed;
        this.x_speed = -this.x_speed + Math.random() * 1.3;
        //Change background Color
        var random_color = Math.floor((Math.random() * 9) + 1);
        document.body.style.backgroundColor = colors[random_color];

    }
};


//Computer paddle
Paddle.prototype.update = function () {
    Computer.y = newBall.y - (Computer.width / 2);
    if (Computer.y + Computer.width > pista.height + pista.margin) {
        Computer.y = pista.height - Computer.width + pista.margin - 2;
    } else if (Computer.y < pista.margin) {
        Computer.y = pista.margin;
    }
};

//Serving new ball
Ball.prototype.serve = function () {
    this.x = 50;
    this.y = 255;
    this.x_speed = 3 + Math.random() * 1.8;
    this.y_speed = -2 * Math.random() + 1;
    var random_color = Math.floor((Math.random() * 9) + 1);
    document.getElementById('table').style.backgroundColor = colors[random_color];
};

var colors = ['#80cbc4', '#80deea', '#81d4fa', '#a5d6a7', '#c5e1a5', '#e6ee9c', '#ffcc80', '#f48fb1', '#ce93d8', '#ef9a9a', '#bcaaa4 '];

var init;
var step = function () {
    renderall();
    init = animate(step);
}
animate(step);

// Add mousemove  to the canvas
mouse = {};
b_canvas.addEventListener("mousemove", trackPosition, true);

function trackPosition(e) {

    mouse.y = e.pageY;
}

//update
function mousemove() {
    if (mouse.y) {
        Player.y = mouse.y - Player.width * 2;
        if (Player.y >= pista.height - Player.width) {
            Player.y = pista.height - Player.width + pista.margin;
        } else if (Player.y <= pista.margin) {
            Player.y = pista.margin;

        }
        mouse = {};
    }
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
