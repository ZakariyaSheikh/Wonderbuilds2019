class UpdateProductTable < ActiveRecord::Migration[5.1]
  def change
    remove_column :products, :measurement
    remove_column :products, :quantity
    remove_column :products, :unit_type
    remove_column :products, :made_in

    change_column :products, :minimal_order, :string
    change_column :products, :package_form, :string
  end
end
