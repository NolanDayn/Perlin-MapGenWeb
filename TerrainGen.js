
var tundra = {name:'Tundra', color:'#b3bfae', elevation:0}
var glacier = {name:'Glacier', color:'#c2f9ff',elevation:0}
var boreal = {name:'boreal', color:'#4a8f28',elevation:0}
var bog = {name:'bog', color:'#2f523b',elevation:0}
var desert = {name:'desert', color:'#dec973',elevation:0}
var grassland = {name:'grassland', color:'#81c265',elevation:0}
var forrest = {name:'forrest', color:'#249911',elevation:0}
var swamp = {name:'swamp', color:'#259c68',elevation:0}
var savanna = {name:'savanna', color:'#cf9a55',elevation:0}
var jungle = {name:'jungle', color:'#0fa628',elevation:0}
var rainforrest = {name:'rainforrest', color:'#029c66',elevation:0}
var deepOcean = {name:'ocean', color:'#02599c',elevation:0}
var shallowOcean = {name:'shallowOcean', color:'#4793cc',elevation:0}
var freshWater = {name:'freshWater', color:'#49c1c9',elevation:0}

var biomeTypes = [[glacier, glacier,glacier, glacier],
                    [tundra,tundra, boreal,bog],
                    [desert,grassland, forrest,swamp],
                    [desert,savanna, jungle,rainforrest]]


var Terrain = {
    terrain: [],

    genNewTerrain: function(coasts){
        
        this.terrain = []

        //[temperature][rainfall]
        //Fill with detailed objects in future not just name

        for(let i = 0; i < width; i++){
            let row = []
            for(let j = 0; j < height; j++){
                pNoise = perlin_noise(i,j) * 100
                row.push(pNoise)      
            }
            this.terrain.push(row)
        }

        if(coasts === 'coast'){
            for(let i = 0; i < width; i++){
                //terrain[i][0] = -100;
                this.terrain[i][height-1] = -100;
            }
        }
        else if(coasts == 'island'){
            for(let i = 0; i < width; i++){
                this.terrain[i][0] = -100;
                this.terrain[i][height-1] = -100;
            }
            for(let i = 0; i < height; i++){
                this.terrain[width-1][i] = -100;
                this.terrain[0][i]= -100;
            }
        }
        else if(coasts == 'landlocked'){
            for(let i = 0; i < width; i++){
                this.terrain[i][0] = 10 + Math.random()*10;
                this.terrain[i][height-1] = 10 + Math.random()*10;
            }
            for(let i = 0; i < height; i++){
                this.terrain[width-1][i] = 10 + Math.random()*10;
                this.terrain[0][i]= 10 + Math.random()*10;
            }
        }
    },

    determineBiomes: function(baseTemp, basePrecip, roughness, waterlevel, latitude){

        for(let i = 0; i < this.terrain.length-1; i++){
            for(let j = 0; j < this.terrain[0].length-1; j++){

                this.terrain[i][j] *= roughness
                elevation = this.terrain[i][j]

                if(elevation < waterlevel - 30){
                    this.terrain[i][j] = deepOcean
                    this.terrain[i][j].elevation = elevation 
                    continue
                }
                else if(elevation < waterlevel){
                    this.terrain[i][j] = shallowOcean
                    this.terrain[i][j].elevation = elevation 
                    continue
                }

                eCalc = elevation

                //Calculate temp
                //Calculate effects of lattitude
                temp = baseTemp - (eCalc/10) //decrease temp by 1 for ever 5 gained in elevation max elevation is about 100 typically


                //calculate rainfall
                //close to water effect
                //rainshadow effect
                precip = basePrecip - (eCalc/10) //decrease precip by 1 for every 5 gained in elevation

                //high altitude effect
                if(elevation > 60){
                    precip -= 25
                    temp -= 25
                }

                //mountain top effect
                if(elevation > 90){
                    precip -= 25 
                    temp -= 50
                }

                if(latitude == 'highLat'){
                    temp += j/3
                }
                else if(latitude == 'lowLat'){
                    temp -= j/3
                }

                //temp is on -50 to 50 scale
                temp = Math.floor((temp + 50)/25)
                if(temp < 0){
                    temp = 0;
                }
                else if(temp > 3){
                    temp = 3
                }

                precip = Math.floor((precip)/25) //precip is on 0 to 100 scale
                if(precip < 0){
                    precip = 0;
                }
                else if(precip > 3){
                    precip = 3
                }

                this.terrain[i][j] = biomeTypes[temp][precip]
                this.terrain[i][j].elevation = elevation 
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

