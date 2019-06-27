json.(product, :id, :name, :description, :price, :minimal_order, :quantity, :delivery_time, :attachments)
json.url product.image.url
json.category @category