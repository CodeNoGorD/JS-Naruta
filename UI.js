export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily ='Creepster';
        this.livesImage = document.querySelector('#lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        //Score
        context.fillText('Score: ' + this.game.score, 20, 50);

        //Timer
        context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
        context.fillText('Timer: ' + (this.game.time * 0.001).toFixed(1), 20, 80);  // pour avoir une décimale après la virgule

        //Vies
        for(let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }
       

        // Message Game Over 
        if(this.game.gameOver){
            context.textAlign = 'center';
            if(this.game.score >= this.game.winningScore){
                context.font = this.fontSize * 2.5 + 'px ' + this.fontFamily;
                context.fillText('OOOOH YEAHHHHH !', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('T\'assures comme un dieu !', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
            else{
                context.font = this.fontSize * 2.5 + 'px ' + this.fontFamily;
                context.fillText('BOOOOOOOOOOH', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('Perdu essaies encore !', this.game.width * 0.5, this.game.height * 0.5 + 20);
                
            }
        }
        context.restore();

    }
}