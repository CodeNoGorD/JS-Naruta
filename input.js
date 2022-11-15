export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', (e)=>{
            // console.log(e.key);
           if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||  e.key === ' ') && this.keys.indexOf(e.key) === -1) {  // Indexof === -1 signifie qu'il n'a pas d'index dans le tableau
            this.keys.push(e.key);
           }
           else if (e.key === 'd'){
            this.game.debug = !this.game.debug; // Si game.debug est vrai passez le à faux et inversement

           }
        });

        window.addEventListener('keyup', (e)=>{
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||  e.key === ' ') {  
             this.keys.splice(this.keys.indexOf(e.key), 1);
            }
         });
    }
}