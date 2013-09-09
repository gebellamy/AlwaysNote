AlwaysNote::Application.routes.draw do
  get 'users/authenticate', to: 'users#authenticate'
  get 'users/forgot_password', to: 'users#forgot_password'
  get 'users/send_password', to: 'users#send_password'
  resources :users, :only => [:create, :new, :show, :update, :edit]
  resource :session, :only => [:create, :new]
  get 'session/logout', to: 'sessions#destroy'
  root to: 'root#root'
  resources :notebooks, :only => [:create, :destroy, :show, :index, :update]
  resources :notes, :only => [:create, :destroy, :show, :index, :update]
  resources :tags, :only => [:create, :destroy]
end
