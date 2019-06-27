# frozen_string_literal: true
# == Schema Information
#
# Table name: products
#
#  id                  :bigint(8)        not null, primary key
#  name                :string
#  description         :text
#  price               :decimal(9, 2)
#  image               :json
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  minimal_order       :string           default("1")
#  delivery_time       :string
#  category_id         :bigint(8)
#  is_popular          :boolean          default(FALSE)
#  is_related          :boolean          default(FALSE)
#  related_category_id :integer
#  quantity            :integer          default(10)
#  attachments         :json
#

class Product < ApplicationRecord
  require 'csv'

  POPULAR_PRODUCTS_SIZE = 3
  RELATED_PRODUCTS_SIZE = 3
  FEATURED_PRODUCTS_SIZE = 9
  ARTICLES_PER_PAGE = 100

  mount_uploader :image, ImageUploader
  mount_uploaders :attachments, DocumentUploader

  has_many :characteristics, dependent: :destroy, inverse_of: :product
  has_many :dimensions, dependent: :destroy, class_name: Characteristic, inverse_of: :product_dimension,
           foreign_key: :product_dimension_id
  has_many :cart_products
  belongs_to :category
  belongs_to :related_category, class_name: Category, optional: true

  accepts_nested_attributes_for :characteristics, :dimensions, allow_destroy: true

  validates :name, presence: true

  after_save :popular_update, if: :is_popular?
  # after_save :featured_update, if: :is_featured?
  after_save :related_update, if: -> {self.is_related? && self.related_category_id}

  scope :by_category_names, ->(category_names) {where(category_id: Category.by_names(category_names).ids)}
  scope :popular, ->() {where(is_popular: true)}
  scope :featured, ->() {where(is_featured: true)}
  scope :related, ->() {where(is_related: true)}
  scope :with_pagination, ->(num) {page(num).per(ARTICLES_PER_PAGE)}

  def self.do_search(value)
    where('name ILIKE :value OR description ILIKE :value', value: "%#{value}%")
  end

  def self.import(value)
    imported = 0
    csv = File.read(value)
    CSV.parse(csv, headers: true).take_while {|row| row['Name']}.each do |row|
      category = Category.by_names((row['Category']).to_s)
      related_category_id = Category.by_names((row['Related Category']).to_s)
      next unless category.present?

      row = row.to_h
      prod = Product.new
      prod.name = row['Name']
      prod.description = row['Description']
      prod.price = row['Price']
      prod.minimal_order = row['Minimal order']
      prod.delivery_time = row['Delivery time']
      prod.is_popular = row['Is popular'].match?(/yes/i)
      prod.is_related = row['Is related'].match?(/yes/i)
      prod.quantity = row['Quantity']
      prod.category_id = category.pluck(:id)[0]
      prod.related_category_id = related_category_id.pluck(:id)[0]
      prod.save!
      imported += 1
      next unless row.length > row.keys.find_index('Category')

      row.keys.slice(row.keys.find_index('Category') + 1..-1).each do |key|
        char = Characteristic.new
        char.name = key
        char.value = row[key]
        char.product_id = prod.id
        char.save!
      end
    end
    imported
  rescue StandardError => e
    imported
  end

  private

  def popular_update
    popular_products = Product.popular.order(:updated_at)
    popular_products.first.update(is_popular: false) if popular_products.size > POPULAR_PRODUCTS_SIZE
  end

  def featured_update
    featured_products = Product.featured.order(:updated_at)
    featured_products.first.update(is_featured: false) if featured_products.size > FEATURED_PRODUCTS_SIZE
  end

  def related_update
    related_products = related_category.related_products.order(:updated_at)
    related_products.first.update(is_related: false) if related_products.size > RELATED_PRODUCTS_SIZE
  end
end
