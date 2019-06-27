class AddEmailConfirmationToUser < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.boolean :email_verified, default: false
      t.string :verification_code
    end
  end
end
