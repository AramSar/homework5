const can = document.getElementById("can");
const ctx = can.getContext('2d');
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
    };

const arrayOfSharks = [];

const drawBg = function () {
  const img = new Image();
  img.src = 'SeaFloor.jpg';
  ctx.drawImage(img, 0, 0, can.width, can.height);
}

const bounce = function (numShark) {
  const sharks = function(numShark) {
    const returnPoint = function (){
      const sharkChar = {
        x: rand(can.width-300),
        y: rand(can.height-200),
        width: 300,
        height: 200,
        src: 'Shark2.png',
        xDelta: rand(7),
        yDelta: rand(3) 

     };
     return sharkChar;
    }
    
    const arrayPoints = function (array) {
      const assist = function (index) {
        if(index < 0) return;
        array.push(returnPoint());
        assist(--index);
      };
      assist(numShark-1);
       };
    arrayPoints(arrayOfSharks);
  };
  sharks(numShark); 

  const gameData = {
    hero: {
      height: 70,
      width: 80,
      x: 0,
      y: 0,
      src: 'Fish.png',
      xDelta: 10,
      yDelta: 7
    },
    sharks: arrayOfSharks
  }


  const drawHero = function () {
  const hero = new Image();
  hero.src = gameData.hero.src;
  ctx.drawImage(hero, gameData.hero.x, gameData.hero.y, gameData.hero.width, gameData.hero.height);
}

  const drawShark = function (index) {
  const shark = new Image();
  shark.src = gameData.sharks[index].src;
  ctx.drawImage(shark, gameData.sharks[index].x, gameData.sharks[index].y , gameData.sharks[index].width , gameData.sharks[index].height);
}
 
  const draw = function (y) {
    if(y<=0) return;
    drawShark(y-1);
    draw(--y);
  };

  
 const updateShark = function (y){
    if(y<=0) return;
    if(gameData.sharks[y-1].x >= can.width-gameData.sharks[y-1].width + 80){
      gameData.sharks[y-1].src = 'Shark.png'
      gameData.sharks[y-1].xDelta= -gameData.sharks[y-1].xDelta;
      
    }
    if(gameData.sharks[y-1].x < -80){
      gameData.sharks[y-1].src = 'Shark2.png'
      gameData.sharks[y-1].xDelta= -gameData.sharks[y-1].xDelta;
      
    }    
    if(gameData.sharks[y-1].y >= can.height-gameData.sharks[y-1].height + 70  || gameData.sharks[y-1].y< -70) {
      gameData.sharks[y-1].yDelta= -gameData.sharks[y-1].yDelta;
    }
    gameData.sharks[y-1].x += gameData.sharks[y-1].xDelta;
    gameData.sharks[y-1].y += gameData.sharks[y-1].yDelta;
    updateShark(--y);
   };


 const loop = function () {
  const checker = function (index) {
  if(index < 0) return ;
  if(gameData.hero.x < gameData.sharks[index].x + gameData.sharks[index].width &&
    gameData.hero.x + gameData.hero.width > gameData.sharks[index].x &&
     gameData.hero.y < gameData.sharks[index].y + gameData.sharks[index].height
    && gameData.hero.y + gameData.hero.height > gameData.sharks[index].y) {
      setTimeout(function() {  
     gameData.hero.isKilled = true;
      ctx.font = "80px Arial";
      ctx.fillStyle = 'red';
      ctx.fillText("Game Over",373,300); 
    }, 400);
}
checker(--index);
};
checker (numShark-1);
   if (!gameData.hero.isKilled) {
    drawBg();
   drawHero();
   draw(numShark);
    updateShark(numShark);
  }
   requestAnimationFrame(loop);

  };
 loop();

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40
document.addEventListener('keydown', function(event) {
  if(event.keyCode === upKey) {
    if(gameData.hero.y < 0 - gameData.hero.height) {
      gameData.hero.y = gameData.hero.y  + can.height + gameData.hero.height; 
    }
    gameData.hero.y = gameData.hero.y - gameData.hero.yDelta;
  }
  if(event.keyCode === downKey) {
    if(gameData.hero.y > can.height) {
       gameData.hero.y = 0  ; 
   }
    gameData.hero.y += gameData.hero.yDelta;
  }
  if(event.keyCode === leftKey) {
    gameData.hero.src = "Fish.png";
    if(gameData.hero.x < 0 - gameData.hero.width) {
      gameData.hero.x = can.width ; 
    }
    gameData.hero.x -= gameData.hero.xDelta;
   }
  if(event.keyCode === rightKey) {
    gameData.hero.src = "Fish2.png";
    if(gameData.hero.x > can.width) {
      gameData.hero.x = 0 - gameData.hero.width; 
    }
    gameData.hero.x += gameData.hero.xDelta;
  }
}, false); 

};
bounce(3);

