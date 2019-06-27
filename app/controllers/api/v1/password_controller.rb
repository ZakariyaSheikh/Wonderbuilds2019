module Api
  module V1
    class PasswordController < Api::V1::BaseController
      # change password
      def update
        if @current_user.authenticate(change_password_params[:old_password])
          @current_user.update(password: change_password_params[:password])
          render_ok
        else
          render_unauthorized(I18n.t('user.error.password'))
        end
      end

      private

      def change_password_params
        params.permit(:old_password, :password)
      end
    end
  end
end