class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # instantiates new user
  def new
    @user = User.new
  end

  # Handles creation of new users
  def create
    @user = User.new(user_params)
    if @user.save
      # stores saved user id in a session
      session[:user_id] = @user.id
      render json: {url: sign_in_path}
    else
      render :new
    end
  end

  private

  def user_params
    # strong parameters
    params.require(:user).permit(:username, :password)
  end
end