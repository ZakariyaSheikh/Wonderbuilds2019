module Api
  module V1
    class SessionsController < Api::V1::BaseController
      skip_before_action :authorize, only: [:create]

      def create
        service_result = Auth::Login.new(login_params).perform
        if service_result.success?
          headers['Authorization'] = service_result.data.value
          @current_user = service_result.data.user
        else
          render_unauthorized(service_result.message)
        end
      end

      def destroy
        RedisStore::Session.destroy(@current_token.value)
        render_ok
      end

      private

      def login_params
        params.require(:user).permit(:email, :password)
      end
    end
  end
end

