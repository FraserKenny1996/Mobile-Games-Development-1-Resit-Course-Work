   //javascript


function changeDivImage()
    {
    console.log("image change");
        var imgPath = new String();
        imgPath = document.getElementById("startScreen").style.backgroundImage;

        if(imgPath == "url(startScreen.png)" || imgPath == "")
        {
            document.getElementById("startScreen").style.backgroundImage = "url(background.png)";
        }
        else
        {
            //document.getElementById("startScreen").style.backgroundImage = "url(startScreen.png)";
            canvas.drawImage("url(startScreen.png)",0,0,1200,800);
        }
    }

function myFunction()
{
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

//  var c = document.getElementById("myCanvas");
//  var ctx = c.getContext("2d");

console.log("gamestart");
//make an object for the player so we can edit it's position aka move the player
    var player = {
        top: 700,
        left: 550
    };

    //move booleans for enemies
    var moveRight = true;
    var moveLeft = false;

    //can the player move
    var canMoveR = true;
    var canMoveL = true;

    let deadenemy = new Audio();
    let shoot = new Audio();
    let playerdam = new Audio();
    let moveright = new Audio();
    let moveleft = new Audio();
    let movedown = new Audio();
    let gg = new Audio();

    var gameOver = false;

    deadenemy.src = "audio/explode.mp3";
    shoot.src = "audio/shoot.mp3";
    playerdam.src = "audio/pexplode.mp3";
    moveright.src = "audio/moveright.wav";
    moveleft.src = "audio/moveleft.wav";
    movedown.src = "audio/movedown.wav";
    gg.src = "audio/gg.wav";

    const sovietImg = new Image();
    sovietImg.src = "background.png";

    //record touch input
    var touchX = 0;
    var touchY = 0;

    var lives = 5;

    var score = 0;

    var moveSpeed = 10;

    //array of projectiles
    var projectiles = [];

    //array of enemies
    var enemies= [
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 400, top: 100 },
        { left: 500, top: 100 },
        { left: 600, top: 100 },
        { left: 700, top: 100 },
        { left: 800, top: 100 },
        { left: 900, top: 100 },
        { left: 200, top: 175 },
        { left: 300, top: 175 },
        { left: 400, top: 175 },
        { left: 500, top: 175 },
        { left: 600, top: 175 },
        { left: 700, top: 175 },
        { left: 800, top: 175 },
        { left: 900, top: 175 },
        { left: 200, top: 250 },
        { left: 300, top: 250 },
        { left: 400, top: 250 },
        { left: 500, top: 250 },
        { left: 600, top: 250 },
        { left: 700, top: 250 },
        { left: 800, top: 250 },
        { left: 900, top: 250 },
        { left: 200, top: 325 },
        { left: 300, top: 325 },
        { left: 400, top: 325 },
        { left: 500, top: 325 },
        { left: 600, top: 325 },
        { left: 700, top: 325 },
        { left: 800, top: 325 },
        { left: 900, top: 325 },
    ];

    document.onkeydown = function(e)
    {
    //check if can move left or right
    if(player.left <= 1150)
    {
        canMoveL = true;
    }
    else
    {
        canMoveL = false;
    }

    //check if can move left or right
    if(player.left >= 50)
    {
        canMoveR = true;
    }
    else
    {
        canMoveR = false
    }

    //detect left arrow check if can move left is true
    //check if lives = 0 if so dont allow input
        if(lives > 0)
        {
            if ((e.keyCode == 37) && (canMoveL == true))
            {
                player.left = player.left - 10;
                movePlayer();
            }
            //detect right arrow check if can move right is true
            else if ((e.keyCode == 39) && (canMoveR == true))
            {
                player.left = player.left + 10;
                movePlayer();
            }

            //check space bar
            else if (e.keyCode == 32)
            {
                projectiles.push({
                left: player.left + 25,
                top: player.top


                })
                drawProjectiles();
                shoot.play();
             }
        }

/*
    //get touch input
    document.querySelector('.container').addEventListener('touchStart', function(e)
    {
        touchX = e.touches[0].pageX;
        touchY = e.touches[0].pageY;

//move using touch input

        //detect x less that 600 and check if can move left
        if ((touchX < 600) && (canMoveL == true))
        {
            player.left = player.left - 10;
            movePlayer();
        }
        //detect x higher than 600 check if can move right is true
        if ((touchX > 600 && (canMoveR == true))
        {
            player.left = player.left + 10;
            movePlayer();
        }

        //check touch y coord
        if (touchY < 600)
        {
            projectiles.push({
            left: player.left + 25,
            top: hero.top

            })
            drawProjectiles();
            shoot.play();
        }
    }
*/

    }
    //if there has been a change in position redraw the player
    function movePlayer()
    {
        document.getElementById('player').style.left = player.left + "px";
        playerImage = new Image();
        playerImage.src = 'playership.png';
        playerImage.onload = function(){
        ctx.drawImage(playerImage, player.left + "px" , player.top + "px",50,50);
      }
    }

    //draw playerProjectiles
    function drawProjectiles()
    {
        document.getElementById('projectiles').innerHTML = "";
        for(var projectile = 0; projectile < projectiles.length; projectile = projectile + 1)
        {
        document.getElementById('projectiles').innerHTML +=
        "<div class = 'projectile' style='left:${projectiles[projectile.left}px' top:${projectiles[projectile].top}px;'></div>";
        projectileImage = new Image();
        projectileImage.src = 'projectile.png';
        projectileImage.onload = function(){
        ctx.drawImage(projectileImage, projectile.left + "px" , projectile.top + "px",10,16);
        //context.drawImage(img,x,y,width,height);
        }

//        {
//          base_image = new Image();
//          base_image.src = 'img/base.png';
//          base_image.onload = function(){
//            context.drawImage(base_image, 0, 0);
//          }

        }
    }

