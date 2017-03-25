Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :restaurants do
    resources :comments do
      put 'upvote', on: :member
    end
  end

  root 'restaurants#index'
end
