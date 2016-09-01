Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :games, only: [:create, :show, :destroy]

    resources :boards, only: [:create, :show, :destroy, :update] do
      resources :cells, only: [:create, :show, :update, :index]
    end

    resources :players, only: [:create, :show, :destroy]
  end
end
