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
                <li><a href="/">Home</a></li>
                <li class="active"><a href="/about">About</a></li>
            </ul>
            <h3 class="text-muted">Conway's Game Of Life</h3>
        </div>
        <br/>
        <i>Credits: <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Wikipedia</a>, <a href="http://www.math.cornell.edu/~lipa/mec/lesson6.html">Cornell University</a> </i>
        <br/>
        <div class="jumbotron" style="text-align: left">
        
        <p>
        The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway.
        </p>
        
        <p>The Game of Life is a zero-player game and played on an infinite two-dimensional rectangular grid of cells. 
        Each cell can be either alive or dead. 
        The status of each cell changes each turn of the game (also called a generation) 
        depending on the statuses of that cell's 8 neighbors. 
        
        Neighbors of a cell are cells that touch that cell, either horizontal, vertical, or diagonal from that cell.
		</p>

        <p>
        The initial pattern constitutes the seed of the system, is the first generation. 
        The second generation evolves from applying the rules simultaneously to every cell on the game board, 
        i.e. births and deaths happen simultaneously. 
        Afterwards, the rules are iteratively applied to create future generations. 
        
        For each generation of the game, a cell's status in the next generation is determined by a set of rules. 
        
        These simple rules are as follows:
        <div>
            <p>1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</p>
            <p>2. Any live cell with two or three live neighbours lives on to the next generation.</p>
            <p>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
            <p>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</p>
        </div>
		</p>
        </div>
    </div>
</body>
</html>