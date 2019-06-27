class UserMailer < ApplicationMailer

  def confirmation(user)
    @user = user
    mail(to: user.email, subject: 'SuppliersHub account confirmation')
  end

  def reset_password(user, reset_link)
    @user = user
    @reset_link = reset_link
    mail(to: user.email, subject: 'SuppliersHub account reset password')
  end
end
