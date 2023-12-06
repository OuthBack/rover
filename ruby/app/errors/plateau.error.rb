class OutOfPlateauError < StandardError
    def initialize
        super('Out of Plateau')
    end
end

class AnotherRoverAtPositionError < StandardError
    def initialize(width, height)
        super("There is already another rover at position: #{width}, #{height}")
    end
end
