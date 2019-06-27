$sessions_redis = Redis::Namespace.new(:wander_builds_sessions, redis_store: Redis.new)
$reset_links_redis = Redis::Namespace.new(:wander_builds_reset_links, redis_store: Redis.new)