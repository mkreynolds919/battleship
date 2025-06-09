import DOM from "./dom.js";
import { Ship, Gameboard, Player } from "./scripts.js";


const player1 = new Player();
const player2 = new Player();

const grid1 = document.getElementById("grid1");
const grid2 = document.getElementById("grid2");

const dom1 = new DOM("grid1");
const dom2 = new DOM("grid2");

dom1.createGrid();
dom2.createGrid();
