module Barclaycard
  class NewTransaction < BaseService
    def initialize(order, shipping_info)
      @order = order
      @shipping_info = shipping_info
    end

    def perform
      set_credit_card
      purchase
    end

    private

    def set_credit_card
      @credit_card = ActiveMerchant::Billing::CreditCard.new(
          first_name: @shipping_info.name,
          last_name: @shipping_info.surname,
          number: @order.number,
          month: @order.exp_date_month,
          year: '20' + @order.exp_date_year,
          verification_value: @order.cvv
      )
    end

    def purchase
      if @credit_card.validate.empty?
        response = $gateway.purchase(@order.total_in_pence, @credit_card)

        if response.success?
          Rails.logger.info("Successfully charged $#{sprintf("%.2f", @order.total / 100)} "+
                                " to the credit card #{@credit_card.number}")
          Results::Ok.new("Successfully charged $#{sprintf("%.2f", @order.total / 100)} "+
                              " to the credit card #{@credit_card.number}")
        else
          Rails.logger.info("Error while charging: #{response.message}, credit card #{@credit_card.number}")
          Results::Error.new("Error while charging: #{response.message}, credit card #{@credit_card.number}")

        end
      else
        Rails.logger.info("Error in card validation: #{@credit_card.validate}, credit card #{@credit_card.number}")
        Results::Error.new("Error in card validation: #{@credit_card.validate}, credit card #{@credit_card.number}")
      end
    end
  end
end