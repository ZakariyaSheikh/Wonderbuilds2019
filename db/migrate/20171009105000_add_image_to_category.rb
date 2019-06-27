class AddImageToCategory < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :image, :json
  end
end
