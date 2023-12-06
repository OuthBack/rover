require_relative './errors/rover.error'

class Rover
    # @return [Plateau]
    attr_reader :plateau
    # @return [Integer, nil]
    attr_reader :position
    # @return [String]
    attr_reader :direction

    # @param plateau [Plateau]
    def initialize(plateau)
        @plateau = plateau
        @position = nil
        @direction = 'N'
    end

    def getPosition
        if @position.nil?
            raise NullPositionError
        end

        @position
    end

    def getDirection
        @direction
    end

    # param direction [String]
    def setDirection(direction)
        @direction = direction
        self
    end

    # param width [Integer]
    # param height [Integer]
    def setPosition(width, height)
        @plateau.setRoverAt(width, height)
        @position = [width, height]
        self
    end

    def moveForward
        if @position.nil?
            raise NullPositionError
        end

        @plateau.removeRoverAt(@position[0], @position[1])

        # Mover o rover para o lado que ele está virado
        width, height = getPosition

        case @direction
        when 'N'
            setPosition(width, height + 1)
        when 'E'
            setPosition(width + 1, height)
        when 'W'
            setPosition(width - 1, height)
        when 'S'
            setPosition(width, height - 1)
        end

        self
    end

    # @param rotation String
    def rotate(rotation)
        if @position.nil?
            raise NullPositionError
        end

        # Estou fazendo dessa forma percorrendo um array ao invés de pegar em
        # um HashMap porque é mais fácil de acrescentar itens no Array
        # assim ficando mais fácil a manutenção
        directions = %w[N E S W]

        # param directionsArray [Array<String>]
        # param directions [Array<String>]
        def setNextDirection(directionsArray)
            unless directionsArray
                raise DirectionArrayEmptyError
            end

            # Estou apontando para direction porque ele é atualizado em seguida e
            # dentro do for e preciso da primeiro valor dele
            thisDirection = @direction

            # Estou setando o primeiro valor, pois dentro do for se o proximo
            # valor for undefined não irá fazer nada e o primeiro valor irá
            # continuar
            setDirection(directionsArray[0])
            for i in 0..directionsArray.size - 1
                direction = directionsArray[i]
                nextDirection = directionsArray[i + 1]

                if direction == thisDirection && nextDirection
                    setDirection(nextDirection)
                end
          end
        end

        case rotation
        when 'R'
            setNextDirection(directions)
        when 'L'
            setNextDirection(directions.reverse)
        end
        self
    end

    # @param command [String]
    def command(command)
        if position.nil?
            raise NullPositionError
        end

        case command
        when 'M'
            moveForward
        else
            rotate(command)
        end
        self
    end
end
