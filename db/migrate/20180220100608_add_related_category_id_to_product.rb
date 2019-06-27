class AddRelatedCategoryIdToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :related_category_id, :integer
    add_foreign_key :products, :categories, column: :related_category_id
  end
end
