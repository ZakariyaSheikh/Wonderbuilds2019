module Results
  class Error < Base
    attr_reader :message

    def initialize(message = nil)
      @message = message
    end

    def success?
      false
    end
  end
end