class CreateUser < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password

      t.timestamps
      t.index :email
    end
  end
end
