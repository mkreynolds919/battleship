import { Ship, Gameboard } from './scripts';

describe('Ship', () => {
    let ship;
    describe('Init', () => {
        beforeAll(() => {
            ship = new Ship(1);
        });
        test('Has initial length', () => {
            expect(ship.length).toBe(1);
        });
        test('Has zero hits initially', () => {
            expect(ship.hits).toBe(0);
        });
    });
    describe('Hits', () => {
        beforeAll(() => {
            ship = new Ship(1);
        });
        test('Gains hits', () => {
            expect(ship.hit()).toBe(1);
        });
        test('At length capacity', () => {
            ship.hits = 1;
            expect(ship.hit()).toBeNull();
        })
    });
    describe('isSunk', () => {
        beforeEach(() => {
            ship = new Ship(1);
        })
        test('Returns true', () => {
            ship.hit();
            expect(ship.isSunk()).toBe(true);
        });
        test('Returns false', () => {
            expect(ship.isSunk()).toBe(false);
        });
    });
});

describe('Gameboard', () => {
    let gameboard;
    beforeAll(() => {
         gameboard = new Gameboard();
    });
    test('Init', () => {
        expect(gameboard.gameboard).toBeTruthy();
    });
    describe('Place ship', () => {
        test('Validates root', () => {
            expect(gameboard.rootIsValid("e4")).toBe(true);
            expect(gameboard.rootIsValid("a11")).toBe(false);
        });
        test('Validates direction', () => {
            expect(gameboard.dirIsValid("h")).toBe(true);
            expect(gameboard.dirIsValid("a")).toBe(false);
        });
        test('Validates ship fitting', () => {
            expect(gameboard.shipCanFit(3, "a2", "h")).toBe(true);
            expect(gameboard.shipCanFit(5, "b2", "v")).toBe(false);
        });
        test('Places ship horizontally', () => {
            gameboard.placeShip(3, "e4", "h");
            expect(gameboard.gameboard["e4"].length).toBe(3);
            expect(gameboard.gameboard["e6"].length).toBe(3);
        });
        test('Places ship vertically', () => {
            gameboard.placeShip(5, "j6", "v");
            expect(gameboard.gameboard["j6"].length).toBe(5);
            expect(gameboard.gameboard["f6"].length).toBe(5);
        });
    });
})