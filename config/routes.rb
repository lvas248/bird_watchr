Rails.application.routes.draw do

  resources :posts
  resources :birds
  resources :likes, only: [:index, :destroy, :create]

  patch '/posts', to: 'posts#update'
  post '/posts', to: 'posts#create'

  post '/signup', to: 'users#create'

  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'

  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
