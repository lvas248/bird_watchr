Rails.application.routes.draw do

  resources :comments, only: [:index, :create, :destroy]
  resources :birds, only: [:index, :create]
  resources :likes, only: [:index, :destroy, :create]
  resources :posts

  delete '/users/:id', to: 'users#destroy'
  
  patch '/users/:id', to: 'users#update'

  get '/me', to: 'users#show'

  post '/signup', to: 'users#create'


  post '/login', to: 'sessions#create'

  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
