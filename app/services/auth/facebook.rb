module Auth
  class Facebook < BaseService
    GRAPH_URL = URI.parse('https://graph.facebook.com/me').freeze
    FIELDS = %w(email).freeze

    def initialize(facebook_token)
      @token = facebook_token
    end

    def perform
      fb_user = get_from_facebook
      user = User.find_by_uid(fb_user[:id]) || create(fb_user)
      if user
        Results::Ok.new(user)
      else
        Results::Error.new(I18n.t('error.unprocessable_entity'))
      end
    end

    private

    def create(user)
      password = SecureRandom.gen_random(8)
      user = User.new(provider: :facebook,
                      uid: user[:id],
                      oauth_token: @token,
                      email: user[:email],
                      password: password,
                      password_confirmation: password)
      user.save ? user : nil
    end

    def get_from_facebook
      JSON.parse(graph_request).with_indifferent_access
    end

    def graph_request
      Net::Http.get(uri_with_params)
    end

    def uri_with_params
      uri = GRAPH_URL.dup
      params = {
          fields: FIELDS.join(','),
          access_token: @token
      }
      uri.query = URI.encode_www_form(params)
    end
  end
end