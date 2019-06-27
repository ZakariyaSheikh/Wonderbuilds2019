class AddParamsToUser < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.string :company
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :address
    end
  end
end
