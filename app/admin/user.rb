ActiveAdmin.register User do
  permit_params do
    [:email, :first_name, :last_name, :company, :phone, :email_verified, :password, :password_confirmation]
  end

  index do
    selectable_column
    id_column
    column :email
    column :first_name
    column :last_name
    column :email_verified
    column :created_at
    actions
  end

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :first_name
      f.input :last_name
      f.input :email_verified
      f.input :phone
      f.input :company
    end
    f.actions
  end

  member_action :unblock, method: :put do
    resource.unblock
    redirect_to resource_path, notice: "Unblocked"
  end

  member_action :block, method: :put do
    resource.block
    redirect_to resource_path, notice: "Blocked"
  end

  action_item :block, only: :show do
    link_to 'Block', block_admin_user_path(resource), method: :put unless resource.blocked
  end

  action_item :block, only: :show do
    link_to 'Unblock', unblock_admin_user_path(resource), method: :put if resource.blocked
  end

  filter :email
  filter :created_at
end
