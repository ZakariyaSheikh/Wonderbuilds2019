class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string      :name
      t.text        :description
      t.string      :measurement
      t.decimal     :price, precision: 9, scale: 2
      t.decimal     :quantity, precision: 9, scale: 2
      t.json        :image
      t.belongs_to  :categories

      t.timestamps
    end
  end
end
