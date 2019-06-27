class AddTotalToOrder < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :total, :decimal, precision: 9, scale: 2
  end
end
