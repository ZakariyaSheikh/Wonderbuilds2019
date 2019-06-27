class AddIsRelatedToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :is_related, :boolean, default: false
  end
end
