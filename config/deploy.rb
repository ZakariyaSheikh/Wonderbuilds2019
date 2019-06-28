set :application, 'wonderbuilds-2019'
set :repo_url, 'https://wonderbuilds@bitbucket.org/wonderbuilds/wonderbuilds-2019.git' # Edit this to match your repository
set :branch, :master
set :deploy_to, '/home/deploy/wonderbuilds-2019'
set :pty, true
set :linked_files, %w{config/database.yml config/application.yml}
append :linked_files, ".env"
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
set :keep_releases, 5
set :rvm_type, :user
set :rvm_custom_path, '/usr/share/rvm/'
set :rvm_ruby_version, '2.4.4' # Edit this if you are using MRI Ruby
set :rvm_map_bins, %w{gem rake ruby rails bundle puma pumactl}

before "deploy:assets:precompile", "deploy:yarn_install"

namespace :deploy do
  desc 'Run rake yarn:install'
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && yarn install")
      end
    end
  end

  desc "reload the database with seed data"
  task :seed do
    run "cd #{current_path}; bundle exec rake db:seed RAILS_ENV=#{rails_env}"
  end
end

set :puma_rackup, -> { File.join(current_path, 'config.ru') }
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"    #accept array for multi-bind
set :puma_conf, "#{shared_path}/puma.rb"
set :puma_access_log, "#{shared_path}/log/puma_error.log"
set :puma_error_log, "#{shared_path}/log/puma_access.log"
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))
set :puma_threads, [0, 8]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false

# namespace :deploy do
#   task :restart do
#     invoke 'puma:restart'
#     invoke 'nginx:restart'
#   end
#
#   desc 'updated and restart nginx'
#   task :setup_config do
#     on roles(:app) do
#       execute :cp, "#{release_path}/config/nginx/#{fetch(:stage)}.conf", "#{shared_path}/config/#{fetch(:stage)}_nginx.conf"
#       execute :sudo, :ln, "#{shared_path}/config/#{fetch(:stage)}_nginx.conf", "/etc/nginx/sites-enabled/#{fetch(:stage)}_nginx.conf"
#     end
#   end
# end