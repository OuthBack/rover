import {
    AnotherRoverAtPositionError,
    OutOfPlateauError,
} from '../app/errors/plateau.error';
import { Plateau } from '../app/plateau';

describe('Plateau', () => {
    it('should create a matrix 6x6', () => {
        const plateau = new Plateau(5, 5);
        const matrix = plateau.getMatrix();

        expect(matrix).toEqual([
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]);
    });

    describe('should set and get rover at', () => {
        let plateau: Plateau;

        beforeEach(() => {
            plateau = new Plateau(5, 5);
        });

        it('[0, 0]', () => {
            plateau.setRoverAt(0, 0);
            const element = plateau.getElement(0, 0);

            expect(element).toBe(1);
        });

        it('[0, 1]', () => {
            plateau.setRoverAt(0, 1);
            const element = plateau.getElement(0, 1);

            expect(element).toBe(1);
        });

        it('[1, 0]', () => {
            plateau.setRoverAt(0, 1);
            const element = plateau.getElement(0, 1);

            expect(element).toBe(1);
        });

        it('[5, 4]', () => {
            plateau.setRoverAt(5, 4);
            const element = plateau.getElement(5, 4);

            expect(element).toBe(1);
        });

        it('[4, 5]', () => {
            plateau.setRoverAt(4, 5);
            const element = plateau.getElement(4, 5);

            expect(element).toBe(1);
        });

        it('[5, 5]', () => {
            plateau.setRoverAt(5, 5);
            const element = plateau.getElement(5, 5);

            expect(element).toBe(1);
        });

        describe('SetRoverAt', () => {
            beforeEach(() => {
                plateau = new Plateau(5, 5);
            });

            describe('Out of bound', () => {
                it('[-1, -1]', () => {
                    try {
                        plateau.setRoverAt(-1, -1);
                    } catch (e) {
                        expect(e).toBeInstanceOf(OutOfPlateauError);
                    }
                });

                it('[6, 6]', () => {
                    try {
                        plateau.setRoverAt(6, 6);
                    } catch (e) {
                        expect(e).toBeInstanceOf(OutOfPlateauError);
                    }
                });

                it('[10, 10]', () => {
                    try {
                        plateau.setRoverAt(10, 10);
                    } catch (e) {
                        expect(e).toBeInstanceOf(OutOfPlateauError);
                    }
                });
            });

            it('Has another rover at the position', () => {
                plateau.setRoverAt(1, 1);

                const errorFunction = () => plateau.setRoverAt(1, 1);

                expect(errorFunction).toThrow(AnotherRoverAtPositionError);
            });
        });

        describe('GetElement - Out of bound', () => {
            it('[-1, -1]', () => {
                try {
                    plateau.getElement(-1, -1);
                } catch (e) {
                    expect(e).toBeInstanceOf(OutOfPlateauError);
                }
            });

            it('[6, 6]', () => {
                try {
                    plateau.getElement(6, 6);
                } catch (e) {
                    expect(e).toBeInstanceOf(OutOfPlateauError);
                }
            });

            it('[10, 10]', () => {
                try {
                    plateau.getElement(10, 10);
                } catch (e) {
                    expect(e).toBeInstanceOf(OutOfPlateauError);
                }
            });
        });
    });

    it('should remove rover at', () => {
        const plateau = new Plateau(5, 5).setRoverAt(1, 1);
        plateau.removeRoverAt(1, 1);
        const element = plateau.getElement(1, 1);

        expect(element).toBe(0);
    });

    it('should set at [0, 0] and NOT get at [0,1]', () => {
        const plateau = new Plateau(5, 5);

        plateau.setRoverAt(0, 0);
        const element = plateau.getElement(0, 1);

        expect(element).not.toBe(1);
    });
});
