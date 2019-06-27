module Api
  module V1
    class CategoriesController < Api::V1::BaseController
      skip_before_action :authorize
      before_action :set_categories, only: [:index]

      def index; end

      private

      def set_categories
        # TODO: rewrite

        @categories = Category
                          .select("categories.name as name, categories.id as id, categories.description as description, categories.image as image, parent_categories.id as parent_id, parent_categories.name as parent_name")
                          .joins("LEFT JOIN parent_categories ON categories.parent_category_id = parent_categories.id")
        @result = []
        @categories.each do |category|
          if category[:parent_name]
            par = @result.find {|a| a[:parent_name] == category[:parent_name]}
            if par.nil?
              @result.push({:parent_name => category[:parent_name], :parent_id => category[:parent_id],  :arr => [{:id => category[:id], :name => category[:name], :description => category[:description], :image => category[:image]}]})
            else
              par[:arr] << {:id => category[:id], :name => category[:name], :description => category[:description], :image => category[:image]}
            end
          else
            @result << {:id => category[:id], :name => category[:name], :description => category[:description], :image => category[:image]}
          end
        end
        @result.sort! { |a, b| (a[:id] || -1) <=> (b[:id] || -1) }
      end
    end
  end
end
