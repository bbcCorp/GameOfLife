/// <reference path="../../typings/index.d.ts" />

// Tests for GameOfLife Object
describe("GameOfLife", function(){
    describe("After initialization gameGrid should be a 10x10 matrix", function(){
        // Create a 10x10 grid for the game
        var dimension = 10;     
        var game = new GameOfLife(true);
        var gameGrid = game.initGame(dimension);

        it("gameGrid should have 10 rows", function(){
            expect(gameGrid.length).toEqual(dimension,"gameGrid has less than 10 rows!");
        });
    });

    describe("Update Grid", function(){
        var game = new GameOfLife(true);
        game.initGame(10);
        // "nearStable2x2": [ [4,4, true] , [5,4, true], [5,5, true] ]
        var _updatedGrid = game.addShape("nearStable2x2");

        it("Add nearStable2x2 shape to grid. The respective cells should be true", function(){
            expect(_updatedGrid[4][4]).toBeTruthy("Cell [4,4] should be alive");
            expect(_updatedGrid[5][4]).toBeTruthy("Cell [5,4] should be alive");
            expect(_updatedGrid[5][5]).toBeTruthy("Cell [5,5] should be alive");
        });
    });

    // -------------- Following tests check the internal functions that is central to this game ------------- //
    describe("Rule 1: Under population", function(){
        var currentState = true;
        var game = new GameOfLife(true);
        game.initGame(10);

        it("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", function(){

            var futureState = game._calculateCellState(currentState, 0);
            expect(futureState).toBeFalsy("With 0 neighbour a cell should die");
            
            futureState = game._calculateCellState(currentState, 1);
            expect(futureState).toBeFalsy("With 1 neighbour a cell should die");
        });
    });

    describe("Rule 2: Survival of the Living", function(){
        var currentState = true;
        var game = new GameOfLife(true);
        game.initGame(10);
        it("Any live cell with two or three live neighbours lives on to the next generation.", function(){

            var futureState = game._calculateCellState(currentState, 2);
            expect(futureState).toBeTruthy("With 2 neighbour a cell should survive the next generation");
            
            futureState = game._calculateCellState(currentState, 3);
            expect(futureState).toBeTruthy("With 1 neighbour a cell should survive the next generation");
        });
    });

    describe("Rule 3: Over population", function(){
        var currentState = true;
        var game = new GameOfLife(true);
        game.initGame(10);
        it("Any live cell with more than three live neighbours dies, as if by overpopulation.", function(){

            var futureState = game._calculateCellState(currentState, 4);
            expect(futureState).toBeFalsy("With 4 neighbours, a cell should die");
            
            futureState = game._calculateCellState(currentState, 5);
            expect(futureState).toBeFalsy("With 5 neighbours, a cell should die");

            futureState = game._calculateCellState(currentState, 6);
            expect(futureState).toBeFalsy("With 6 neighbours, a cell should die");

            futureState = game._calculateCellState(currentState, 7);
            expect(futureState).toBeFalsy("With 7 neighbours, a cell should die");

            futureState = game._calculateCellState(currentState, 8);
            expect(futureState).toBeFalsy("With 8 neighbours, a cell should die");
        });
    });

    describe("Rule 4: Rebirth", function(){
        var currentState = false;
        var game = new GameOfLife(true);
        game.initGame(10);
        it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function(){

            var futureState = game._calculateCellState(currentState, 3);
            expect(futureState).toBeTruthy("With 3 neighbour, a dead cell should be reborn");
            
        });
    });

    describe ("Check Neighbour calculation", function(){
        var game = new GameOfLife(true);
        game.initGame(10);
        neighbours = game._getNeighbours(10, 5, 5);
        it("Neighbours for 5,5 should be (4,4), (4,5), (4,6),(5,4), (5,6), (6,4), (6,5), (6,6)", function(){
            expect(neighbours.length).toEqual(8, "Any cell has 8 neighbours");
            expect(neighbours).toContain([4,4]);
            expect(neighbours).toContain([4,5]);
            expect(neighbours).toContain([4,6]);
            expect(neighbours).toContain([5,4]);
            expect(neighbours).toContain([5,6]);
            expect(neighbours).toContain([6,4]);
            expect(neighbours).toContain([6,5]);
            expect(neighbours).toContain([6,6]);
        })
    });


    describe ("Check a stable 2x2 shape", function(){   
        var game = new GameOfLife(true);
        game.initGame(10);

        // "Stable2x2": [ [4,4,true], [5,4,true], [4,5,true], [5,5,true] ]
        game.addShape("nearStable2x2");
        game.nextGeneration();

        it("Positions dont change once we get a 2x2", function(){
            expect(game.gameGrid[4][4] &&  game.gameGrid[5][4] && game.gameGrid[5][5])
            .toBeTruthy("Cell for 2x2 should be alive in all generations");
        })
    });

    describe ("Glider should glide through in each generation", function(){   
        var game = new GameOfLife(true);
        game.initGame(10);

        // "glider": [[4, 4, true], [6, 4, true], [5, 5, true], [6, 5, true], [5, 6, true]]
        game.addShape("glider");
        game.nextGeneration();

        it("Positions should change for a glider", function(){
            expect(game.gameGrid[4][4] && game.gameGrid[6][4] && game.gameGrid[5][5] 
                && game.gameGrid[6][5] && game.gameGrid[5][6] )
            .toBeFalsy("Positions should not remain same for a glider across generations");
        })
    });
});