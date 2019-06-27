module RedisStore
  module Concerns
    module ByUser
      module Findable
        def find(instance)
          data = redis.hgetall(instance).with_indifferent_access
          if data.present?
            "NoDb::#{klass}".constantize.new(data[:user_id], instance)
          else
            false
          end
        end
      end
    end
  end
end