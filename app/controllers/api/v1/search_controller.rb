module Api
  module V1
    class SearchController < Api::V1::BaseController
      skip_before_action :authorize

      def index
        @products = Product.do_search(search_params[:value]).limit(search_params[:limit])
      end

      private

      def search_params
        params.permit(:value, :limit)
      end
    end
  end
end

