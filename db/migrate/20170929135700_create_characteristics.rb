class CreateCharacteristics < ActiveRecord::Migration[5.1]
  def change
    create_table :characteristics do |t|
      t.string :name
      t.string :value
      t.belongs_to :products

      t.timestamps
    end
  end
end
