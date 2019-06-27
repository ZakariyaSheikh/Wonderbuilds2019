class CreateShippingInfo < ActiveRecord::Migration[5.1]
  def change
    create_table :shipping_infos do |t|
      t.string :name
      t.string :surname
      t.string :country
      t.string :city
      t.string :province
      t.string :address
      t.string :zip
      t.string :telephone

      t.belongs_to :user
      t.belongs_to :order
    end
  end
end
