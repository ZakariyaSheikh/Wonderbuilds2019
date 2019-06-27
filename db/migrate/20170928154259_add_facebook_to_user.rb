class AddFacebookToUser < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :oauth_token
    end
  end
end

