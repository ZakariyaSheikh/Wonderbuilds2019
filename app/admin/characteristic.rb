ActiveAdmin.register Characteristic do
  permit_params do
    [:name, :value, :product_id, :product_dimension_id]
  end

  index do
    selectable_column
    id_column
    column :name
    column :value
    column :created_at
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :value
      f.input :product
      f.input :product_dimension
    end
    f.actions
  end
end
