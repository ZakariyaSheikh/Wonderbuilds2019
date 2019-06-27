class AddStatusesUpdateTimeToOrder < ActiveRecord::Migration[5.1]
  def change
    change_table :orders do |t|
      t.timestamp :sent_at
      t.timestamp :shipped_at
      t.timestamp :cancelled_at
    end
  end
end
