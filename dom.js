
class DOM {
    static createGrid(player) {
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
                cell.className = 'cell';
                cell.id = `${grid.id}-${letters[r]}${c}`;
                grid.appendChild(cell);
            }
        }
    }

    static placeShip(grid, coord) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = 'S';
    }

    static hitSpace(grid, coord) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = 'X';
    }

    static missSpace(grid, coord) {
        const cell = document.getElementById(`${grid.id}-${coord}`);
        cell.textContent = 'O';
    }
}

export default DOM;