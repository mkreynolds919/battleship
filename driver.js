import DOM from "./dom.js";
import { Ship, Gameboard, Player } from "./scripts.js";


const player1 = new Player("grid1");
const player2 = new Player("grid2");

DOM.createGrid(player1);
DOM.createGrid(player2);


