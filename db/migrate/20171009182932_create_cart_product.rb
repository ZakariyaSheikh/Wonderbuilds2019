class CreateCartProduct < ActiveRecord::Migration[5.1]
  def change
    create_table :cart_products do |t|
      t.belongs_to :order, index: true
      t.belongs_to :product, index: true
      t.decimal :quantity, default: 1, precision: 9, scale: 2
    end
  end
end
