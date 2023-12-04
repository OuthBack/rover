import {
    AnotherRoverAtPositionError,
    OutOfPlateauError,
} from '../app/errors/plateau.error';
import { Plateau } from '../app/plateau';
import { Rover } from '../app/rover';

describe('Rover', () => {
    let rover: Rover;
    let plateau: Plateau;

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
                const errorFunction = () =>
                    rover.setPosition(pos[0], pos[1]).getPosition();
                expect(errorFunction).toThrow(OutOfPlateauError);
            });
            it('[6, 6]', () => {
                const pos = [6, 6];
                const errorFunction = () =>
                    rover.setPosition(pos[0], pos[1]).getPosition();
                expect(errorFunction).toThrow(OutOfPlateauError);
            });
        });
    });

    describe('should move forward', () => {
        beforeEach(() => {
            plateau = new Plateau(5, 5);
            rover = new Rover(plateau).setPosition(3, 3);
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

        it('and check if previus position was reseted', () => {
            const pos = [1, 1];
            rover.setPosition(pos[0], pos[1]).moveForward();
            const element = plateau.getElement(pos[0], pos[1]);

            expect(element).toBe(0);
        });

        it('Has another rover at the position', () => {
            rover.setPosition(1, 1);
            const newRover = new Rover(plateau).setPosition(1, 0);

            const errorFunction = () => newRover.moveForward();

            expect(errorFunction).toThrow(AnotherRoverAtPositionError);
        });
    });

    describe('should rotate', () => {
        beforeEach(() => {
            rover = new Rover(new Plateau(5, 5)).setPosition(3, 3);
        });
        describe('to right', () => {
            const rotationDirection = 'R';
            it('from N', () => {
                const direction = rover
                    .setDirection('N')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('E');
            });
            it('from E', () => {
                const direction = rover
                    .setDirection('E')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('S');
            });
            it('from S', () => {
                const direction = rover
                    .setDirection('S')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('W');
            });
            it('from W', () => {
                const direction = rover
                    .setDirection('W')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('N');
            });
        });
        describe('to left', () => {
            const rotationDirection = 'L';
            it('from N', () => {
                const direction = rover
                    .setDirection('N')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('W');
            });
            it('from W', () => {
                const direction = rover
                    .setDirection('W')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('S');
            });
            it('from S', () => {
                const direction = rover
                    .setDirection('S')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('E');
            });
            it('from E', () => {
                const direction = rover
                    .setDirection('E')
                    .rotate(rotationDirection)
                    .getDirection();

                expect(direction).toBe('N');
            });
        });
    });

    describe('should run command', () => {
        beforeEach(() => {
            rover = new Rover(new Plateau(5, 5))
                .setPosition(0, 0)
                .setDirection('N');
        });

        it('move forward', () => {
            const position = rover.command('M').getPosition();

            expect(position).toEqual([0, 1]);
        });

        describe('rotate', () => {
            it('right', () => {
                const direction = rover.command('R').getDirection();

                expect(direction).toBe('E');
            });
            it('left', () => {
                const direction = rover.command('L').getDirection();

                expect(direction).toBe('W');
            });
        });
    });
});
