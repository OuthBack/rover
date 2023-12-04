import {
    DirectionArrayEmptyError,
    NullPositionError,
} from './errors/rover.error';
import { Plateau } from './plateau';

export type Direction = 'N' | 'E' | 'W' | 'S';
export type Rotation = 'L' | 'R';
export type Command = Rotation | 'M';

export class Rover {
    private plateou: Plateau;
    private position: [number, number] | null;
    private direction: Direction = 'N';

    constructor(plateou: Plateau) {
        // Estou injetando o plateau para todos os rovers tiverem o mesmo plateou
        this.plateou = plateou;
        this.position = null;
    }

    getPosition(): [number, number] {
        if (this.position === null) {
            throw new NullPositionError();
        }

        return this.position;
    }

    getDirection(): Direction {
        return this.direction;
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
        if (this.position === null) {
            throw new NullPositionError();
        }

        this.plateou.removeRoverAt(this.position[0], this.position[1]);

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

    rotate(rotation: Rotation): Rover {
        if (this.position === null) {
            throw new NullPositionError();
        }

        // Estou fazendo dessa forma percorrendo um array ao invés de pegar em
        // um HashMap porque é mais fácil de acrescentar itens no Array
        // assim ficando mais fácil a manutenção
        const directions: Direction[] = ['N', 'E', 'S', 'W'];

        const setNextDirection = (directionsArray: Direction[]): void => {
            if (!directionsArray.length) {
                throw new DirectionArrayEmptyError();
            }

            // Estou apontando para direction porque ele é atualizado em seguida e
            // dentro do for e preciso da primeiro valor dele
            const thisDirection = this.direction;

            // Estou setando o primeiro valor, pois dentro do for se o proximo
            // valor for undefined não irá fazer nada e o primeiro valor irá
            // continuar
            this.setDirection(directionsArray[0]);
            for (const i in directionsArray) {
                const direction = directions[i];
                const next = directionsArray[parseInt(i) + 1];

                if (direction === thisDirection && next) {
                    this.direction = next;
                }
            }
        };

        switch (rotation) {
            case 'R':
                setNextDirection(directions);
                break;
            case 'L':
                setNextDirection(directions.reverse());
                break;
        }

        return this;
    }

    command(command: Command): Rover {
        if (this.position === null) {
            throw new NullPositionError();
        }

        switch (command) {
            case 'M':
                this.moveForward();
                break;
            default:
                this.rotate(command);
                break;
        }

        return this;
    }
}
