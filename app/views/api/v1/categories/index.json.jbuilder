json.categories do
  json.array! @result do |category|
    json.id category[:id] if category[:id]
    json.name category[:name] if category[:name]
    json.description category[:description] if category[:description]
    json.arr category[:arr]  if category[:arr]
    json.image category[:image] if category[:image]
    json.parent_id category[:parent_id] if category[:parent_id]
    json.parent_name category[:parent_name] if category[:parent_name]
  end
end