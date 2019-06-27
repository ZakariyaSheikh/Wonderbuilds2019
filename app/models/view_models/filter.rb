module ViewModels
  class Filter
    attr_reader :name, :values

    def initialize(name, values)
      @name = name
      @values = values
    end

    def self.convert_from_characteristics(characteristics)
      self.as_array_of_filters(characteristics)
    end

    def is_price?
      false
    end

    private

    def self.as_hash(characteristics)
      filters = {}
      characteristics.each do |filter|
        filters[filter.name].present? ? filters[filter.name].push(filter.value) : filters[filter.name] = [filter.value]
      end
      filters
    end

    def self.as_array_of_filters(characteristics)
      filters = as_hash(characteristics)
      filters.map {|obj| Filter.new(obj.first.camelcase,obj.second) }
    end
  end
end