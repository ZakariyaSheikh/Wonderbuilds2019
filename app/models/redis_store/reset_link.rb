module RedisStore
  module ResetLink
    extend RedisStore::Concerns::Destroyable
    extend RedisStore::Concerns::ByUser::Findable
    extend RedisStore::Concerns::ByUser::Creatable

    DEFAULT_EXPIRE_TIME = 24.hours

    private

    def self.klass
      :ResetLink
    end

    def self.redis
      $reset_links_redis
    end
  end
end