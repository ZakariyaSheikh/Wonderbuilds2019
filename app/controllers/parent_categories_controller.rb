class ParentCategoriesController < InheritedResources::Base

  private

    def parent_category_params
      params.require(:parent_category).permit(:name)
    end
end

