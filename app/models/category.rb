# == Schema Information
#
# Table name: categories
#
#  id                 :bigint(8)        not null, primary key
#  name               :string
#  description        :text
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image              :json
#  parent_category_id :integer
#

class Category < ApplicationRecord
  mount_uploader :image, ImageUploader

  has_many :products, dependent: :destroy, inverse_of: :category
  has_many :related_products, dependent: :destroy, class_name: Product, inverse_of: :related_category, foreign_key: :related_category_id
  belongs_to :parent_category, optional: true

  validates :name, presence: true

  scope :by_names, ->(names) { where(name: names) }
end
