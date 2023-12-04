import { Plateau } from './plateau';
import { Command, Direction, Rover } from './rover';
import { PositionCoordinatesNotEqualThreeError } from './errors/main.error';
import { createInterface } from 'readline';
import { OutOfPlateauError } from './errors/plateau.error';
import { NullPositionError } from './errors/rover.error';

function ignoreOutOfPlateauAndNullPositionError(func: () => void) {
    try {
        func();
    } catch (e) {
        if (
            !(e instanceof OutOfPlateauError) &&
            !(e instanceof NullPositionError)
        ) {
            throw e;
        }

        console.error(e);
    }
}

function ignoreNullPositionError(func: () => void) {
    try {
        func();
    } catch (e) {
        if (!(e instanceof NullPositionError)) {
            throw e;
        }

        console.error(e);
    }
}

function ignoreOutOfPlateauError(func: () => void) {
    try {
        func();
    } catch (e) {
        if (!(e instanceof OutOfPlateauError)) {
            throw e;
        }

        console.error(e);
    }
}

const readInteface = createInterface({
    input: process.stdin,
});

let rover: Rover;
let plateau: Plateau;
let lineCount = 0;

readInteface.on('line', (line) => {
    if (lineCount === 0) {
        const [width, height] = line.split(' ');

        plateau = new Plateau(parseInt(width), parseInt(height));
        lineCount++;
        return;
    }

    if (lineCount % 2 !== 0) {
        const positionCoordinates = line.split(' ');

        if (positionCoordinates.length !== 3) {
            throw new PositionCoordinatesNotEqualThreeError();
        }

        const [widthPosition, heightPosition, direction] =
            positionCoordinates as [string, string, Direction];

        rover = new Rover(plateau);

        // Coloquei o try e catch para ignorar alguns erros que o rover tem
        // Optei por ele ignorar o comando do Rover e passar para frente
        // Se der algum erro o rover para no lugar, já que é um obstáculo
        ignoreOutOfPlateauError(() =>
            rover
                .setPosition(parseInt(widthPosition), parseInt(heightPosition))
                .setDirection(direction)
        );
    } else {
        // Aqui é para ignorar se o comando for sair do plateau
        ignoreOutOfPlateauAndNullPositionError(() => {
            for (const command of line) {
                rover.command(command as Command);
            }
        });

        // A posição pode não existir, por isso não irá ser printada e precisa
        // ignorar o erro
        ignoreNullPositionError(() => {
            const [newWidth, newHeight] = rover.getPosition();
            console.log(newWidth, newHeight, rover.getDirection());
        });
    }

    lineCount++;
});
