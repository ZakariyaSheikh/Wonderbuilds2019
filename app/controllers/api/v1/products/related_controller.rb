module Api
  module V1
    module Products
      class RelatedController < Api::V1::BaseController
        skip_before_action :authorize
        before_action :get_product

        def index
          @products = @product.category.related_products
        end

        private

        def get_product
          @product = Product.find(params[:product_id])
        end
      end
    end
  end
end

