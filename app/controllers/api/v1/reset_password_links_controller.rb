module Api
  module V1
    class ResetPasswordLinksController < Api::V1::BaseController
      skip_before_action :authorize, only: [:create]

      def create
        user = User.find_by(email: email_params[:email])
        if user
          RedisStore::ResetLink.create(user)
        else
          render_not_found(I18n.t('user.error.email'))
        end
      end

      private

      def email_params
        params.require(:user).permit(:email)
      end
    end
  end
end
