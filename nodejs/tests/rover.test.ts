import { OutOfPlateauError } from '../app/errors/plateau.error';
import { Plateau } from '../app/plateau';
import { Rover } from '../app/rover';

describe('Rover', () => {
    let rover: Rover;

    describe('should set position at', () => {
        beforeEach(() => {
            rover = new Rover(new Plateau(5, 5));
        });

        it('[0,0]', () => {
            const pos = [0, 0];
            const position = rover.setPosition(pos[0], pos[1]).getPosition();

            expect(position).toEqual(pos);
        });
        it('[2,3]', () => {
            const pos = [2, 3];
            const position = rover.setPosition(pos[0], pos[1]).getPosition();

            expect(position).toEqual(pos);
        });
        it('[5,5]', () => {
            const pos = [2, 3];
            const position = rover.setPosition(pos[0], pos[1]).getPosition();

            expect(position).toEqual(pos);
        });

        describe('Out of Plateau', () => {
            it('[-1, -1]', () => {
                const pos = [-1, -1];
                try {
                    rover.setPosition(pos[0], pos[1]).getPosition();
                } catch (e) {
                    expect(e).toBeInstanceOf(OutOfPlateauError);
                }
            });
            it('[6, 6]', () => {
                const pos = [6, 6];
                try {
                    rover.setPosition(pos[0], pos[1]).getPosition();
                } catch (e) {
                    expect(e).toBeInstanceOf(OutOfPlateauError);
                }
            });
        });
    });

    describe('should move forward', () => {
        beforeEach(() => {
            rover = new Rover(new Plateau(5, 5)).setPosition(3, 3);
        });

        it('to N', () => {
            rover.setDirection('N').moveForward();

            const position = rover.getPosition();
            expect(position).toEqual([3, 4]);
        });
        it('to E', () => {
            rover.setDirection('E').moveForward();

            const position = rover.getPosition();
            expect(position).toEqual([4, 3]);
        });
        it('to W', () => {
            rover.setDirection('W').moveForward();

            const position = rover.getPosition();
            expect(position).toEqual([2, 3]);
        });
        it('to S', () => {
            rover.setDirection('S').moveForward();

            const position = rover.getPosition();
            expect(position).toEqual([3, 2]);
        });
    });
});
