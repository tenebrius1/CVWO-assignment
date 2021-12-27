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
      puts "hello"
      # stores saved user id in a session
      session[:user_id] = @user.id
      render json: {url: sign_in_path}
    else
      puts "here"
      render json: {type: "error", msg: "Username is already taken, please choose another username!"}
    end
  end

  private

  def user_params
    # strong parameters
    params.require(:user).permit(:username, :password)
  end
end