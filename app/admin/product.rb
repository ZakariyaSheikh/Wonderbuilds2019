# frozen_string_literal: true

ActiveAdmin.register Product do
  permit_params do
    [
        :name, :description, :image, :price, :quantity, :category_id, :size, :minimal_order, :delivery_time,
        :is_related, :is_popular, :is_featured, :made_in, :related_category_id,
        attachments: [],
        characteristics_attributes: %i[name value _destroy id],
        dimensions_attributes: %i[name value _destroy id]
    ]
  end
  action_item :view, only: :index do
    link_to 'Import from CSV', action: 'upload_csv'
  end

  collection_action :upload_csv do
  end

  collection_action :import_csv, method: :post do
    imported = Product.import(params[:dump][:file].path)
    if imported > 0
      flash[:notice] = I18n.t(
          'active_admin_import.imported',
          count: imported,
          model: Product,
          plural_model: Products,
          message: 'Success!')
    else
      flash[:error] = I18n.t(
          'active_admin_import.failed',
          count: "",
          model: Product,
          plural_model: Products,
          message: 'ERROR!')
    end
    redirect_to action: :index
  end

  index do
    selectable_column
    id_column
    column 'Image' do |image|
      image_tag image.image_url, height: '50px' if image.image_url.present?
    end
    column :name
    column :description
    column :category
    column :created_at
    actions
  end

  scope('All') {|scope| scope}
  scope('Popular', &:popular)
  scope('Related', &:related)

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :image
      f.input :price
      f.input :quantity
      f.input :category
      f.input :minimal_order
      f.input :delivery_time
      f.input :is_popular, label: 'is featured'
      f.input :is_related
      # f.input :is_featured
      f.input :related_category
      f.has_many :characteristics,
                 new_record: true,
                 allow_destroy: true do |b|
        b.input :name
        b.input :value
      end
      input :attachments, as: :file,
            label: "Attachments (hold SHIFT to select more than one)",
            input_html: { multiple: true }
    end
    f.actions
  end

  show do |product|
    @characteristics = Characteristic.where(product_id: params[:id])
    attributes_table do
      row :name
      row :description
      row :image
      row :price
      row :quantity
      row :minimal_order
      row :delivery_time
      row :is_popular
      row :category
    end

    panel 'Characteristics' do
      table_for @characteristics do
        column :name
        column :value
      end
    end
  end
end
