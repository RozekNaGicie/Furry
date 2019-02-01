
document.querySelector('#score').classList.add('invisible')
document.querySelector('#board').classList.add('invisible')

function Furry () {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

function Coin () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Skull () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game (){
    this.board = document.querySelector('#board').querySelectorAll('div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.skull = new Skull ();
    this.score = 0;
    this.skullCount =0;
    this.idSetInterval;
    this.index = function(x,y) {
        return x + (y * 10);
    }
    this.showFurry = function (){
        self = this;
        // this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }
    this.hideVisibleFurry = function(){
        var oldFurry = document.querySelector('.furry');
        oldFurry.classList.remove('furry')
    }
    // this.hideVisibleFurry();

    this.showCoin = function (){
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
    this.showSkull = function (){
        this.board[this.index(this.skull.x, this.skull.y)].classList.add('skull');
    }
 
    this.moveFurry = function (){
        this.gameOver();
        
        var self = this;
        this.hideVisibleFurry();

        if(self.furry.direction === 'right'){
            self.furry.x = self.furry.x + 1;
            self.showFurry()
        } else if(self.furry.direction === 'left'){
            self.furry.x = self.furry.x - 1;
            self.showFurry()
        } else if(self.furry.direction === 'up'){
            self.furry.y = self.furry.y - 1;
            self.showFurry()
        } else if(self.furry.direction === 'down'){
            self.furry.y = self.furry.y + 1; 
            self.showFurry()
        }

        this.showFurry();
        // this.hideVisibleFurry();
        this.checkCoinCollision();
        this.SkullCollision();
        // this.gameOver();
        console.log(self.furry.y)        
    }

    this.turnFurry = function(event){
        switch(event.which){
            case 37:
            this.furry.direction = 'left';
            this.moveFurry()   
            break;
            case 38:
            this.furry.direction = 'up';
            this.moveFurry()    
            break;
            case 39:
            this.furry.direction = 'right';
            this.moveFurry()    
            break;
            case 40:
            this.furry.direction = 'down';
            this.moveFurry()    
            break;
            }
    }
    this.checkCoinCollision = function (){
        var self = this;
        if(self.coin.x === self.furry.x && self.coin.y === self.furry.y){
            self.score++
            console.log(document.querySelector('strong').innerText = self.score);
            var dupa = self.board
            for(i=0;i<dupa.length;i++){
                dupa[i].classList.remove('coin')
            }

            self.coin = new Coin();
            self.showCoin()
        }
    }


    this.gameOver = function (){
        // var self = this;
            if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 || this.skullCount == 1){
                clearInterval(this.idSetInterval);
                alert('game over')
            }
            
        
    }

 

    this.startGame = function (){
        var self = this
       this.idSelfInterval = setInterval(function(){
            self.moveFurry()
        // var oldFurry = document.querySelector('.furry');
        // oldFurry.classList.remove('furry')
            return;
        },250);
        
    
    }
    
    this.SkullCollision = function (){
        var self = this;
        
        if(self.skull.x === self.furry.x && self.skull.y === self.furry.y){
            this.skullCount = this.skullCount + 1
            // clearInterval(this.idSetInterval);
            // alert('dupa')
            this.gameOver();
        }
    }
   
    
}
var meni = document.querySelector('.level1')
meni.addEventListener('click', function(e){
    document.querySelector('#score').classList.remove('invisible')
    document.querySelector('#board').classList.remove('invisible') 
    document.querySelector('.level').classList.add('invisible')

    var gamePlay = new Game();
    gamePlay.showFurry();
    gamePlay.showCoin();
    gamePlay.showSkull();
    gamePlay.startGame();
   
    
       document.addEventListener('keydown', function(event){
           gamePlay.turnFurry(event);
       });
} )

// function dupak () {window.location.reload()} refrshing side after loose script its should return false if in href 
   
// gamePlay.hideOldFurry()
//  console.log(document.querySelector('.furry'))

// console.log(this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry'));
