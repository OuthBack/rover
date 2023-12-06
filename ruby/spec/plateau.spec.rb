require_relative '../app/errors/plateau.error'
require_relative '../app/plateau'

RSpec.describe Plateau do
    describe 'create a matrix 6x6' do
        it 'should create' do
            matrix = Plateau.new(5, 5).getMatrix

            expect(matrix).to eq(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            )
        end
    end

    describe 'set and get rover at' do
        before(:example) do
            @plateau = Plateau.new(5, 5)
        end
        it 'should be [0, 0]' do
            @plateau.setRoverAt(0, 0)
            element = @plateau.getElement(0, 0)

            expect(element).to be(1)
        end
        it 'should be [0, 1]' do
            @plateau.setRoverAt(0, 1)
            element = @plateau.getElement(0, 1)

            expect(element).to be(1)
        end
        it 'should be [1, 0]' do
            @plateau.setRoverAt(1, 0)
            element = @plateau.getElement(1, 0)

            expect(element).to be(1)
        end
        it 'should be [5, 4]' do
            @plateau.setRoverAt(5, 4)
            element = @plateau.getElement(5, 4)

            expect(element).to be(1)
        end
        it 'should be [4, 5]' do
            @plateau.setRoverAt(4, 5)
            element = @plateau.getElement(4, 5)

            expect(element).to be(1)
        end
        it 'should be [5, 5]' do
            @plateau.setRoverAt(5, 5)
            element = @plateau.getElement(5, 5)

            expect(element).to be(1)
        end
    end

    describe 'setRoverAt' do
        before(:example) do
            @plateau = Plateau.new(5, 5)
        end

        describe 'Out of plateau error' do
            it 'should be raised when [-1, -1]' do
                expect { @plateau.setRoverAt(-1, -1) }.to raise_error(OutOfPlateauError)
            end
        end
        describe 'Out of plateau error' do
            it 'should be raised when [6, 6]' do
                expect { @plateau.setRoverAt(6, 6) }.to raise_error(OutOfPlateauError)
            end
        end
        describe 'Out of plateau error' do
            it 'should be raised when [10, 10]' do
                expect { @plateau.setRoverAt(10, 10) }.to raise_error(OutOfPlateauError)
            end
        end

        it 'Has another rover at the position' do
            @plateau.setRoverAt(1, 1)
            expect { @plateau.setRoverAt(1, 1) }.to raise_error(AnotherRoverAtPositionError)
        end
    end

    describe 'GetElement - Out of bound' do
        before(:example) do
            @plateau = Plateau.new(5, 5)
        end

        it 'should be [-1, -1]' do
            expect { @plateau.getElement(-1, -1) }.to raise_error(OutOfPlateauError)
        end
        it 'should be [6, 6]' do
            expect { @plateau.getElement(6, 6) }.to raise_error(OutOfPlateauError)
        end
        it 'should be [10, 10]' do
            expect { @plateau.getElement(10, 10) }.to raise_error(OutOfPlateauError)
        end
    end

    it 'should remove rover at' do
        plateau = Plateau.new(5, 5).setRoverAt(1, 1)
        plateau.removeRoverAt(1, 1)
        element = plateau.getElement(1, 1)

        expect(element).to be(0)
    end

    it 'should set at [0, 0] and NOT get at [0,1]' do
        plateau = Plateau.new(5, 5).setRoverAt(0, 0)
        element = plateau.getElement(0, 1)
        expect(element).not_to be(1)
    end
end
