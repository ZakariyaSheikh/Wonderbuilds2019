module Api
  module V1
    class ContactUsController < Api::V1::BaseController
      skip_before_action :authorize

      def create
        AdminUser.all.each do |admin|
          ContactUsMailer.perform(params[:message], admin).deliver_now
        end
      end
    end
  end
end

