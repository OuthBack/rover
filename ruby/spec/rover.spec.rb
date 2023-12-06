require_relative '../app/rover'

describe 'Rover' do
    before(:example) do
        @rover = Rover.new(Plateau.new(5, 5))
    end
    describe 'set position' do
        it 'should set at [0, 0]' do
            pos = [0, 0]
            position = @rover.setPosition(pos[0], pos[1]).getPosition
            expect(position).to eq(pos)
        end
        it 'should set at [2, 3]' do
            pos = [2, 3]
            position = @rover.setPosition(pos[0], pos[1]).getPosition
            expect(position).to eq(pos)
        end
        it 'should set at [5, 5]' do
            pos = [5, 5]
            position = @rover.setPosition(pos[0], pos[1]).getPosition
            expect(position).to eq(pos)
        end
    end

    describe 'out of plateau' do
        it 'should raise OutOfPlateauError at [-1, -1]' do
            pos = [-1, -1]
            expect { @rover.setPosition(pos[0], pos[1]) }.to raise_error(OutOfPlateauError)
        end
        it 'should raise OutOfPlateauError at [6, 6]' do
            pos = [-1, -1]
            expect { @rover.setPosition(pos[0], pos[1]) }.to raise_error(OutOfPlateauError)
        end
    end

    describe 'move forward' do
        before(:example) do
            @plateau = Plateau.new(5, 5)
            @rover = Rover.new(@plateau).setPosition(3, 3)
        end

        it 'should move to N' do
            @rover.setDirection('N').moveForward
            pos = @rover.getPosition
            expect(pos).to eq([3, 4])
        end
        it 'should move to E' do
            @rover.setDirection('E').moveForward
            pos = @rover.getPosition
            expect(pos).to eq([4, 3])
        end
        it 'should move to W' do
            @rover.setDirection('W').moveForward
            pos = @rover.getPosition
            expect(pos).to eq([2, 3])
        end
        it 'should move to S' do
            @rover.setDirection('S').moveForward
            pos = @rover.getPosition
            expect(pos).to eq([3, 2])
        end
        it 'should reset previous position' do
            pos = [1, 1]
            @rover.setPosition(pos[0], pos[1]).moveForward
            element = @plateau.getElement(pos[0], pos[1])

            expect(element).to eq(0)
        end
        it 'should has another rover in the position' do
            @rover.setPosition(1, 1)
            newRover = Rover.new(@plateau).setPosition(1, 0)
            expect { newRover.moveForward }.to raise_error(AnotherRoverAtPositionError)
        end
    end
end
