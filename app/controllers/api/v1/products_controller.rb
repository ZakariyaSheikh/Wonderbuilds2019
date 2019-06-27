module Api
  module V1
    class ProductsController < Api::V1::BaseController
      include Concerns::Api::Products::Filterable

      skip_before_action :authorize
      before_action :set_product, only: [:show]

      def index; end

      def show; end

      private

      def set_product
        @product = Product.find(params[:id])
        @category = [Category.find(@product[:category_id])]

        unless @category[0][:parent_category_id].nil?
          @category << ParentCategory.find(@category[0][:parent_category_id])
        end
      end
    end
  end
end

