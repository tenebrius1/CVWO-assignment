class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # instantiates new user
  def new
    @user = User.new
  end

  # Handles creation of new users
  def create
    @user = User.new(:username => params[:username], :password => params[:password])
    if @user.save
      # stores saved user id in a session
      session[:user_id] = @user.id
      render json: { url: sign_in_path }
    else
      render json: { type: "error", msg: "Username is already taken, please choose another username!" }
    end
  end
end