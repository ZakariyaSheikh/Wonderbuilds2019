module Concerns
  module Api
    module Filters
      extend ActiveSupport::Concern

      included do
        before_action :get_filters, only: [:index]
      end

      protected

      def get_filters
        characteristics = Characteristic.for_products(@products).params_for_filter
        @filters = ViewModels::Filter.convert_from_characteristics(characteristics)
        add_price
      end

      def add_price
        price = ViewModels::Price.new(@products)
        @filters.push(price)
      end
    end
  end
end
