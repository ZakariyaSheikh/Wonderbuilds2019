ActiveAdmin.register Order do
  actions :index, :edit, :update, :show

  permit_params do
    [:status]
  end

  index do
    selectable_column
    id_column
    column :status
    column :total
    actions
  end

  show do |order|
    attributes_table do
      row :id
      row :status
      row :total
      row :user
      row :received_at
      row :sent_at
      row :cancelled_at
      row :shipped_at
    end

    panel "Shipping info" do
      attributes_table_for order.shipping_info do
        row :name
        row :surname
        row :country
        row :city
        row :province
        row :address
        row :zip
        row :telephone
      end
    end

    div :class => "panel" do
      h3 "Products"
      if order.cart_products and order.cart_products.size > 0
        div :class => "panel_contents" do
          div :class => "attributes_table" do
            table do
              tr do
                th do
                  "id"
                end
                th do
                  "Name"
                end
                th do
                  "Quantity"
                end
              end
              tbody do
                order.cart_products.each do |cart_product|
                  tr do
                    td do
                      cart_product.product_id
                    end
                    td do
                      cart_product.name
                    end
                    td do
                      cart_product.quantity
                    end
                  end
                end
              end
            end
          end
        end
      else
        h3 "No products"
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :status
    end
    f.actions
  end
end
