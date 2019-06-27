module Results
  class Ok < Base
    attr_reader :data

    def initialize(data = nil)
      @data = data
    end

    def success?
      true
    end
  end
end