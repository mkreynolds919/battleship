import DOM from "./dom.js";

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
    constructor(grid) {
        this.gameboard = {};
        this.missSpaces = [];
        this.hitSpaces = [];
        this.ships = [];
        this.grid = grid;
    }

    placeShip(length, root, dir) {
       if (this.rootIsValid(root) && this.dirIsValid(dir) && this.shipCanFit(length, root, dir) && this.notOccupied(length, root, dir)) {
            const ship = new Ship(length);
            this.ships.push(ship);
            let char = root[0];
            let num = root.slice(1);
            for (let i = 0; i < length; i++) {
                this.gameboard[`${char}${num}`] = ship;
                DOM.placeShip(this.grid, `${char}${num}`, length);
                if (dir === 'h') {
                    num = String(parseInt(num) + 1);
                } else {
                    char = String.fromCharCode(char.charCodeAt(0) - 1);
                }
            }
       } else {
            return false;
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

    notOccupied(length, root, dir) {
        let char = root[0];
        let num = root.slice(1);
        for (let i = 0; i < length; i++) {
            if (this.gameboard[`${char}${num}`] !== undefined) {
                return false;
            } else {
                if (dir === 'h') {
                    num = String(parseInt(num) + 1);
                } else {
                    char = String.fromCharCode(char.charCodeAt(0) - 1);
                }
            }
        }
        return true;
    }

    receiveAttack(coord) {
        if (this.rootIsValid(coord)) {
            if (this.gameboard[coord]) {
                let ship = this.gameboard[coord];
                ship.hit();
                this.hitSpaces.push(coord);
                this.logHitMessage(ship, coord);
                DOM.hitSpace(this.grid, coord);
                GameController.switchTurn();
                return true;
            } else {
                this.missSpaces.push(coord);
                this.logMissMessage(coord);
                DOM.missSpace(this.grid, coord);
                GameController.switchTurn();
                return false;
            }
        }
    }

    allShipsSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    logHitMessage(ship, coord) {
        if (this.allShipsSunk()) {
            console.log("All ships have sunk! Game over!");
        } else if (ship.isSunk()) {
            console.log("Ship has been sunk!");
        } else {
            console.log(`${coord} is a hit!`);
        }
    }

    logMissMessage(coord) {
        console.log(`${coord} is a miss!`);
    }
}

class Player {
    constructor(gridID) {
        this.grid = document.getElementById(gridID);
        this.gameboard = new Gameboard(this.grid);
        if (gridID === "grid1") {
            this.name = "Player 1";
        } else {
            this.name = "Player 2";
        }
    }

    randomSetUp() {
        const letters = 'abcdefghij';
        const ships = [2, 3, 3, 4, 5];
        const directions = 'hv';
        for (const ship of ships) {
            let randChar = letters[(Math.floor(Math.random() * 10))];
            let randNum = Math.floor(Math.random() * 10) + 1;
            let randDir = directions[Math.floor(Math.random() * 2)];
            let result = this.gameboard.placeShip(ship, `${randChar}${randNum}`, randDir);
            while(result == false) {
                randChar = letters[(Math.floor(Math.random() * 10))];
                randNum = Math.floor(Math.random() * 10) + 1;
                randDir = directions[Math.floor(Math.random() * 2)];
                result = this.gameboard.placeShip(ship, `${randChar}${randNum}`, randDir);
            }
        }
    }
}

class GameController {
    static initialize(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player2;
        this.opponent = player1;
        player1.randomSetUp();
        player2.randomSetUp();
        DOM.hideShips(player1);
        DOM.hideShips(player2);
        document.getElementById('game-controller').appendChild(DOM.createStartButton());
    }

    static switchTurn() {
        DOM.hideShips(this.opponent);
        DOM.revealShips(this.currentPlayer);
        [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
    }
}

export { Ship, Gameboard, Player, GameController };

