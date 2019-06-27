module Concerns
  module Api
    module Products
      module Filterable
        extend ActiveSupport::Concern

        included do
          before_action :apply_filters, only: [:index], if: -> {filter_params.present?}
          before_action :get_products_by_category, only: [:index], if: -> {is_by_category.present?}
        end

        protected

        def apply_filters
          @products = ::Products::Filter.new(filter_params).perform
          @max_pages = (@products.to_a.size / 9.to_f).ceil
          @products = @products.with_pagination(filter_params[:page])
        end

        def get_products_by_category
          @products = Product.by_category_names(is_by_category[:category])
        end


        def filter_params
          params.permit(:page, :sort, :sort_type, filters: [], prices: [], categories: [])
        end

        def is_by_category
          params.permit(:category)
        end

      end
    end
  end
end