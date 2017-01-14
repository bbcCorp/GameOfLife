// Main function for GameOfLife
'use strict';

var GameOfLife = {
  iteration : 0,
  gridSize :  20,

  initGame : function(gridSize){
        var self = this;

        if(gridSize){
            self.gridSize = gridSize;
        } else {
            self.gridSize = 20;
        }  

        // Initializes a NxN dimensional array 
        var gameGrid = new Array(self.gridSize);

        for(var i=0;i<this.gridSize;i++){
            var gridCols = new Array(self.gridSize);
            gridCols.fill(false);
            gameGrid[i] = gridCols;
        }

        self.gameGrid = gameGrid;
        return gameGrid; 
    },

    nextGeneration : function(){
        // Forwards the game by one generation, by checking the entire grid and 
        // determining the fate of each cell

        var self = this;

        self.iteration ++;
        console.log("Running iteration:"+i);

        
        // self.updateGrid([])
        self.drawGrid(self.gameGrid);
    },

    updateGrid : function(updateLst){
        // Expect an array of [xpos, ypos, val] - Use that to update grid
        var self = this;

        updateLst.forEach( function(item){
            if (item.length < 3){
                return "Invalid update request";
            }

            if(item[0]< self.gridSize && item[1]< self.gridSize){
                self.gameGrid[item[0]][item[1]] = item[2]
            }
        });

        return self.gameGrid;
    },


    drawGrid : function(gameGrid){
        return("Rendering gameGrid");
    },

    _getNeighbourCount : function(posX, posY){
        // Stub it to return a number between 0 and 8
        return Math.floor (Math.random() * 9);
    },

    calculateCellState : function(isCellAlive, activeNeighbourCount){
        // Core Logic to determine whether individual cell will be alive or dead in next iteration 
        // Takes in current cell state and a count of active neighbours    
        var calculatedCellState = false;

        if(isCellAlive && (activeNeighbourCount >= 2 && activeNeighbourCount <= 3) ){
            // Any live cell with two or three live neighbours lives on to the next generation.
            calculatedCellState = true;
        }

        if((! isCellAlive) && activeNeighbourCount == 3){
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            calculatedCellState = true;
        }
        
        return calculatedCellState;    
    },

    checkNeighbours : function(posX, posY){
        // This function holds the main logic for Conway's Game of Life simulation
        // True represents it would live in next generation
        // False indicates the cell would die in the current generation

        var self = this;
        var calculatedCellState = false;

        var cellAlive = self.gameGrid[posX][posY];
        var activeNeighbourCount = self._getNeighbourCount(posX, posY);

        var calculatedCellState = self.calculateCellState(cellAlive,activeNeighbourCount);
        
        return calculatedCellState;
    }


}
