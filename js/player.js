class Player {
    constructor(tetris){

        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = 1000;
      
        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    createPiece(type){
        if (type === 'I'){
          return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
          ];
        } else if (type === 'J'){
          return [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0]
          ];
        } else if (type === 'L'){
          return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
          ];
        } else if (type === 'O'){
          return [
            [4,4],
            [4,4]
          ];
        } else if (type === 'S'){
          return [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
          ];
          } else if (type === 'T'){
            return [
              [0, 0, 0],
              [6, 6, 6],
              [0, 6, 0]
            ];
        } else if (type === 'Z'){
          return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
          ];
        }
      }

    drop(){
        this.pos.y++;
        if(this.arena.collide(this)){
          this.pos.y--;
          this.arena.merge(this);
          this.reset();
          this.score += this.arena.sweep();
          this.tetris.updateScore(this.score);
        }
        this.dropCounter = 0;
    }

    move(dir){
        this.pos.x += dir;
        if(this.arena.collide(this)){
        this.pos.x -= dir;
        }
    }

    reset(){
        const pieces = 'IJLOSTZ';
        this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
        if(this.arena.collide(this)){
        this.arena.clear();
        this.score = 0;
        this.tetris.updateScore(this.score);
        }
    }

    rotate(dir){
        const pos = this.pos.x
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
    
        while(this.arena.collide(this)){
        this.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if(offset > this.matrix[0].length) {
            this._rotateMatrix(this.matrix, -dir);
            this.pos.x = pos;
            return;
        }
        }
    }

    _rotateMatrix(matrix, dir){
        for(var y = 0; y < matrix.length; y++){
          for(var x = 0; x < y; x++){
            [ matrix[x][y], matrix[y][x], ] = [ matrix[y][x], matrix[x][y], ];
          }
        }
        if(dir > 0){
          matrix.forEach(row => row.reverse());
        } else {
          matrix.reverse();
        }
      }

    update(deltaTime){
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }

}