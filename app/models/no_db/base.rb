module NoDb
  class Base
    extend ActiveModel::Callbacks

    define_model_callbacks :create

    attr_reader :value, :user_id

    def initialize(user_id, value = nil)
      @user_id = user_id

      if value
        @value = value
      else
        run_callbacks :create do
          @value = generate_token
        end
      end
    end

    def user
      User.find(user_id)
    end

    protected

    def generate_token
      SecureRandom::hex
    end
  end
end