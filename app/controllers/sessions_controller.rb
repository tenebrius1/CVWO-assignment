class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    # if user is logged in, redirect to the todos page
    if session[:user_id] != nil
      redirect_to todos_path
    end
  end

  # Handles authenticating of users
  def authenticate
    user = User.find_by(username: params[:username])
    # finds existing user, checks to see if user can be authenticated
    if user.present? && user.authenticate(params[:password])
      # sets up user.id sessions
      session[:user_id] = user.id
      render json: {url: todos_path}
    else
      render json: {type: "error", msg: "Incorrect username or password"}
    end
  end

  # Handles log out
  def destroy
    # deletes user session
    session[:user_id] = nil
    render json: {url: root_path}
  end
end