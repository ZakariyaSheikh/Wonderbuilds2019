module Api
  module V1
    class UsersController < Api::V1::BaseController
      skip_before_action :authorize, only: [:create]

      def create
        user = User.new(registration_params)
        if user.save
          # NEED TO CONFIRM EMAIL FIRST
          # token = RedisStore::Session.create(user)
          # headers['Authorization'] = token.value
          # @current_user = user
          render_ok
        else
          #render_unauthorized(I18n.t('error.unauthorized'))
          render_ok
        end
      end

      def show; end

      def update
        unless @current_user.update(user_params)
          render_unprocessable_entity(I18n.t('error.unprocessable_entity'))
        end
      end

      private

      def registration_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end

      def user_params
        params.require(:user).permit(:company, :first_name, :last_name, :phone, :address)
      end
    end
  end
end