json.filters do
  json.array! @filters do |filter|
    json.partial! 'api/v1/filters/filter', filter: filter
  end
end