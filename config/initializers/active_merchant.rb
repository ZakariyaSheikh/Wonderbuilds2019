$gateway = ActiveMerchant::Billing::BarclaysEpdqExtraPlusGateway.new(
    login: ENV['barclays_login'],
    user: ENV['barclays_user'],
    password: ENV['barclays_password'],
    signature_encryptor: ENV['barclays_signature_encryptor'],
    signature: ENV['barclays_signature']
)