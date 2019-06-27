module NoDb
  class ResetLink < NoDb::Base
    define_model_callbacks :create, only: [:after]

    after_create :send_email_to_user

    private

    def send_email_to_user
      self.user.send_reset_password_email(value)
    end
  end
end