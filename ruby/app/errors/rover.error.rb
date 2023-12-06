class NullPositionError < StandardError
    def initialize
        super('Rover position is null')
    end
end

class DirectionArrayEmptyError < StandardError
    def initialize
        super('The direction array is empty')
    end
end
