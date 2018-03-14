//Sprite Character

class Character {
    constructor(pic, row, col, n) {
        this.size = tileSize;
        this.pic = pic;
        this.row = row;
        this.col = col;
        this.nFrms = n;
        this.curF = 0; // current frame number in animation

        this.transTab = [
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
            [5, 5],
            [6, 0],
            [1, 1],
        ];

    }

    transition() {
        var inputType;
        if (air == true || earth == true) {
            inputType = 0;
        } else {
            inputType = 1;
        }

        this.curF = this.transTab[this.curF][inputType];
    }

    //displays the sprite
    update() {
        //Displays the character
        image(this.pic[this.curF], this.col * this.size, this.row * this.size, this.size, this.size);

    }



    //moves right
    moveRight() {
        if (this.col < cols - 1) {
            this.col += 1;
        }
    }

    //moves left
    moveLeft() {
        if (this.col > 0) {
            this.col -= 1;
        }
    }

    //moves up
    moveUp() {
        if (this.row > 0) {
            this.row -= 1;
        }
    }

    //moves down
    moveDown() {
        if (this.row < rows - 1) {
            this.row += 1;
        }
    }

    goTo(r, c) {
        this.col = c;
        this.row = r;
    }
    //checks if mouse is within boundaries of character tile
    checkWithin(x, y) {
        if (x > (this.col) * this.size &&
            x < (this.col + 1) * this.size &&
            y > (this.row) * this.size &&
            y < (this.row + 1) * this.size) {

            return true;
        } else {
            return false;
        }
    }


}
