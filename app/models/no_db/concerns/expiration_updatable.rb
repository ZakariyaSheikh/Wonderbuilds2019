module NoDb
  module Concerns
    module ExpirationUpdatable
      def update_expiration
        RedisStore::Session.update_expire(self.value)
      end
    end
  end
end