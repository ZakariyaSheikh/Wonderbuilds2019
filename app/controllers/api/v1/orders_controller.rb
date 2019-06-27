module Api
  module V1
    class OrdersController < Api::V1::BaseController
      def index
        @orders = @current_user.orders.includes(:cart_products, :shipping_info)
      end

      def create
        result = MakeOrder.new(@current_user, order_params, shipping_params, cart_params).perform
        if result.success?
          render_ok
        else
          render_unprocessable_entity(result.message)
        end
      end

      private

      def cart_params
        params.permit(:total, products: [:quantity, product: [:id]])
      end

      def order_params
        params.permit(:card_number, :exp_date, :cvc_code)
      end

      def shipping_params
        params.permit(:name, :surname, :city, :province, :country, :address, :zip, :telephone)
      end
    end
  end
end