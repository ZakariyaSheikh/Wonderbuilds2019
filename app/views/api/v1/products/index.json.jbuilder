json.products do
  json.array! @products do |product|
    json.partial! 'api/v1/products/product', product: product
    json.warning_amount product.category.warning_amount
  end
end
json.max_pages @max_pages
