class AddIsPopularToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :is_popular, :boolean, default: false
  end
end
