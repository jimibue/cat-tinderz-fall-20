Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :things
    resources :cats, only: [:index, :update]
    # get '/cats', to 'cats#index'
    # put '/cats/:id', to:'cats#update'

    get "/my_cats", to: "cats#my_cats_x"
  end
end
