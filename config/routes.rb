Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :games, only: [:create, :destroy, :update]

    resources :players, only: [:create, :destroy, :show]

    resources :boards, only: [:create, :destroy, :show, :update]
  end
end
ls
