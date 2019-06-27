# == Schema Information
#
# Table name: characteristics
#
#  id                   :bigint(8)        not null, primary key
#  name                 :string
#  value                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  product_dimension_id :integer
#  product_id           :bigint(8)
#

class Characteristic < ApplicationRecord
  belongs_to :product, class_name: Product, inverse_of: :characteristics, optional: true
  belongs_to :product_dimension, class_name: Product, inverse_of: :dimensions, optional: true

  with_options presence: true do
    validates :name
    validates :value
  end

  before_save :convert_name_to_downcase

  scope :for_products, ->(products) { where(product_id: products.ids) }

  def self.params_for_filter
    select('DISTINCT on (characteristics.name, characteristics.value)  value, name')
  end

  private

  def convert_name_to_downcase
    self.name.downcase!
  end
end
