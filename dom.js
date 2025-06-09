
export default class DOM {
    constructor(gridID) {
        this.grid = document.getElementById(gridID);
    }

    createGrid() {
        this.grid.innerHTML = '';
        const letters = 'abcdefghij';
        for (let r = 0; r < 10; r++) {
            for (let c = 1; c <= 10; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `${letters[r]}${c}`;
                this.grid.appendChild(cell);
            }
        }
    }
}