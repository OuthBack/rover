import {
    AnotherRoverAtPositionError,
    OutOfPlateauError,
} from './errors/plateau.error';

export class Plateau {
    private matrix: number[][];

    constructor(width: number, height: number) {
        // Construindo o plateau em uma matrix

        // Primeiro setar um array vazio
        this.matrix = [];

        // Iterar sobre os valores para construir o plateau
        // Por que?
        // Para já limitar o tamanho do plateau
        for (let i = 0; i <= height; i++) {
            this.matrix[i] = new Array(width + 1).fill(0);
        }
    }

    private convertHeight(height: number): number {
        // Estou convertendo o formato de fora da classe para dentro
        // Por que?
        // No teste está dizendo que lower-left é [0,0] e em um array lower-left
        // é [0,5].
        return this.matrix.length - 1 - height;
    }

    isOutOfPlateau(width: number, height: number): boolean {
        if (
            // Checar se a posicao do elemento não está fora do plateau
            width >= this.matrix.length ||
            width < 0 ||
            height >= this.matrix.length ||
            height < 0
        ) {
            return true;
        }

        return false;
    }

    getMatrix(): number[][] {
        return this.matrix;
    }

    getElement(width: number, height: number): number {
        if (this.isOutOfPlateau(width, height)) {
            throw new OutOfPlateauError();
        }

        return this.matrix[this.convertHeight(height)][width];
    }

    setRoverAt(width: number, height: number): Plateau {
        if (this.isOutOfPlateau(width, height)) {
            throw new OutOfPlateauError();
        }

        if (this.getElement(width, height) === 1) {
            throw new AnotherRoverAtPositionError(width, height);
        }

        this.matrix[this.convertHeight(height)][width] = 1;
        return this;
    }

    removeRoverAt(width: number, height: number): Plateau {
        if (this.isOutOfPlateau(width, height)) {
            throw new OutOfPlateauError();
        }

        this.matrix[this.convertHeight(height)][width] = 0;
        return this;
    }
}
