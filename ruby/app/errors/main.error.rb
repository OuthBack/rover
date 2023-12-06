class PositionCoordinatesNotEqualThreeError < StandardError
    def initialize
        super('Position coordinates not equal three')
    end
end
