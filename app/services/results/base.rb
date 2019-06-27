module Results
  class Base
    def success?
      raise NotImplementedError
    end
  end
end