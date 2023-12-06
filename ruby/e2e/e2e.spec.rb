describe 'End to End' do
    before(:example) do
    end

    it "should return the expected result for 'input.txt'" do
        fileDir = ->(dir) { "e2e/#{dir}/input.txt" }
        output = `ruby app/main.rb < #{fileDir.call('inputs')}`
        expect(output).to eq(File.read(fileDir.call('outputs')))
    end
    it "should return the expected result for 'input0x0.txt'" do
        fileDir = ->(dir) { "e2e/#{dir}/input0x0.txt" }
        output = `ruby app/main.rb < #{fileDir.call('inputs')}`
        expect(output).to eq(File.read(fileDir.call('outputs')))
    end
    it "should return the expected result for 'input-out-of-plateau.txt'" do
        fileDir = ->(dir) { "e2e/#{dir}/input-out-of-plateau.txt" }
        output = `ruby app/main.rb < #{fileDir.call('inputs')}`
        expect(output).to eq(File.read(fileDir.call('outputs')))
    end
    it "should return the expected result for 'input-out-of-plateau2.txt'" do
        fileDir = ->(dir) { "e2e/#{dir}/input-out-of-plateau2.txt" }
        output = `ruby app/main.rb < #{fileDir.call('inputs')}`
        expect(output).to eq(File.read(fileDir.call('outputs')))
    end
end
