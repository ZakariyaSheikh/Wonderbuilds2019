json.product do
  json.partial! 'api/v1/products/product', product: @product
  json.warning_amount @product.category.warning_amount
  json.characteristics do
    json.partial! 'api/v1/characteristics/characteristics', characteristics: @product.characteristics
  end
end