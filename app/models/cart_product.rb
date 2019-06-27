# == Schema Information
#
# Table name: cart_products
#
#  id         :bigint(8)        not null, primary key
#  order_id   :bigint(8)
#  product_id :bigint(8)
#  quantity   :decimal(9, 2)    default(1.0)
#

class CartProduct < ApplicationRecord
  belongs_to :product
  belongs_to :order, optional: true

  delegate :name, to: :product

  validate :can_remove_product

  after_create :remove_product

  private

  def can_remove_product
    errors.add(:quantity, 'is more than available') if product.quantity < quantity
  end

  def remove_product
    product.update(quantity: product.quantity - quantity)
  end
end
