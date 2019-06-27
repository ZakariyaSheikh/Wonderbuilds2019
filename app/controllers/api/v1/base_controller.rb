module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery prepend: true

      EXCEPTION_BLOCK = Proc.new { |exception| render_unprocessable_entity(exception.message) }.freeze

      rescue_from ActionController::ParameterMissing, with: EXCEPTION_BLOCK
      rescue_from ActiveRecord::ActiveRecordError, with: EXCEPTION_BLOCK

      before_action :authorize

      def render_error(status, type, message)
        json_error = { type: type, message: message }
        render json: json_error, status: status
      end

      def render_not_found(message)
        render_error(404, I18n.t('error.not_found'), message)
      end

      def render_unauthorized(message)
        render_error(401, I18n.t('error.unauthorized'), message)
      end

      def render_unprocessable_entity(message)
        render_error(422, I18n.t('error.unprocessable_entity'), message)
      end

      def render_ok
        render json: { result: I18n.t('ok') }, status: 200
      end

      protected

      def authorize
        token_value = request.headers['Authorization']
        @current_token = RedisStore::Session.find(token_value)
        if @current_token
          @current_token.update_expiration
          @current_user ||= @current_token.user
        else
          render_unauthorized(I18n.t('error.unauthorized'))
        end
      end
    end
  end
end