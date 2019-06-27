module Api
  module V1
    class ConfirmationsController < Api::V1::BaseController
      skip_before_action :authorize

      def update
        user = User.verify_email(params[:id])
        if user
          token = RedisStore::Session.create(user)
          headers['Authorization'] = token.value
          @current_user = user
        else
          render_not_found('Invalid code')
        end
      end
    end
  end
end