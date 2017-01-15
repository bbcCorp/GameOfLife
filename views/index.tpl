<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>GameOfLife</title>
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="static/css/main.css" rel="stylesheet" media="screen">

</head>
<body>

    <div class="container">
        <div class="header">
            <ul class="nav nav-pills pull-right">
                <li class="active"><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
            <h3 class="text-muted">Conway's Game Of Life</h3>
        </div>
        
        <div class="canvas-container">
        <br/>
        <div class="form-group">
            <label>Select the shape you want: </label>
            <select id="creatures" class="form-control">
                <option selected>glider</option>
                <option>glider2</option>
                <option>starship</option>
                <option>nearStable2x2</option>
                <option>Stable2x2</option>
                <option>StableRing</option>
                <option>Tetrix1<option>
            </select>
        </div>
        <!-- This is the Canvas area where the gamePlot would be displayed -->
        <canvas id="c" width="500" height="500" style="border: 1px solid rgb(204, 204, 204);"></canvas>                
        <h2 id="iterationCounter">Iteration: 0</h2>    
        <br/>
        
        <div>
            <button class="btn btn-default" id="btnLaunchGame">Launch Game </button>
            <button class="btn btn-default" id="btnProceedGame">Proceed to Next Generation</button>            
        </div>

    </div>

    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="bower_components/fabric.js/dist/fabric.min.js"></script>
    <script type="text/javascript" src="static/js/gameOfLife.js"></script>
    
    <script>
        var animateGame = null;   
        var game = new GameOfLife();

        $(document).ready(function(){
            var self = this;


            // Create a 10x10 grid for the game 
            var gameGrid = game.initGame(20);
            game.initCellGrid();
            
            var selectedShape = $("#creatures").val();

            gameGrid = game.addShape( selectedShape );
            game.drawGrid(gameGrid);

            var showGameIteration = function(){
                $("#iterationCounter").text("Iteration: " + game.iteration);
            };

            $("#btnLaunchGame").on("click", function(){

                if(animateGame){
                    $(this).removeClass("btn-primary");
                    clearInterval(animateGame);
                    animateGame = null;
                }
                else {
                    $(this).addClass("btn-primary");
                    animateGame = setInterval( function(){
                       game.nextGeneration( showGameIteration);  
                    }, 100);
                }
                
            });

            $("#btnProceedGame").on("click", function(){
                game.nextGeneration(showGameIteration);
            })

            $("#creatures").on("change", function(){
                game.reset();
                var selectedShape = $("#creatures").val();
                gameGrid = game.addShape( selectedShape );
                game.drawGrid(gameGrid);
            });
        });
    </script>
</body>
</html>
