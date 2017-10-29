const can = document.getElementById("can");
const ctx = can.getContext('2d');
const rand = function(num) {
    	return Math.floor(Math.random() * num) + 1;
    };
const randCol = function() {
      const r = rand(255);
      const g = rand(255);
      const b = rand(255);
      return "rgb(" + r + "," + g + "," + b + ")" ;
    };
const arr = [];
const bounce = function (count) {
  const bouncePoints = function(num) {
    const returnPoint = function (){
      const point = {
        x: rand(can.width-can.width*0.04),
        y: rand(can.height-can.height*0.04),
        width: can.width*0.04,
        height: can.height*0.04,
        color: randCol(),
        xDelta: rand(3) + 2,
        yDelta: rand(3) + 2
     };
     return point;
    }
    
    const arrayPoints = function (array) {
      const assist = function (index) {
        if(index < 0) return;
        array.push(returnPoint());
        assist(--index);
      };
      assist(num-1);
       };

  arrayPoints(arr);
  };

  bouncePoints(count);

  const draw = function (y) {
    if(y<=0) return;
    ctx.fillStyle = arr[y-1].color;
    ctx.fillRect(arr[y-1].x,arr[y-1].y,arr[y-1].width, arr[y-1].height);
    draw(--y);
  };
  
  const update = function (y){
    if(y<=0) return;
    if(arr[y-1].x >= can.width-arr[y-1].width || arr[y-1].x<0 ){
      arr[y-1].xDelta= -arr[y-1].xDelta;
      arr[y-1].color = randCol();
    }
    if(arr[y-1].y >= can.height-arr[y-1].height || arr[y-1].y<0) {
      arr[y-1].yDelta= -arr[y-1].yDelta;
      arr[y-1].color = randCol();
    }
    arr[y-1].x += arr[y-1].xDelta;
    arr[y-1].y += arr[y-1].yDelta;
    update(--y);
   };
 const loop = function () {
   ctx.clearRect (0,0, can.width,can.height);
   draw(count);
   update(count);
   requestAnimationFrame(loop);
  };
 loop();
};
bounce(7);