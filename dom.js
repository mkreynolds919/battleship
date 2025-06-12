import { GameController } from "./scripts.js";

class DOM {
    static createGrid(player) {
        const container = player.grid.parentElement;
        container.insertBefore(this.createHeader(player), player.grid);
        this.createHeader(player);
        const grid = player.grid;
        grid.innerHTML = '';
        const letters = 'abcdefghij';
        for (let r = 0; r < 11; r++) {
            const cell = document.createElement('div');
            cell.className = "header";
            if (r == 0) {
                cell.textContent = '';
            } else {
                cell.textContent = `${r}`;
            }
            grid.appendChild(cell);
        }
        for (let r = 0; r < 10; r++) {
            const cell = document.createElement('div');
            cell.className = "header";
            cell.textContent = letters[r].toUpperCase();
            grid.appendChild(cell);
            for (let c = 1; c <= 10; c++) {
                const cell = document.createElement('div');
                cell.addEventListener('click', () => {
                    if (player == GameController.currentPlayer) {
                        player.gameboard.receiveAttack(`${letters[r]}${c}`);
                    }
                });
                cell.className = 'cell';
                cell.id = `${grid.id}-${letters[r]}${c}`;
                grid.appendChild(cell);
            }
        }
    }

    static placeShip(grid, coord, length) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = length;
    }

    static hitSpace(grid, coord) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = 'X';
    }

    static missSpace(grid, coord) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = 'O';
    }

    static createHeader(player) {
        const header = document.createElement('div');
        header.className = 'name-header';
        header.textContent = `${player.name}`;
        return header;
    }

    static hideShips(player) {
        for (const key in player.gameboard.gameboard) {
            const space = document.getElementById(`${player.grid.id}-${key}`);
            if (space.textContent !== 'X' && space.textContent !== 'O') {
                space.textContent = '';
            }
        }
    }

    static revealShips(player) {
        for (const key in player.gameboard.gameboard) {
            const space = document.getElementById(`${player.grid.id}-${key}`);
            if (space.textContent == '') {
                space.textContent = player.gameboard.gameboard[key].length;
            }
        }
    }

    static createStartButton() {
        const start = document.createElement('button');
        start.textContent = "Start Game";
        start.id = "start-button";
        start.addEventListener('click', () => {
            DOM.revealShips(GameController.opponent);
            start.remove();
        });
        return start;
    }

    static createSwitchTurnButton() {
        const switchTurn = document.createElement('button');
        switchTurn.textContent = 'Switch Turn';
        switchTurn.id = 'switch-turn-button';
        switchTurn.addEventListener('click', () => {
            GameController.switchTurn();
            switchTurn.remove();
        });
        return switchTurn;
    }

    static clearBoard(player) {
        player.gameboard.gameboard = {};
        for (const key in player.gameboard.missSpaces) {
            const space = document.getElementById(`${player.grid.id}-${key}`);
            space.textContent = '';
        }
        for (const key in player.gameboard.hitSpaces) {
            const space = document.getElementById(`${player.grid.id}-${key}`);
            space.textContent = '';
        }
    }
}

export default DOM;