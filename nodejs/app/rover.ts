import { NullPositionError } from './errors/rover.error';
import { Plateau } from './plateau';

type Direction = 'N' | 'E' | 'W' | 'S';
type Rotation = 'L' | 'R';

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
        // Estou fazendo dessa forma percorrendo um array ao invés de pegar em
        // um HashMap porque é mais fácil de acrescentar itens no Array
        // assim ficando mais fácil a manutenção
        const directions: Direction[] = ['N', 'E', 'S', 'W'];

        function getNextDirection(directionsArray: Direction[]) {
            for (const i in directionsArray) {
                const direction = directions[i];
                if (direction === this.direction) {
                    if (parseInt(i) + 1 >= directionsArray.length) {
                        this.setDirection(directionsArray[0]);
                    }
                }
            }
        }

        switch (rotation) {
            case 'R':
                getNextDirection(directions);
                break;
            case 'L':
                const directionsLeft = directions.reverse();
                getNextDirection(directionsLeft);
                break;
        }

        return this;
    }
}
