# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  # this creates a new User
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      warden.custom_failure!
      # https://stackoverflow.com/questions/4714001/in-rails-how-can-i-find-out-what-caused-a-save-to-fail-other-than-validatio
      error_message = @user.errors.full_messages[0] || ''
      render json: { error: error_message }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
