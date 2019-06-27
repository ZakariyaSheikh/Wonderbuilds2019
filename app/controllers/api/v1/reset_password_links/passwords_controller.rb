module Api
  module V1
    module ResetPasswordLinks
      class PasswordsController < Api::V1::BaseController
        skip_before_action :authorize

        def update
          reset_link = RedisStore::ResetLink.find(params[:reset_password_link_token])
          if reset_link
            reset_link.user.update(password: change_password_params[:password])
            render_ok
          else
            render_not_found(I18n.t('reset_link.error'))
          end
        end

        private

        def change_password_params
          params.permit(:password)
        end
      end
    end
  end
end
