import { Ship, Gameboard, Player } from "./scripts.js";


const player1 = new Player();
const player2 = new Player();

player1.gameboard.placeShip(2, "e6", "h");
player1.gameboard.placeShip(3, "a2", "v");
player1.gameboard.placeShip(3, "d1", "h");
player1.gameboard.placeShip(4, "b8", "v");
player1.gameboard.placeShip(5, "c1", "v");

player2.gameboard.placeShip(2, "a6", "h");
player2.gameboard.placeShip(3, "b1", "v");
player2.gameboard.placeShip(3, "e4", "h");
player2.gameboard.placeShip(4, "j1", "v");
player2.gameboard.placeShip(5, "g2", "v");