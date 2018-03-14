/*
Jin Jin Heipler
11/29/17
IGME-101: Project 3: Grid World
*/

//variables for the tiles
let tiles = [];
let images = [];
let tileSize = 50;
let rows = 12;
let cols = 12;

//variables for the animation for each character
var aa;
var ka;
var zu;
var to;
//variables for each character
var aang;
var katara;
var zuko;
var toph;

//booleans for each character
var air = true;
var water = false;
var fire = false;
var earth = false;

//The current character
var currentCharacter;
var currentRow;
var currentCol;

var nFrms = 7; // Number of frames in the animation
var animationRate = 1;






//emblem images from google images 
//Modified using Adobe Photoshop
function preload() {
    images.push(loadImage("images/avatartile1.png"));
    images.push(loadImage("images/water.png"));
    images.push(loadImage("images/earth.png"));
    images.push(loadImage("images/fire.png"));
    images.push(loadImage("images/air.png"));

    //Character images taken from google images, giphy.com, and SenchiSprite from DeviantArt, and modified in Adobe Photoshop

    aa = new Array(nFrms);
    ka = new Array(nFrms);
    zu = new Array(nFrms);
    to = new Array(nFrms);

    for (var i = 0; i < nFrms; i++) {
        // Number in the file name matches the array offset & loop counter i
        aa[i] = loadImage("images/aang/aang" + i + ".png");
        ka[i] = loadImage("images/katara/katara" + i + ".png");
        zu[i] = loadImage("images/zuko/zuko" + i + ".png");
        to[i] = loadImage("images/toph/toph" + i + ".png");
    }


}


function setup() {
    //Tiles
    createCanvas(cols * tileSize, rows * tileSize);
    background(180);
    frameRate(12);
    currentRow = 0;
    currentCol = 0;
    tileSize = width / cols;
    for (let r = 0; r < rows; r++) {

        let tempArray = [];
        for (let c = 0; c < cols; c++) {
            tempArray.push(new Tile(
                c * tileSize,
                r * tileSize,
                tileSize,
                r,
                c,
                "#D8BC84",
                images));

        }
        tiles.push(tempArray);
    }

    console.log(tiles)

    //Creates each character
    aang = new Character(aa, currentRow, currentCol, nFrms);
    katara = new Character(ka, currentRow, currentCol, nFrms);
    zuko = new Character(zu, currentRow, currentCol, nFrms);
    toph = new Character(to, currentRow, currentCol, nFrms);

}

function draw() {
    background(130);

    //makes the cursor Appa --> image taken from Pinterest and modified in Adobe Photoshop
    cursor("images/appa.png");


    //Changes current character between the 4 of them depending on which boolean is true
    if (air == true) {
        currentCharacter = aang;
    } else if (water == true) {
        katara.goTo(currentCharacter.row, currentCharacter.col);
        currentCharacter = katara;
    } else if (fire == true) {
        zuko.goTo(currentCharacter.row, currentCharacter.col);
        currentCharacter = zuko;
    } else if (earth == true) {
        toph.goTo(currentCharacter.row, currentCharacter.col);
        currentCharacter = toph;
    }

    //tile display
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles[r][c].update();

        }

    }
    //displays the current character w/ animation
    if (frameCount % animationRate == 0) {
        currentCharacter.transition();
        currentCharacter.update();

    }

    changeCharac();
}


//allows user to change the character by clicking on them
//cycles through --> order is as follows: Aang, Katara, Zuko, Toph
function mousePressed() {
    if (currentCharacter.checkWithin(mouseX, mouseY) == true && air == true) {
        water = true;
        air = false;
    } else if (currentCharacter.checkWithin(mouseX, mouseY) == true && water == true) {
        fire = true;
        water = false;
    } else if (currentCharacter.checkWithin(mouseX, mouseY) == true && fire == true) {
        earth = true;
        fire = false;
    } else if (currentCharacter.checkWithin(mouseX, mouseY) == true && earth == true) {
        aang.goTo(currentCharacter.row, currentCharacter.col);
        air = true;
        earth = false;
    }

}

//moves the character around and displays their respective element emblems on the last tile they were standing on
function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        currentCharacter.moveRight();
        tiles[currentCharacter.row][currentCharacter.col - 1].eImage();

    } else if (keyCode == LEFT_ARROW) {
        currentCharacter.moveLeft();
        tiles[currentCharacter.row][currentCharacter.col + 1].eImage();

    } else if (keyCode == UP_ARROW) {
        currentCharacter.moveUp();
        tiles[currentCharacter.row + 1][currentCharacter.col].eImage();

    } else if (keyCode == DOWN_ARROW) {
        currentCharacter.moveDown();
        tiles[currentCharacter.row - 1][currentCharacter.col].eImage();
    }
}

//transforms currentCharacter into the respective character depending on which tile it landed on
function changeCharac() {
    //makes the character katara if it lands on a water symbol

    if (tiles[currentCharacter.row][currentCharacter.col].imgNum == 1) {
        air = false;
        water = true;
        fire = false;
        earth = false;
    }
    //makes character toph if it lands on earth symbol
    else if (tiles[currentCharacter.row][currentCharacter.col].imgNum == 2) {
        air = false;
        water = false;
        fire = false;
        earth = true;
    }
    //makes character zuko if it lands on fire symbol
    else if (tiles[currentCharacter.row][currentCharacter.col].imgNum == 3) {
        air = false;
        water = false;
        fire = true;
        earth = false;
    }
    //makes character aang if it lands on air symbol --> you need to double-tap onto the air tile
    else if (tiles[currentCharacter.row][currentCharacter.col].imgNum == 4) {
        air = true;
        water = false;
        fire = false;
        earth = false;
    }
}
