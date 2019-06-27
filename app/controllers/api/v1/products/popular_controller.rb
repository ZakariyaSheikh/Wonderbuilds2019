module Api
  module V1
    module Products
      class PopularController < Api::V1::BaseController
        skip_before_action :authorize

        def index
          @products = Product.popular

        end
      end
    end
  end
end

