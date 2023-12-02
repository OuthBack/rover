import { NullPositionError } from './errors/rover.error';
import { Plateau } from './plateau';

type Direction = 'N' | 'E' | 'W' | 'S';

export class Rover {
    private plateou: Plateau;
    private position: [number, number] | null;
    private direction: Direction;

    constructor(plateou: Plateau) {
        // Estou injetando o plateau porque é mais fácil de testar assim
        // e no meu entendimento do exercicio o plateau seria um componente
        // do rover para navegação
        this.plateou = plateou;
        this.position = null;
    }

    getPosition(): [number, number] {
        if (this.position === null) {
            throw new NullPositionError();
        }

        return this.position;
    }

    setDirection(direction: Direction): Rover {
        this.direction = direction;
        return this;
    }

    setPosition(width: number, height: number): Rover {
        this.plateou.setRoverAt(width, height);
        this.position = [width, height];

        return this;
    }

    moveForward(): Rover {
        // Mover o rover para o lado que ele está virado
        const [width, height] = this.getPosition();

        switch (this.direction) {
            case 'N':
                this.setPosition(width, height + 1);
                break;
            case 'E':
                this.setPosition(width + 1, height);
                break;
            case 'W':
                this.setPosition(width - 1, height);
                break;
            case 'S':
                this.setPosition(width, height - 1);
                break;
        }

        return this;
    }
}
