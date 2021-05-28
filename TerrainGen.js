

var Terrain = {
    terrain: [],

    genNewTerrain: function(){
        for(let i = 0; i < width; i++){
            let row = []
            for(let j = 0; j < height; j++){
                pNoise = perlin_noise(i,j) * 100
                row.push(pNoise)      
            }
            this.terrain.push(row)
        }

        if(hasCoast){
            for(let i = 0; i < width; i++){
                //terrain[i][0] = -100;
                this.terrain[i][height] = -100;
            }
        }

        if(isIsland){
            for(let i = 0; i < width; i++){
                this.terrain[i][0] = -100;
                this.terrain[i][height-1] = -100;
            }
            for(let i = 0; i < height; i++){
                this.terrain[width-1][i] = -100;
                this.terrain[0][i]= -100;
            }
        }
    },

    avgSmooth: function (smoothness){
        for(let k = 0; k < smoothness; k++){
            for(let x = 1; x  < this.terrain.length -1; x++){
                for(let y = 1; y < this.terrain[0].length-1; y++){
        
                    this.terrain[x][y] += this.terrain[x+1][y]
                    this.terrain[x][y] += this.terrain[x+1][y+1]
                    this.terrain[x][y] += this.terrain[x][y+1]
                    this.terrain[x][y] += this.terrain[x-1][y+1]
                    this.terrain[x][y] += this.terrain[x-1][y]
                    this.terrain[x][y] += this.terrain[x-1][y-1]
                    this.terrain[x][y] += this.terrain[x][y-1]
                    this.terrain[x][y] += this.terrain[x+1][y-1]
                    this.terrain[x][y] /= 8
                }
            }
        }
    },
}

