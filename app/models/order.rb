# == Schema Information
#
# Table name: orders
#
#  id           :bigint(8)        not null, primary key
#  user_id      :bigint(8)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  status       :integer          default("received")
#  total        :decimal(9, 2)
#  sent_at      :datetime
#  shipped_at   :datetime
#  cancelled_at :datetime
#

class Order < ApplicationRecord
  attr_accessor :number, :exp_date_month, :exp_date_year, :cvv
  alias_attribute :received_at, :created_at

  enum status: %i(received sent shipped cancelled)

  has_many :cart_products
  has_one :shipping_info
  belongs_to :user

  validates :total, presence: true

  after_create :send_notification_to_admin
  after_create :send_notification_to_user
  before_update :set_time

  def map_params_to_attr(params)
    self.number = params[:card_number]
    self.exp_date_month = params[:exp_date].slice(0..1)
    self.exp_date_year = params[:exp_date].slice(3..4)
    self.cvv = params[:cvc_code]
    self
  end

  def total_in_pence
    (total.to_f * 100).to_i
  end

  private

  def send_notification_to_admin
    AdminUser.all.each do |admin|
      OrderMailer.perform(self, admin).deliver
    end
  end

  def send_notification_to_user
    user = User.find(self.user_id)
    OrderMailer.user_perform(self, user).deliver
  end

  def set_time
    self.send(self.status + '_at=', DateTime.now) if self.status_changed?
  end
end
