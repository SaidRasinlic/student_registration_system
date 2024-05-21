Rails.application.routes.draw do
  # Defines the root path route ("/")
  devise_scope :user do
    authenticated { root to: redirect('/admin/dashboard'), as: :authenticated_root }
    unauthenticated { root to: redirect('/users/sign_in'), as: :unauthenticated_root }
  end

  devise_for :users, controllers: {
    sessions: 'custom_devise/sessions',
    registrations: 'custom_devise/registrations',
    passwords: 'custom_devise/passwords',
    confirmations: 'custom_devise/confirmations',
    unlocks: 'custom_devise/unlocks'
  }

  # , controllers: {
  #   sessions: 'users/sessions',
  #   registrations: 'users/registrations'
  # }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # devise_for :admins
  # devise_for :students

  # get "home/splash", to: "home#splash", as: "splash"
  # get "home/index", to: "home#index", as: "home_index"

  # resources :admin123

  # get 'settings/show'
  # get "mails/index"
  # get 'dashboard', to: 'admins#index'
  namespace :admin do
    resource :dashboard, only: [:show]
    resource :service_center, only: [:show]
    resources :mails
    resources :students, except: [:show] do
      collection do
        # get "import-export", to: "students#import_export_modal"
        post 'import-export', to: 'students#modal'
        post 'import-csv', to: 'students#import_modal'
        post 'process-csv', to: 'students#process_csv'
        # get "import-csv", to: "students#import_csv"
        post 'export-csv', to: 'students#export_csv'
        # get "export-csv", to: "students#export_csv"
        get 'export-csv', to: 'students#export_csv', defaults: { format: :csv }
      end
    end
    resource :settings do
      member do
        get 'edit_password', to: 'settings#edit_password'
        patch 'update_password'
      end
    end
  end

  # root to: redirect("/admin/dashboard")
  # match '/*paths' => redirect('/'), via: :all

  # Redirect all unexisting routes
  # match '*path', to: 'application#redirect_to_root', via: :all

#   match '*path', via: :all, to: 'application#redirect_to_root', constraints: lambda { |req|
#     req.path.exclude? 'rails/active_storage'
# }
end
