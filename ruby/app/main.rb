require_relative '../app/plateau'
require_relative '../app/rover'
require_relative '../app/errors/main.error'
require_relative '../app/errors/plateau.error'
require_relative '../app/errors/rover.error'

def ignoreOutOfPlateauAndNullPositionError
    yield
rescue OutOfPlateauError, NullPositionError => e
    warn "Warning: #{e.message}"
rescue => e
    raise e
end

def ignoreNullPositionError
    yield
rescue NullPositionError => e
    warn "Warning: #{e.message}"
rescue => e
    raise e
end

def ignoreOutOfPlateauError
    yield
rescue OutOfPlateauError => e
    warn "Warning: #{e.message}"
rescue => e
    raise e
end

class Main
    def initialize
        @lineCount = 0
    end

    def readStdin
        # @param line [String]
        $stdin.readlines.each do |line|
            if @lineCount.zero?
                width, height = line.split(' ')

                @plateau = Plateau.new(width.to_i, height.to_i)
                @lineCount += 1
                next
            end

            if @lineCount.odd?
                positionCoordinates = line.split(' ')

                if positionCoordinates.length != 3
                    raise PositionCoordinatesNotEqualThreeError
                end

                widthPosition, heightPosition, direction = positionCoordinates

                @rover = Rover.new(@plateau)

                # Coloquei o try e catch para ignorar alguns erros que o rover tem
                # Optei por ele ignorar o comando do Rover e passar para frente
                # Se der algum erro o rover para no lugar, já que é um obstáculo
                ignoreOutOfPlateauError do
                    @rover
                        .setPosition(widthPosition.to_i, heightPosition.to_i)
                        .setDirection(direction)
                end
            else
                # Aqui é para ignorar se o comando for sair do plateau
                ignoreOutOfPlateauAndNullPositionError do
                    line.each_char do |command|
                        @rover.command(command)
                    end
                end

                # A posição pode não existir, por isso não irá ser printada e precisa
                # ignorar o erro
                ignoreNullPositionError do
                    newWidth, newHeight = @rover.getPosition
                    direction = @rover.getDirection
                    print "#{newWidth} #{newHeight} #{direction}\n"
                end
            end

            @lineCount += 1
        end
    end
end

Main.new.readStdin
