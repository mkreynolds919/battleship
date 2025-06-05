
class Ship {
    constructor(length) {
        if (length < 1) { throw new Error("Length must be at least 1"); }
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (!this.isSunk()) {
            this.hits += 1;
            return this.hits;
        } else {
            return null;
        }
    }

    isSunk() {
        if (this.hits == this.length) {
            return true;
        } else {
            return false;
        }
    }
}

class Gameboard {
    constructor() {
        this.gameboard = {};
    }

    placeShip(length, root, dir) {
       if (this.rootIsValid(root) && this.dirIsValid(dir) && this.shipCanFit(length, root, dir)) {
            const ship = new Ship(length);
            let char = root[0];
            let num = root.slice(1);
            for (let i = 0; i < length; i++) {
                this.gameboard[`${char}${num}`] = ship;
                if (dir === 'h') {
                    num = String(parseInt(num) + 1);
                } else {
                    char = String.fromCharCode(char.charCodeAt(0) - 1);
                }
            }
       } 
    }

    rootIsValid(root) {
        if (root.match(/^[a-j](10|[1-9])$/)) {
            return true;
        } else {
            return false;
        }
    }

    dirIsValid(dir) {
        if (dir.match(/^(h|v)$/)) {
            return true;
        } else {
            return false;
        }
    }

    shipCanFit(length, root, dir) {
        if (dir === "h") {
            if (parseInt(root.slice(1))  + length > 10) {
                return false;
            }
        } else {
            if (root[0].charCodeAt(0) - length < "a".charCodeAt(0)) {
                return false;
            }
        }
        return true;
    }
}

export { Ship, Gameboard };

