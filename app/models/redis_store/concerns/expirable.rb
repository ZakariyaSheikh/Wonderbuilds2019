module RedisStore
  module Concerns
    module Expirable
      protected

      def expire_time
        self::DEFAULT_EXPIRE_TIME
      end
    end
  end
end