import DOM from "./dom.js";
import { Ship, Gameboard, Player, GameController } from "./scripts.js";


const player1 = new Player("grid1");
const player2 = new Player("grid2");
GameController.initialize(player1, player2);

DOM.createGrid(player1);
DOM.createGrid(player2);

player1.randomSetUp();
player2.randomSetUp();


