class ContactUsMailer < ApplicationMailer
  def perform(message, admin)
    @message = message
    mail(to: admin.email, subject: 'Contact us message')
  end
end
