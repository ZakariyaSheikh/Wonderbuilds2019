module RedisStore
  module Concerns
    module Destroyable
      def destroy(key)
        redis.del(key)
      end
    end
  end
end