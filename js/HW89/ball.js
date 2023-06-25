(function () {
    'use strict';

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = 'red';

    const RADIUS = 50;
    
    let maxX;
    let maxY;
    let minY = RADIUS;
    function resizeCanvas() {
        maxX = canvas.width = window.innerWidth;
        maxY = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ball {
        constructor(radius = 50, color ='#000000') {
            this.radius = radius;
            this.color = color;
            this.x = radius;
            this.y = radius;
            this.dx = 5;
            this.dy = 10;
        }

        draw() {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.radius, 0, 2 *Math.PI);
            this.x += this.dx;
            this.y += this.dy;
            context.fill();

            if(this.x < this.radius || this.x > maxX - this.radius) {
                this.dx = -this.dx;
            }

            if(this.y < this.radius || this.y > maxY - this.radius) {
                this.dy = -this.dy;
            }
        }
    }

    const balls = [];

    let lastTimeStamp = 0;
    function drawBalls() {
        context.clearRect(0,0,maxX,maxY);
        balls.forEach(ball => ball.draw());
    }

    setInterval(drawBalls, 16.66666);

    const radiusInput = document.querySelector('#radius');
    const colorInput = document.querySelector('#color');
    document.querySelector('#addBall').addEventListener('submit',e => {
        e.preventDefault();

        balls.push(new Ball(Number(radiusInput.value),colorInput.value));
    })
}())