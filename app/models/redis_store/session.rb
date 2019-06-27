module RedisStore
  module Session
    extend RedisStore::Concerns::Destroyable
    extend RedisStore::Concerns::ByUser::Findable
    extend RedisStore::Concerns::ByUser::Creatable

    DEFAULT_EXPIRE_TIME = 30.days.to_i

    def self.update_expire(token)
      redis.expire(token, DEFAULT_EXPIRE_TIME)
    end

    def self.klass
      :Token
    end

    def self.redis
      $sessions_redis
    end
  end
end