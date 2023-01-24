Rails.application.routes.draw do

  resources :birds, only: [:index, :create]
  resources :posts

  
  delete '/users/:id', to: 'users#destroy'
  
  patch '/users/:id', to: 'users#update'

  get '/me', to: 'users#show'

  post '/signup', to: 'users#create'


  delete '/bird-posts/:id', to: 'posts#destroy_bird_posts'


  post '/login', to: 'sessions#create'

  delete '/logout', to: 'sessions#destroy'

  get '/location/:place', to: 'posts#location'

  # example  /location/tarrytown,_ny
  # render all current users posts that have that location

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


end
