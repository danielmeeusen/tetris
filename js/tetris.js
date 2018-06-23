const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function collide(arena, player){
  const [m, o] = [player.matrix, player.pos];
  for(y=0; y<m.length; y++){
    for(x=0; x < m[y].length; x++){
      if(m[y][x] !== 0 && (arena.matrix[y + o.y] && arena.matrix[y + o.y][x + o.x]) !== 0){
        return true;
      }
    }
  }
  return false;
}

function createPiece(type){
  if(type === 'T'){
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ];
  } else if (type === 'O'){
    return [
      [2,2],
      [2,2]
    ];
  } else if (type === 'L'){
  return [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3]
  ];
} else if (type === 'J'){
  return [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0]
  ];
} else if (type === 'I'){
  return [
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0]
  ];
} else if (type === 'S'){
  return [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0]
  ];
} else if (type === 'Z'){
  return [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ];
} 
}

function draw(){
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena.matrix, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset){
  matrix.forEach((row, y) => {
    row.forEach((value, x) =>{
      if(value !== 0){
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

let lastTime = 0;

function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time;
  player.update(deltaTime);
  draw();
  requestAnimationFrame(update);
}

function updateScore(){
  document.getElementById('score').innerText = player.score;
}

const colors = [null, '#009688' , '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#673ab7', '#2196f3'];

const arena = new Arena(12, 20);

const player = new Player;

document.addEventListener('keydown', e => {
  if(e.keyCode === 37){
    player.move(-1)
  }else if(e.keyCode === 39){
    player.move(1);
  } else if(e.keyCode === 40){
    player.drop();
  } else if(e.keyCode === 81){
    player.rotate(-1);
  } else if(e.keyCode === 87 || e.keyCode === 38){
    player.rotate(1);
  }
});

player.reset();
update();
updateScore();