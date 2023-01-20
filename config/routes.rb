Rails.application.routes.draw do

  resources :birds, only: [:index, :create]
  resources :posts

  delete '/users/:id', to: 'users#destroy'
  
  patch '/users/:id', to: 'users#update'

  get '/me', to: 'users#show'

  post '/signup', to: 'users#create'

  post '/post+bird', to: 'posts#create_post_and_bird'

  delete '/bird-posts/:id', to: 'posts#destroy_bird_posts'

  post '/login', to: 'sessions#create'

  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
