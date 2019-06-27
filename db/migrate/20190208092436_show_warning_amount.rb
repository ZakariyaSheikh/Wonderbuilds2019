class ShowWarningAmount < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :warning_amount, :integer
  end
end
