module Api
  module V1
    class FacebookController < Api::V1::BaseController
      skip_before_action :authorize, only: [:create]

      def create
        service_result = Auth::Facebook.new(facebook_params[:token]).perform
        if service_result.success?
          user = service_result.data
          token = RedisStore::Session.create(user)
          headers['Authorization'] = token.value
          @current_user = user
        else
          render_unauthorized(service_result.message)
        end
      end

      private

      def facebook_params
        params.require(:facebook).permit(:token)
      end
    end
  end
end

