class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new; end

  def create
    user = User.find_by(username: params[:username])
    # finds existing user, checks to see if user can be authenticated
    if user.present? && user.authenticate(params[:password])
      # sets up user.id sessions
      session[:user_id] = user.id
      redirect_to root_path, notice: 'Logged in successfully'
    else
      puts params[:username]
      puts params[:password]
      # flash.now[:alert] = 'Invalid username or password'
      redirect_to sign_up_url, format: :json
    end
  end

  def destroy
    # deletes user session
    session[:user_id] = nil
    redirect_to root_path, notice: 'Logged Out'
  end
end