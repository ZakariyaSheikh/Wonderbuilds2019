class AddFieldsToProduct < ActiveRecord::Migration[5.1]
  def change
    change_table :products do |t|
      t.integer :unit_type
      t.decimal :minimal_order, default: 1, precision: 9, scale: 2
      t.integer :package_form
    end
  end

  def up
    remove_column :products, :measurement
  end

  def down
    add_column :products, :measurement
  end
end
