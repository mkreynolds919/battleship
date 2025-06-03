
export class Ship {
    constructor(length) {
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

