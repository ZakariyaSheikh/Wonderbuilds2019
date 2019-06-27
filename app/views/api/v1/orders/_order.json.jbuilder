json.(order, :total, :status, :created_at)
json.cart_products do
  json.array! order.cart_products do |cart_product|
    json.partial! 'api/v1/cart_products/cart_product', cart_product: cart_product
  end
end
json.shipping_info do
  json.partial! 'api/v1/shipping_infos/shipping_info', shipping_info: order.shipping_info
end

