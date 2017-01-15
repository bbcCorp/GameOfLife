/// <reference path="../../typings/index.d.ts" />

// Tests for GameOfLife Object
describe("GameOfLife", function(){
    // Create a 10x10 grid for the game
    var dimension = 10;     
    var game = GameOfLife;
    var gameGrid = game.initGame(dimension);

    describe("this is a simple test", function(){
        var condition = true;
        it("check if value is true", function(){
            expect(condition).toBeTruthy("The condition must be true");
        });
    });

    describe("After initialization gameGrid should be a 10x10 matrix", function(){
        
        it("gameGrid should have 10 rows", function(){
            expect(gameGrid.length).toEqual(dimension,"gameGrid has less than 10 rows!");
        });
    });

    describe("Update 2 cells", function(){
        var _updatedGrid = game.addShape([ [0,0,true], [0,1,true] ]);

        it("updated grid should show 2 cells alive", function(){
            expect(_updatedGrid[0][0]).toBeTruthy("Cell [0,0] should be alive");
            expect(_updatedGrid[0][1]).toBeTruthy("Cell [0,1] should be alive");
        });
    });

    describe("Rule 1: Under population", function(){
        var currentState = true;
        
        it("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", function(){

            var futureState = game.calculateCellState(currentState, 0);
            expect(futureState).toBeFalsy("With 0 neighbour a cell should die");
            
            futureState = game.calculateCellState(currentState, 1);
            expect(futureState).toBeFalsy("With 1 neighbour a cell should die");
        });
    });

    describe("Rule 2: Survival of the Living", function(){
        var currentState = true;
        
        it("Any live cell with two or three live neighbours lives on to the next generation.", function(){

            var futureState = game.calculateCellState(currentState, 2);
            expect(futureState).toBeTruthy("With 2 neighbour a cell should survive the next generation");
            
            futureState = game.calculateCellState(currentState, 3);
            expect(futureState).toBeTruthy("With 1 neighbour a cell should survive the next generation");
        });
    });

    describe("Rule 3: Over population", function(){
        var currentState = true;
        
        it("Any live cell with more than three live neighbours dies, as if by overpopulation.", function(){

            var futureState = game.calculateCellState(currentState, 4);
            expect(futureState).toBeFalsy("With 4 neighbours, a cell should die");
            
            futureState = game.calculateCellState(currentState, 5);
            expect(futureState).toBeFalsy("With 5 neighbours, a cell should die");

            futureState = game.calculateCellState(currentState, 6);
            expect(futureState).toBeFalsy("With 6 neighbours, a cell should die");

            futureState = game.calculateCellState(currentState, 7);
            expect(futureState).toBeFalsy("With 7 neighbours, a cell should die");

            futureState = game.calculateCellState(currentState, 8);
            expect(futureState).toBeFalsy("With 8 neighbours, a cell should die");
        });
    });

    describe("Rule 4: Rebirth", function(){
        var currentState = false;
        
        it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function(){

            var futureState = game.calculateCellState(currentState, 3);
            expect(futureState).toBeTruthy("With 3 neighbour, a dead cell should be reborn");
            
        });
    });

});