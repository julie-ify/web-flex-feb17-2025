Rails.application.routes.draw do
  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'

  resources :books, only: %i[index]
  resources :reviews, only: %i[index create]
end
