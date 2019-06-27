class AddQuantityToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :quantity, :integer, default: 10
  end
end
