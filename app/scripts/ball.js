function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.x_speed = 3 + Math.random() * 1.8;
    this.y_speed = -2 * Math.random() + 1;
    this.counterMachine = 0;
    this.counterPlayer = 0;
};


//Ball functions
Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fill();
    context.lineWidth = 2;

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

//Ball movement
Ball.prototype.move = function () {
    this.x += this.x_speed;
    this.y += this.y_speed;
    //bounding the side walls
    if (this.y + this.radius > (Court.height + Court.margin) || this.y - this.radius < Court.margin) {
        this.y_speed = -this.y_speed;
    }

    //Machine & Player points
    else if (this.x + this.radius > Court.width + Court.margin) {
        this.counterMachine += 1;
        document.getElementById('scoreMachine').lastChild.textContent = newBall.counterMachine;
        newBall.serve();
        if (this.counterMachine >=11 || this.counterPlayer >=11) {
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
       var difference = this.y + this.radius - (Player.y + ref);
       this.y_speed = this.y_speed + (difference / ref * 4); 
       this.x_speed = -this.x_speed;
      
      
        if (!Player.collision) {
            Player.collision = true;
        } else {
            Player.collision = false;
        }
    } else if (this.x - this.radius <= (Computer.x + Computer.height) && this.y - this.radius >= Computer.y - 10 && this.y + this.radius <= Computer.y + Computer.width + 10) {
        this.y_speed = -this.y_speed;
        this.x_speed = -this.x_speed + Math.random() * 1.3;
        //Change background Color
        var random_color = Math.floor((Math.random() * 9) + 1);
        document.body.style.backgroundColor = colors[random_color];

    }
};

