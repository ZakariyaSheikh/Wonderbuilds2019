# == Schema Information
#
# Table name: users
#
#  id                :bigint(8)        not null, primary key
#  email             :string
#  password_digest   :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  email_verified    :boolean          default(FALSE)
#  verification_code :string
#  provider          :string
#  uid               :string
#  oauth_token       :string
#  company           :string
#  first_name        :string
#  last_name         :string
#  phone             :string
#  address           :string
#  blocked           :boolean          default(FALSE)
#

class User < ApplicationRecord
  has_secure_password
  has_secure_token :verification_code

  has_many :orders
  has_many :shipping_infos

  validates :password_confirmation, presence: true, on: :create
  validates :email, uniqueness: true

  after_create :send_confirmation_email, email_verified:true

  def block
    self.blocked = true
    self.save
  end

  def unblock
    self.blocked = false
    self.save
  end

  def self.verify_email(code)
    user = User.find_by_verification_code(code)
    user.regenerate_verification_code and user if user&.update(email_verified: true)
  end

  def send_reset_password_email(reset_link)
    UserMailer.reset_password(self, reset_link).deliver
  end

  private

  def send_confirmation_email
    UserMailer.confirmation(self).deliver
  end
end
