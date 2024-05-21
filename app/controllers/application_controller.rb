class ApplicationController < ActionController::Base
  include Pagy::Backend

  protect_from_forgery with: :exception
  # before_action :authenticate_user!, unless: :devise_controller?
  before_action :authenticate_user!, unless: :devise_controller?, except: [:redirect_to_root]
  before_action :update_allowed_parameters, if: :devise_controller?

  layout :layout_by_resource

  def after_sign_in_path_for(resource)
    return super unless resource.is_a?(User)

    # resource.update(first_login: false)

    if resource.default_auth_incomplete && resource.imported_from_csv
      resource.update(default_auth_incomplete: false)
      edit_password_admin_settings_path
    else
      super
    end
  end

  def redirect_to_root
    # flash[:notice] = 'This is a flash message.'
    flash[:error] = 'Uh-oh! 404 Error: Page not found.'
    redirect_to '/'
  end

  protected

  def update_allowed_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:full_name, :email, :password, :password_confirmation) }
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:full_name, :email, :password, :current_password)
    end
  end

  private

  def layout_by_resource
    if devise_controller? || (controller_path == 'admin/settings' && action_name == 'edit_password')
      #  (controller_name == "admin/settings" && action_name == "edit_password")
      # request.path =~ %r{^/admin/settings/edit_password}

      'devise_layout'
    else
      'application'
    end
  end
end

# # //https://codepen.io/monzork/pen/MWWbamg
# # https://codepen.io/Kaylled/pen/RwyJrMJ https://codepen.io/nobin-light/pen/eYrpJLN
# # https://codepen.io/prakharv10/pen/KKWRyOo https://codepen.io/infinity123/pen/BaQpoLJ
# # https://codepen.io/runtimess/pen/oNvWGxz https://codepen.io/mweslander/pen/xMLjXL
# # https://codepen.io/samcorin/pen/gKvOwZ https://codepen.io/Geshben/pen/XWpzqVW
# # https :/ / codepen.io / gzwo / pen / VwemMYM
# # { https://codepen.io/EduardL/pen/jObzJB }
