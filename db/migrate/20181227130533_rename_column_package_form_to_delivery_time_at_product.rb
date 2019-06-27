class RenameColumnPackageFormToDeliveryTimeAtProduct < ActiveRecord::Migration[5.1]
  def change
    rename_column :products, :package_form, :delivery_time
  end
end
