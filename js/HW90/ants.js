(function () {
    'use strict';

    //add some extras... cuz i really should have done this myself

    //Ideas

    //easy:
    //add an input for ant size

    //good idea that seams feasible:
    //add a addEventListener to each ant that will let me pick it up and drop it somewhere else (draggable should work... need jquery)...probably should do the input size so i could test it with big ones...

    //maybe, need to think about it:
    //have 2 color groups of ants fight each other, the one with more strenghth wins

    //not sure where to start:
    //the "food" example...maybe google?

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    let mouseIsDown = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        static ANT_SIZE = 4;
        constructor (color = '#000000') {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.color = color;
            this.brains = 0;
        }

        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x,this.y,Ant.ANT_SIZE, Ant.ANT_SIZE * 2);
        }

        move() {
            if (--this.brains < 0) {
                this.brains = Ant.getRandomNumber(1, 50);
                this.moveX = Ant.getRandomNumber(-1,1);
                this.moveY = Ant.getRandomNumber(-1,1);
            }
            this.x += this.moveX;
            this.y += this.moveY;

            if(this.x < 0) {
                this.x = 0;
            } else if (this. y < 0) {
                this.y = 0;
            } 
            
            if (this.x > canvas.width - Ant.ANT_SIZE) {
                this.x = canvas.width - Ant.ANT_SIZE;
            } else if (this.y > canvas.height - Ant.ANT_SIZE) {
                this.y = canvas.height - Ant.ANT_SIZE;
            }

            this.draw()
        }
        
        static getRandomNumber(min,max) {
            return Math.floor((Math.random() * ((max - min) + 1)) + min);
        }
    }

    const ants = [];
    for(let i = 0; i < 1000; i++) {
        ants.push(new Ant());
    }
    setInterval(() => {
        context.clearRect(0,0,window.innerWidth, window.innerHeight);
        ants.forEach(ant => {
            ant.move();
        });
    }, 100);

    const antColor = document.querySelector('#color');
    const antCount = document.querySelector('#count');
    document.querySelector('#addAnts').addEventListener('submit', e => {
        e.preventDefault();
        for(let i = 0; i < antCount.value; i++) {
            ants.push(new Ant(antColor.value));
        }
    });
}());