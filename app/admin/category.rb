# frozen_string_literal: true

ActiveAdmin.register Category do
  permit_params do
    %i[name description image parent_category_id warning_amount]
  end

  index do
    selectable_column
    id_column
    column 'Image' do |image|
      image_tag(image.image_url, height: '50px') if image.image_url
    end
    column :name
    column :description
    column :created_at
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :image
      f.input :warning_amount,
              label: 'Quantity of items, after which
                      a warning will be displayed(No display if empty)'
      f.input :parent_category_id, as: :select, collection: ParentCategory.all, required: false
    end
    f.actions
  end
end
