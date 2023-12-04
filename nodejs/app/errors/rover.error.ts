export class NullPositionError extends Error {
    constructor() {
        super('Rover position is null');
    }
}

export class DirectionArrayEmptyError extends Error {
    constructor() {
        super('The direction array is empty');
    }
}
