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
const bouncePoints = function(count, canvasWidth, canvasHeight) {
  can.width = canvasWidth;
  can.height = canvasHeight;
  const returnPoint = function (){
    const point = {
      x: rand(can.width-can.width*0.04),
      y: rand(can.height-can.height*0.04),
      width: can.width*0.04,
      height: can.height*0.04,
      color: randCol(),
      xDelta: 2,
      yDelta: 1
   };
   return point;
  }
  
  const arrayPoints = function (array) {
    const assist = function (index) {
      if(index < 0) return;
      array.push(returnPoint());
      assist(--index);
    };
    assist(count-1);
     };

arrayPoints(arr);
};

bouncePoints(4,800,800);
console.log(arr);