class AddDimensionToCharacteristics < ActiveRecord::Migration[5.1]
  def change
    add_column :characteristics, :product_dimension_id, :integer
    add_foreign_key :characteristics, :products, column: :product_dimension_id
  end
end
