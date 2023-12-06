require_relative '../app/errors/plateau.error'

class Plateau
    # @return [Array<Array<Integer>>]
    attr_reader :matrix

    # @param width [Integer]
    # @param height [Integer]
    def initialize(width, height)
        # Construindo o plateau em uma matrix

        # Primeiro setar um array vazio
        @matrix = []

        # Iterar sobre os valores para construir o plateau
        # Por que?
        # Para já limitar o tamanho do plateau
        for i in 0..height do
            @matrix[i] = Array.new(width + 1, 0)
        end
    end

    # @param height [Integer]
    def convertHeight(height)
        #  Estou convertendo o formato de fora da classe para dentro
        #  Por que?
        #  No teste está dizendo que lower-left é [0,0] e em um array lower-left
        #  é [0,5].
        @matrix.length - 1 - height
    end

    # @param width [Integer]
    # @param height [Integer]
    def isOutOfPlateau(width, height)
        # Checar se a posicao do elemento não está fora do plateau

        if  width >= @matrix.length ||
            width.negative? ||
            height >= @matrix.length ||
            height.negative?

            return true
        end

        false
    end

    def getMatrix
        @matrix
    end

    # @param width [Integer]
    # @param height [Integer]
    def getElement(width, height)
        if isOutOfPlateau(width, height)
            raise OutOfPlateauError
        end

        @matrix[convertHeight(height)][width]
    end

    # @param width [Integer]
    # @param height [Integer]
    # @return Plateau
    def setRoverAt(width, height)
        if isOutOfPlateau(width, height)
            raise OutOfPlateauError
        end

        if getElement(width, height) == 1
            raise AnotherRoverAtPositionError.new(width, height)
        end

        @matrix[convertHeight(height)][width] = 1;
        self
    end

    # @param width [Integer]
    # @param height [Integer]
    # @return Plateau
    def removeRoverAt(width, height)
        if isOutOfPlateau(width, height)
            raise OutOfPlateauError.new();
        end

        @matrix[convertHeight(height)][width] = 0;
        self
    end
end
