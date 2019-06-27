module ViewModels
  class Price < ViewModels::Filter
    def initialize(products)
      min = 0
      max = products.maximum(:price).to_i
      super('Price', [min, max])
    end

    def is_price?
      true
    end
  end
end