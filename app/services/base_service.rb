class BaseService
  def perform
    raise NotImplementedError
  end

  protected

  def raise_error(instance)
    raise ArgumentError.new(instance.errors.messages) unless instance.validate
  end
end