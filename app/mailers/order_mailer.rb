class OrderMailer < ApplicationMailer
  def perform(order, admin)
    @order = order
    mail(to: "dev.wonder.builds@gmail.com", subject: 'New order')
  end

  def user_perform(order, user)
    @order = order
    mail(to: user.email, subject: 'New order')
  end
end
