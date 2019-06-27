# == Schema Information
#
# Table name: shipping_infos
#
#  id        :bigint(8)        not null, primary key
#  name      :string
#  surname   :string
#  country   :string
#  city      :string
#  province  :string
#  address   :string
#  zip       :string
#  telephone :string
#  user_id   :bigint(8)
#  order_id  :bigint(8)
#

class ShippingInfo < ApplicationRecord
  belongs_to :user
  belongs_to :order, optional: true

  validates :name, presence: true
  validates :surname, presence: true
  validates :city, presence: true
  validates :country, presence: true
  validates :province, presence: true
  validates :address, presence: true
  validates :zip, presence: true
  validates :telephone, presence: true
end
