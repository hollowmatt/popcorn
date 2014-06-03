Popcorn::Application.routes.draw do
  devise_for :users, 
    :controllers => {
      registrations: "users/registrations",
      sessions: "users/sessions"
    }
  resources :movies
  resources :favorites

  get "users", :to => 'users#index'
  get "users/:id/movies", :to => 'users#movies'
  get "popcorn/index"
  root 'popcorn#index'

  match "*path" => "popcorn#index", :via => [:get, :post]
end
