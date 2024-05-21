class Admin::SettingsController < ApplicationController
  def show
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def edit_password; end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to admin_dashboard_path, notice: 'Settings updated.'
    else
      render :edit
    end
  end

  def update_password
    if current_user.update(password: params[:user][:password],
                           password_confirmation: params[:user][:password_confirmation])
      sign_in(current_user, bypass: true)
      redirect_to root_path, notice: 'Password updated successfully.'
    else
      render :edit_password
    end
  end

  private

  def user_params
    params.require(:user).permit(:avatar, :other_attributes)
  end
end
