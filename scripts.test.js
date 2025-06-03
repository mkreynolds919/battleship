import { Ship } from './scripts';

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