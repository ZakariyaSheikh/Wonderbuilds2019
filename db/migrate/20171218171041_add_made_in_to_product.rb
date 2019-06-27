class AddMadeInToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :made_in, :string
  end
end
