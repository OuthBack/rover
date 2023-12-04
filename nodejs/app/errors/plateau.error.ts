export class OutOfPlateauError extends Error {
    constructor() {
        super('Out of Plateau');
    }
}

export class AnotherRoverAtPositionError extends Error {
    constructor(width: number, height: number) {
        super(
            `There is already another rover at position: ${width}, ${height}`
        );
    }
}
