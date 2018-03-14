//Tile object

class Tile {
    constructor(x, y, size, c, r, baseC, imList) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseC = baseC;
        this.imageList = imList;
        this.imgNum = 0;
        this.indexC = c;
        this.indexR = r;
    }


    update() {
        fill(this.baseC);
        //stroke(250);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
        image(this.imageList[this.imgNum], this.x, this.y, this.size, this.size);
    }
    //Element symbol displayed is dependent on which character is in use
    eImage() {

        if (air == true) {
            this.imgNum = 4;
        } else if (water == true) {
            this.imgNum = 1;
        } else if (fire == true) {
            this.imgNum = 3;
        } else if (earth == true) {
            this.imgNum = 2;
        } else {
            this.imgNum = 0;
        }
    }

    showNum() {
        console.log(this.indexR, this.indexC);
    }

    checkWithin(x, y) {
        if (x > this.x &&
            x < this.x + this.size &&
            y > this.y &&
            y < this.y + this.size) {

            return true;
        } else {
            return false;
        }
    }
}
