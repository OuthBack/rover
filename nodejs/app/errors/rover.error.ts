export class NullPositionError extends Error {
    constructor() {
        super('Rover position is null');
    }
}
