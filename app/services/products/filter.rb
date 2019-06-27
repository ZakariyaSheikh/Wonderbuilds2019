module Products
  class Filter
    def initialize(filter_params)
      @characteristics_params = filter_params[:filters] || []
      @prices_params = filter_params[:prices]
      @categories = filter_params[:categories]
      @sort = [filter_params[:sort], sort_type: filter_params[:sort_type]].compact
      @page = filter_params[:page]

    end

    def perform
      set_products
      #do_sort if @sort.present?
      filter_characteristics
    end

    private

    def set_products
      @products = @categories ? Product.by_category_names(@categories) : Product.all
    end

    def do_sort

      #@products.order(@sort.first)
      puts "hello"
      puts @sort.first
      puts "yo"
      puts @sort.second
      @products.order(0 + @sort.second)
    end

    def filter_characteristics
      search_string = get_search_string
      @products.where('price >= :min ::numeric  and price <= :max ::numeric', { min: @prices_params.first, max: @prices_params.second })  # price filter
          .left_outer_joins(:characteristics, :category) # used for search string
          .where(search_string) # convert filters from [{key: value}, {key: value1}] format to search string
          .select('DISTINCT ON (products.id) *, products.id, products.name, products.image') # remove duplicates
    end

    def get_search_string
      search_string = ''
      @characteristics_params.each do |param|
        parsed = JSON.parse(param)
        if parsed.keys.first.downcase == 'category'
          search_string <<
              '(categories.name ' <<
              "= '#{parsed.values.first}') OR "
        else
          search_string <<
              '(characteristics.name ' <<
              "= '#{parsed.keys.first.downcase}' AND " <<
              'characteristics.value ' <<
              "= '#{parsed.values.first}') OR "
        end
      end

      if search_string.size > 3
        search_string.chop!.chop!.chop!  # remove last 3 characters
      else
        search_string
      end
    end
  end
end