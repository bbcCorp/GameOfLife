// Main function for GameOfLife
/// <reference path="../../typings/index.d.ts" />

'use strict';

var GameOfLife = {
  iteration : 0,
  gridSize :  20,

  shapes : {
    "nearStable2x2": [ [4,4, true] , [5,4, true], [5,5, true] ],
    "glider": [ [4,4,true], [6,4,true], [5,5,true], [6,5,true], [5,6,true] ],
    "glider2": [ [4,4,true], [5,4,true], [6,4,true], [4,5,true], [5,6, true] ],
    "starship" : [[ 4,3, true], [ 5,3, true], [ 3,4, true], [ 4,4, true], [ 5,4, true], [ 6,4, true], [ 3,5, true], [ 4,5, true], [ 6,5, true], [ 7,5, true], [ 5,6, true], [ 6,6, true]   ],
    "Stable2x2": [ [4,4,true], [5,4,true], [4,5,true], [5,5,true] ],
    "StableRing": [ [5,4,true], [6,4,true], [4,5,true], [7,5,true], [4,6,true], [7,6,true],[5,7,true], [6,7,true], ],
  },

  initGame : function(gridSize){
        var self = this;

        if(gridSize){
            if(gridSize % 10 == 0){
                self.gridSize = gridSize;
            } else {
                console.log("Grid size must be in multiples of 10");
            }
            
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

    reset: function() {
        var self = this;
        self.iteration = 0;
        for(var i=0;i<self.gridSize;i++){
            var gridCols = new Array(self.gridSize);
            gridCols.fill(false);
            self.gameGrid[i] = gridCols;
        }
        self.__removePrevGenObjects();
        return self.gameGrid;        
    },

    nextGeneration : function( callback){
        // Forwards the game by one generation, by checking the entire grid and 
        // determining the fate of each cell

        var self = this;

        self.iteration++;
        console.log("Running iteration:"+ self.iteration);

        var nxtGameGrid = new Array(self.gridSize);

        for(var i=0;i<this.gridSize;i++){
            var gridCols = new Array(self.gridSize);
            gridCols.fill(false);
            nxtGameGrid[i] = gridCols;
        }

        for(var x=0;x<this.gridSize;x++){
            for(var y=0;y<this.gridSize;y++){
                var cellFutureState = self._checkNeighbours( self.gameGrid, x,y)
                nxtGameGrid[x][y] = cellFutureState;
            }
        }

        self.drawGrid(nxtGameGrid);
        self.gameGrid = nxtGameGrid;

        if(callback){
            callback();
        }

    },

    addShape : function(selectedShape){
        // Expect an array of [xpos, ypos, val] - Use that to update grid
        var self = this;

        if(selectedShape in self.shapes){
            var updateLst = self.shapes[selectedShape];

            updateLst.forEach( function(item){
                if(item[0]< self.gridSize && item[1]< self.gridSize){
                    self.gameGrid[item[0]][item[1]] = item[2]
                }
            });
        }
        else {
            throw "Error in adding shape to grid: Invalid shape name:" + selectedShape;
        }

        return self.gameGrid;
    },

    initCellGrid : function(){
        // Function used to draw up the grids for the cell
        var canvas = this.__canvas = new fabric.Canvas('c');

        this._gridStructure = {
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            cellWidth : canvas.width / this.gridSize,
            cellHeight : canvas.height / this.gridSize,
        };

        var gridProperties = { stroke: "#000000", strokeWidth: 1, selectable:false, strokeDashArray: [5, 5]};
        
        for(var x=1;x<this.gridSize;x++){
            canvas.add(new fabric.Line([this._gridStructure.cellWidth *x, 0, this._gridStructure.cellWidth*x, 500], gridProperties));
            canvas.add(new fabric.Line([0, this._gridStructure.cellHeight*x, 500, this._gridStructure.cellHeight*x], gridProperties));
        }

        canvas.renderAll();
    },

    __removePrevGenObjects : function(){
        var self = this; 
        var prevObjects = [];
        self.__canvas.getObjects().forEach(function (object, key) {
            // Remove only the cells and not the grid lines

            if(object.type == "rect"){
                prevObjects.push(object);              
            }
        });

        prevObjects.forEach(function(o){
            self.__canvas.remove(o);
        })
         
        self.__canvas.renderAll();

    },

    drawGrid : function(gameGrid){  
        var self = this; 
        self.__removePrevGenObjects();

        for(var x=0;x<this.gridSize;x++){
            for(var y=0;y<this.gridSize;y++){
                if( gameGrid[x][y]){

                    var posX = x * self._gridStructure.cellWidth;
                    var posY = y * self._gridStructure.cellHeight;

                    var rect = new fabric.Rect({
                                width: self._gridStructure.cellWidth,
                                height: self._gridStructure.cellHeight,
                                left: posX,
                                top: posY,
                                stroke: '#aaf',
                                strokeWidth: 1,
                                fill: '#faa',
                                selectable: false
                    });
                    self.__canvas.add(rect);

                }
            }
        }


        self.__canvas.renderAll();
        return("Rendering gameGrid");
    },

    _getNeighbours : function(gridSize, posX, posY){
        // This function is expected to return an array of [x,y] values for each neighbours
        var self = this;    
        var neighbours = [];

        var neighbourX = [];
        var neighbourY = [];

        if(posX == 0){
            neighbourX = [gridSize -1, posX, posX +1 ];
        } 
        else if(posX == gridSize -1 ){
            neighbourX = [posX -1, posX, 0 ];
        } 
        else {
            neighbourX = [posX -1, posX, posX + 1 ];
        }

        if(posY == 0){
            neighbourY = [gridSize -1, posY, posY +1 ];
        } 
        else if(posY == gridSize -1 ){
            neighbourY = [posY -1, posY, 0 ];
        } 
        else {
            neighbourY = [posY -1, posY, posY + 1 ];
        }

        neighbourX.forEach(function(xPos){
            neighbourY.forEach( function(yPos){
                if(xPos== posX && yPos==posY){
                    return;
                }

                neighbours.push([xPos,yPos]);
                
                
            })

        });

        return neighbours;
    },
    _getNeighbourCount : function(gameGrid, neighbourList){
        // Stub it to return a number between 0 and 8
        //return Math.floor (Math.random() * 9);

        var self = this;        
        var aliveNeighbourCount = 0;

        neighbourList.forEach(function(neighbour){
            var posX = neighbour[0];
            var posY = neighbour[1];
            if( gameGrid[posX][posY] ){
                aliveNeighbourCount++;
            }
        })

        return aliveNeighbourCount;
    },

    _calculateCellState : function(isCellAlive, activeNeighbourCount){
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

    _checkNeighbours : function(gameGrid, posX, posY){
        // This function holds the main logic for Conway's Game of Life simulation
        // True represents it would live in next generation
        // False indicates the cell would die in the current generation

        var self = this;
        
        var currentState = gameGrid[posX][posY];
        var calculatedCellState = false;

        var neighbours = self._getNeighbours(self.gridSize, posX, posY);
        var activeNeighbourCount = self._getNeighbourCount(gameGrid, neighbours);

        var calculatedCellState = self._calculateCellState(currentState,activeNeighbourCount);
        
        return calculatedCellState;
    }


}
