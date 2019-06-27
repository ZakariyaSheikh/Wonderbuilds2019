module RedisStore
  module Concerns
    module ByUser
      module Creatable
        include RedisStore::Concerns::Expirable

        def create(user)
          model_object = "NoDb::#{self.klass}".constantize.new(user.id)
          redis.hset(model_object.value, :user_id, user.id)
          redis.expire(model_object, expire_time)
          model_object
        end
      end
    end
  end
end