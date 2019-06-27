module Api
  module V1
    class FiltersController < Api::V1::BaseController
      before_action :get_products, only: [:index]
      skip_before_action :authorize

      include Concerns::Api::Filters

      def index; end

      private

      def get_products
        @products = params[:categories] ? Product.by_category_names(params[:categories]) : Product.all
      end
    end
  end
end