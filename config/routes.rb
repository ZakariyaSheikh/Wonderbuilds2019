Rails.application.routes.draw do
  resources :parent_categories
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      namespace :products do
        resources :popular,             only: [:index]
      end

      resource :contact_us,             only: [:create]
      resource :facebook,               only: [:create]
      resource :password,               only: [:update]
      resource :search,                 only: [:index]
      resource :sessions,               only: [:destroy]
      resource :users,                  only: [:show, :update]
      resources :categories,            only: [:index]
      resources :confirmations,         only: [:update]
      resources :filters,               only: [:index]
      resources :orders,                only: [:index, :create]
      resources :search,                only: [:index]
      resources :sessions,              only: [:create]
      resources :users,                 only: [:create]

      resources :products,              only: [:index, :show] do
        resources :related,             only: [:index], module: :products
      end
      resources :reset_password_links,  only: [:create], param: :token do
        resource :password,             only: [:update], module: :reset_password_links
      end
    end
  end

  get '*path', to: 'pages#index', as: 'react'
  get '/', to: 'pages#index', as: 'react_absolute'
end
