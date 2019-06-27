class MakeOrder < BaseService
  def initialize(user, order_params, shipping_params, cart)
    @user = user
    @order_params = order_params
    @shipping_params = shipping_params
    @cart = cart
  end

  def perform
    set_order
    create_shipping
    create_cart_products
    perform_transaction
    save
    Results::Ok.new
  rescue ArgumentError => e
    error = 'Error while making order:' + e.message
    Rails.logger.info(error)
    Results::Error.new(error)
  end

  private

  def set_order
    @order = @user.orders.build(total: @cart[:total])
    @order.map_params_to_attr(@order_params)
    raise_error(@order)
  end

  def create_shipping
    @shipping_info = @user.shipping_infos.build(@shipping_params)
    raise_error(@shipping_info)
  end

  def create_cart_products
    @cart_products = @cart[:products].map do |obj|
      product = CartProduct.new(product_id: obj[:product][:id], quantity: obj[:quantity])
      raise_error(product) || product
    end
  end

  def perform_transaction
    result = Barclaycard::NewTransaction.new(@order, @shipping_info).perform
    raise ArgumentError.new(result.message) unless result.success?
  end

  def save
    @order.save
    @shipping_info.order_id = @order.id
    @shipping_info.save
    @order.cart_products << @cart_products
  end
end