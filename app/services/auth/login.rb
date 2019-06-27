module Auth
  class Login < BaseService
    def initialize(user_params)
      @email = user_params[:email]
      @password = user_params[:password]
    end

    def perform
      user = User.find_by(email: @email)
      if user
        check_password(user)
      else
        Results::Error.new(I18n.t('user.error.email'))
      end
    end

    private

    def check_password(user)
      if user.authenticate(@password)
        token = RedisStore::Session.create(user)
        Results::Ok.new(token)
      else
        Results::Error.new(I18n.t('user.error.password'))
      end
    end
  end
end