AlwaysNote::Application.routes.draw do
  get 'users/authenticate', to: 'users#authenticate'
  resources :users, :only => [:create, :new, :show, :update, :edit]
  resource :session, :only => [:create, :new, :destroy]
  root to: 'root#root'
end
