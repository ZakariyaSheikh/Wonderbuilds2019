json.array! characteristics do |characteristic|
  json.partial! 'api/v1/characteristics/characteristic', characteristic: characteristic
end