class FixBelongsTo < ActiveRecord::Migration[5.1]
  def change
    remove_belongs_to :products, :categories
    remove_belongs_to :characteristics, :products
    add_belongs_to :products, :category
    add_belongs_to :characteristics, :product
  end
end
