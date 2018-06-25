class Arena{
    constructor(w, h){
        const matrix = [];
        while(h--){
            matrix.push(new Array(w).fill(0));
        }
        this.matrix = matrix;
    }

    clear(){
        this.matrix.forEach(row => row.fill(0));
    }

    collide(player){
      const [m, o] = [player.matrix, player.pos];
      for(var y = 0; y<m.length; y++){
        for(var x = 0; x < m[y].length; x++){
          if(m[y][x] !== 0 && (this.matrix[y + o.y] && this.matrix[y + o.y][x + o.x]) !== 0){
            return true;
          }
        }
      }
      return false;
    }

    merge(player){
        player.matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if(value !== 0){
              this.matrix[y + player.pos.y][x + player.pos.x] = value;
            }
          });
        });
      }

    sweep(){
        let rowCount = 1;
        let score = 0;
        outer: for(var y = this.matrix.length - 1; y > 0; y--){
          for(var x = 0; x < this.matrix[y].length; x++){
            if(this.matrix[y][x] === 0) {
              continue outer;
            }
          }
          const row = this.matrix.splice(y, 1)[0].fill(0);
          this.matrix.unshift(row);
          y++;
      
          score += rowCount * 10;
          rowCount *= 2;
        }
        return score;
      }

}
