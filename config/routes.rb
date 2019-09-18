Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'welcome#index'
  post '/photos', to: 'photos#create'
  get '/photos', to: 'photos#index'
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  get '/users/:id/photos', to: 'users#show_photos'

end