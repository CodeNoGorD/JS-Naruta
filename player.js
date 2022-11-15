import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates.js';
import { CollisionAnimation } from './collisionAnimation.js';
import { FloatingMessage } from './floatingMessages.js';

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height -this.game.groundMargin;
        this.image = player;  // l'ID de l'image est déclarée en HTML donc on peut écrire cela à la place de document.querySelector('#player')
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps; // 1000 ms divisé par les fps
        this.frameTimer = 0 // Varie entre 0 et frameInterval
        this.currentState = null;


    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //Mouvement Horizontal
        this.x += this.speed;
       if(input.includes('ArrowRight') && this.currentState !== this.states[6]){  // méthode includes permet de verifier si une valeur existe dans un tableau et renvoie vrai ou faux
        this.speed = this.maxSpeed;
       }
       else if (input.includes('ArrowLeft')  && this.currentState !== this.states[6]){
        this.speed = -this.maxSpeed;
       }
       else this.speed = 0;
       //Limites horizontales
       if (this.x < 0){
        this.x = 0;
       } 
       if (this.x > this.game.width - this.width){
        this.x = this.game.width - this.width;
       }
       //Mouvement Vertical
       this.y += this.vy;
       if(!this.onGround()){
        this.vy += this.weight;
       }
       else this.vy = 0;
       //Limites verticales
       if(this.y > this.game.height - this.height - this.game.groundMargin){
        this.y = this.game.height - this.height - this.game.groundMargin;
       }

       //Sprite Animation
       if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame){
                    this.frameX++;
                }
            else this.frameX = 0;
       }
       else {
        this.frameTimer += deltaTime;
       }

    }
    draw(context){
        if(this.game.debug){
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;

    }
    setState(state, speed){
        this.currentState = this.states[state];  // l'argument state sera un nombre qui correspondra à la pose du personnage
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            // collision détectée
            if(enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if(this.currentState === this.states[4] || this.currentState === this.states[5]){
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 50)); // 0, 0 les chiffres fonçent vers le haut à gauche pour cumuler les points
                }
              
                else {
                    this.setState(6, 0);
                    this.game.score -= 2;
                    this.game.lives--;
                    if(this.game.lives <= 0){
                        this.game.gameOver = true;
                    }
                }
            }
        });
    }
}