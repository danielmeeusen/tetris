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
        outer: for(y=this.matrix.length - 1; y > 0; y--){
          for(x=0; x < this.matrix[y].length; x++){
            if(this.matrix[y][x] === 0) {
              continue outer;
            }
          }
          const row = this.matrix.splice(y, 1)[0].fill(0);
          this.matrix.unshift(row);
          y++;
      
          player.score += rowCount * 10;
          rowCount *= 2;
        }
      }

}
