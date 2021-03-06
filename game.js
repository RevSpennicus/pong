var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballSpeedX = 8;
var ballSpeedY = 8;
var bg, ball, player, opponent, pScore, oScore;

var playerY = 250;
var PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 15;
var opponentY = 250;
var opponentSpeedY = 6;

var playerScore = 0;
var opponentScore = 0;
var colorTheme = 0;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
        };
    }

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    const framesPerSecond = 60;
    setInterval(function() {
        moveEverything();
        drawEverything(colorTheme);
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerY = mousePos.y-(PADDLE_HEIGHT/2);
        });
    }

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    }

function computerMovement() {
    var opponentYCenter = opponentY + (PADDLE_HEIGHT/2);
    if (ballY-15 > opponentYCenter) {
        opponentY += opponentSpeedY
    } else if (ballY+15 < opponentYCenter){
        opponentY -= opponentSpeedY
        }
    }

function moveEverything() {
    computerMovement();
    playerYCenter = playerY + (PADDLE_HEIGHT/2);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width) {
        if(ballY > opponentY && ballY < opponentY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (opponentY+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.3;
        } else {
        ballReset();
        playerScore += 1;
        if (playerScore == 10) {
            alert("You win!");
            scoreReset();
            sleep(1000);
            }
        }
    } else if (ballX <= 0) {
        if(ballY > playerY && ballY < playerY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
                    
            var deltaY = ballY - (playerY+PADDLE_HEIGHT/2);
                    
            ballSpeedY = deltaY * 0.3;
        } else {
            ballReset();
            opponentScore += 1;
            if (opponentScore == 10) {
                alert("You lose!");
                scoreReset();
                sleep(1000);
                }
            }
        } if (ballY <= 0) {
            ballSpeedY = -ballSpeedY;
        } else if (ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
    }

function scoreReset() {
    playerScore = 0;
    opponentScore = 0;
    }

function drawNet(colorTheme) {
    switch(colorTheme) {
    case 1:
        for (var i=0;i<canvas.height; i+=40) {
            colorRect(canvas.width/2-1, i,2,20, 'yellow');
            }
        break;
    case 2:
        for (var i=0;i<canvas.height; i+=40) {
            colorRect(canvas.width/2-1, i,2,20, '#0F380F');
            }
        break;
    case 3:
        for (var i=0;i<canvas.height; i+=40) {
            colorRect(canvas.width/2-1, i,2,20, 'hsl(180deg,100%,60%)');
            }
        break;
    case 4:
        for (var i=0;i<canvas.height; i+=40) {
            colorRect(canvas.width/2-1, i,2,20, 'hsl(60deg,100%,50%)');
            }
        break;
    default:
        for (var i=0;i<canvas.height; i+=40) {
            colorRect(canvas.width/2-1, i,2,20, 'hsl(160deg, 30%, 60%)');
            }
        break;
        }
    }

function drawEverything(colorTheme) {
    switch(colorTheme) {
    //aesthetic
    case 1:
        document.body.style.background = "linear-gradient(90deg, hsl(180deg, 60%, 60%), hsl(300deg, 80%, 80%))"
        //background
        bg = colorRect(0, 0, canvas.width, canvas.height, 'black');
        //ball
        ball = colorCirc(ballX, ballY, 8, 0, Math.PI * 2, true, "yellow"); 
        //player
        player = colorRect(0,playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'cyan');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(playerScore, (canvas.width/4)-25, 50);
        //opponent
        opponent = colorRect(canvas.width-PADDLE_WIDTH,opponentY, PADDLE_WIDTH, PADDLE_HEIGHT,'magenta');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(opponentScore, (3*(canvas.width/4)), 50);
        drawNet(colorTheme);
        break;
    //gameboy
    case 2:
        document.body.style.background = "linear-gradient(180deg, #0F380F, #CADC9F)"
        //background
        bg = colorRect(0, 0, canvas.width, canvas.height, '#CADC9F');
        //ball
        ball = colorCirc(ballX, ballY, 8, 0, Math.PI * 2, true, '#0F380F'); 
        //player
        player = colorRect(0,playerY, PADDLE_WIDTH, PADDLE_HEIGHT, '#306230');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(playerScore, (canvas.width/4)-25, 50);
        //opponent
        opponent = colorRect(canvas.width-PADDLE_WIDTH,opponentY, PADDLE_WIDTH, PADDLE_HEIGHT,'#306230');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(opponentScore, (3*(canvas.width/4)), 50);
        drawNet(colorTheme);
        break;
    //chill
    case 3:
        //designed by my lovely fiance haley <3
        document.body.style.background = "linear-gradient(180deg,hsl(320deg,100%,80%),hsl(60deg,100%,85%))"
        //background
        bg = colorRect(0, 0, canvas.width, canvas.height, "hsl(180deg,100%,97%)");
        //ball
        ball = colorCirc(ballX, ballY, 8, 0, Math.PI * 2, true, 'hsl(180deg,100%,40%)'); 
        //player
        player = colorRect(0,playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'hsl(320deg,100%,80%');
        //player score
        canvasContext.font = '50px monospace';
        canvasContext.fillText(playerScore, (canvas.width/4)-25, 50);
        //opponent
        opponent = colorRect(canvas.width-PADDLE_WIDTH,opponentY, PADDLE_WIDTH, PADDLE_HEIGHT,'hsl(45deg,100%,80%)');
        //opp score
        canvasContext.font = '50px monospace';
        canvasContext.fillText(opponentScore, (3*(canvas.width/4)), 50);
        drawNet(colorTheme);
        break;
    //rasta
    case 4:
        document.body.style.background = "linear-gradient(90deg,hsl(120deg,80%,60%),hsl(60deg,80%,60%),hsl(0deg,80%,60%))"
        //background
        bg = colorRect(0, 0, canvas.width, canvas.height, "black");
        //ball
        ball = colorCirc(ballX, ballY, 8, 0, Math.PI * 2, true, 'hsl(60deg,100%,60%)'); 
        //player
        player = colorRect(0,playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'hsl(120deg,100%,60%)');
        //player score
        canvasContext.font = '50px monospace';
        canvasContext.fillText(playerScore, (canvas.width/4)-25, 50);
        //opponent
        opponent = colorRect(canvas.width-PADDLE_WIDTH,opponentY, PADDLE_WIDTH, PADDLE_HEIGHT,'hsl(0deg,100%,60%)');
        //opp score
        canvasContext.font = '50px monospace';
        canvasContext.fillText(opponentScore, (3*(canvas.width/4)), 50);
        drawNet(colorTheme);
        break;
    //01 
    default:
        document.body.style.background = "linear-gradient(90deg, hsl(280, 60%, 60%),hsl(120deg, 60%, 60%))"
        //background
        bg = colorRect(0, 0, canvas.width, canvas.height, 'black');
        //ball
        ball = colorCirc(ballX, ballY, 8, 0, Math.PI * 2, true, "hsl(160deg, 30%, 60%)"); 
        //player
        player = colorRect(0,playerY, PADDLE_WIDTH, PADDLE_HEIGHT, 'hsl(120deg, 60%, 60%)');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(playerScore, (canvas.width/4)-25, 50);
        //opponent
        opponent = colorRect(canvas.width-PADDLE_WIDTH,opponentY, PADDLE_WIDTH, PADDLE_HEIGHT,'hsl(280, 60%, 60%)');
        canvasContext.font = '50px monospace';
        canvasContext.fillText(opponentScore, (3*(canvas.width/4)), 50);
        drawNet();
        break;
        }
    }
        
function colorCirc(leftX, topY, radius, int, circumference, bool, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(leftX, topY, radius, int, circumference, bool);
    canvasContext.fill();
    }

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height)
    }

function changeTheme(x) {
    colorTheme = x;
    ballReset();
    scoreReset();
    sleep(1000);
    }

//stack overflow says this is bad but it does what is wanted
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
    }

function turboSwitch(x) {
    switch(x){
    //medium
    case 1:
        ballSpeedX = 16;
        ballSpeedY = 16;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
    //hard
    case 2:
        ballSpeedX = 32;
        ballSpeedY = 32;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
    //expert
    case 3:
        ballSpeedX = 64;
        ballSpeedY = 64;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
    //easy
    default:
        ballSpeedX = 8;
        ballSpeedY = 8;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
        }
    }

function paddleSwitch(x) {
    switch(x){
    //0.5x
    case 1:
        PADDLE_HEIGHT = 50;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
    //0.25x
    case 2:
        PADDLE_HEIGHT = 25;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
    //1x
    default:
        PADDLE_HEIGHT = 100;
        ballReset();
        scoreReset();
        sleep(1000);
        break;
        }
    }