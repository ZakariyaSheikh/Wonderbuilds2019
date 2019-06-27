class AddParentCategoryIdToCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :parent_category_id, :integer
    add_foreign_key :categories, :parent_categories, column: :parent_category_id
  end
end