//if there are projectiles we want to move them every frame
    function moveProjectiles()
    {
        for(var projectile = 0; projectile < projectiles.length; projectile = projectile + 1)
        {
            projectiles[projectile].top = projectiles[projectile].top - 20;
        }
    }

//we need to now draw the enemies
    function drawEnemies()
    {
        document.getElementById('enemies').innerHTML = "";
        for(var enemy = 0; enemy < enemies.length; enemy = enemy + 1)
        {
        document.getElementById('enemies').innerHTML +=
        "<div class = 'enemy' style='left:${enemies[enemy].left}px' top:${enemies[enmey].top}px;'></div>";
        enemyImage = new Image();
        enemyImage.src = 'enemy1.png';
        enemyImage.onload = function(){
        ctx.drawImage(enemyImage, enemy.left + "px" , enemy.top + "px",50,50);
      }
        }
    }

//if there are enemies we want to move them every frame
//if the enemy is at the edge of the screen move them down and move in the other direction
    function moveEnemies()
    {
        for(var enemy = 0; enemy < enemies.length; enemy = enemy + 1)
        {
            if((enemies[enemy].left < 1150) && (moveRight == true))
            {
                enemies[enemy].left = enemies[enemy].left + moveSpeed;
                moveright.play();
            }
            else if((enemies[enemy].left >= 1150) && (moveRight == true))
            {
                enemies[enemy].top = enemies[enemy].top + moveSpeed;
                moveSpeed = moveSpeed + 10;
                moveRight = false;
                moveLeft = true;
                movedown.play();
            }
            else if((enemies[enemy].left > 50) && (moveLeft == true))
            {
                enemies[enemy].left = enemies[enemy].left - moveSpeed;
                moveleft.play();
            }
            else if((enemies[enemy].left <= 50) && (moveLeft == true))
            {
                enemies[enemy].top = enemies[enemy].top + moveSpeed;
                moveSpeed = moveSpeed + 10;
                moveRight = true;
                moveLeft = false;
                movedown.play();
            }

        }
    }

//check for collisions
    function collisDect()
    {
        for(var enemy = 0; enemy < enemies.length; enemy = enemy + 1)
        {
            for(var projectile = 0; projectile < projectiles.length; projectile = projectile + 1)
            {
            //is the shot between the bottom and top of the enemy sprite
                if ((projectiles[projectile].top <= enemies[enemy].top + 50) &&
                    (projectiles[projectile].top >= enemies[enemy].top) &&
                    (projectiles[projectile].left <= enemies[enemy].left + 50) &&
                    (projectiles[projectile].left >= enemies[enemy].left))
                {
                //remove this element from the array
                   enemies.splice(enemy, 1);
                   projectiles.splice(projectile, 1);
                   deadenemy.play();
               //increase score
                   score = score + 100;
                }
            }
            if((enemies[enemy].top + 50 <= player.top) &&
            (enemies[enemy].top >= player.top) &&
            (enemies[enemy].left + 50 <= player.left) &&
            (enemies[enemy].left >= player.left))
            {
                //remove this element from the array
                   enemies.splice(enemy, 1);
               //check lives
                    if(lives > 0)
                    {
                        lives = lives - 1;
                    }
            }
        }
    }

//draw the score to the screen
    function drawScore()
    {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);

        // fill background with image
        var pat=ctx.createPattern(sovietImg,"no-repeat");
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle=pat;
        ctx.fill();

    }

//this is the game loop
    function loop()
    {
    if(gameOver == false)
    {
    moveProjectiles();
    drawProjectiles();

    moveEnemies();
    drawEnemies();

    drawScore();

    collisDect();
    }
    else
    {
        var pat=ctx.createPattern(gameOverScreen,"repeat");
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle=pat;
        ctx.fill();
        //make sure score is visible
        drawScore();
        //play mp3
        gg.play();

    }

    //set a time period for the game loop to take place should be every second
        setTimeout(loop, 1000);
    }

    if(gameOver == false)
    {
    loop();
    }

}
