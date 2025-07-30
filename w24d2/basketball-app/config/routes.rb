Rails.application.routes.draw do
  resources :teams, only: %i[index show]
end
