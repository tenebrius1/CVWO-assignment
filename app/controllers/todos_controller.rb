class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  # allows only logged in users
  before_action :require_user_logged_in!

  # Handles passing of data from backend to frontend (using props) upon entering the todo page
  def new
    @incompleted_list = User.find_by(id: session[:user_id]).todo_incompletes
    @completed_list = User.find_by(id: session[:user_id]).todo_completeds
  end

  # Handles creation of new todo item
  def create
    user_id = session[:user_id]
    @user = User.find_by(id: user_id)
    @new_incomplete = @user.todo_incompletes.new(todo_params)
    if @new_incomplete.save
      render json: { updated_list: @user.todo_incompletes }
    end
  end

  # Handles updating of database whenever an incomplete task is marked as done and vice versa
  def update
    incomplete_list = User.find_by(id: session[:user_id]).todo_incompletes
    complete_list = User.find_by(id: session[:user_id]).todo_completeds

    if params[:incomplete_to_complete]
      incomplete_list.find_by(title: params[:title]).delete
      complete_list.new(title: params[:title]).save
    else
      complete_list.find_by(title: params[:title]).delete
      incomplete_list.new(title: params[:title]).save
    end
    render json: { incomplete: User.find_by(id: session[:user_id]).todo_incompletes, complete: User.find_by(id: session[:user_id]).todo_completeds }
  end

  # Handles updating of database when user updates the title of a todo
  def edit
    new_title = params[:title]
    id = params[:id]

    incomplete_list = User.find_by(id: session[:user_id]).todo_incompletes
    complete_list = User.find_by(id: session[:user_id]).todo_completeds

    if params[:done]
      todo = complete_list.find(id)
      todo.update(title: new_title)
    else
      todo = incomplete_list.find(id)
      todo.update(title: new_title)
    end
    render json: { incomplete: User.find_by(id: session[:user_id]).todo_incompletes, complete: User.find_by(id: session[:user_id]).todo_completeds }
  end

  def search
    query = params[:query]
    incomplete_list = User.find_by(id: session[:user_id]).todo_incompletes
    complete_list = User.find_by(id: session[:user_id]).todo_completeds
    incomplete_filtered = incomplete_list.where("lower(title) LIKE lower(?)", "%#{query}%")
    complete_filtered = complete_list.where("lower(title) LIKE lower(?)", "%#{query}%")
    render json: {incomplete: incomplete_filtered, complete: complete_filtered}
  end

  # Handles updating of database when user deletes a todo
  def delete
    title = params[:title]

    incomplete_list = User.find_by(id: session[:user_id]).todo_incompletes
    complete_list = User.find_by(id: session[:user_id]).todo_completeds

    if params[:done]
      complete_list.where(title: title).destroy_all
    else
      incomplete_list.where(title: title).destroy_all
    end
    render json: { incomplete: User.find_by(id: session[:user_id]).todo_incompletes, complete: User.find_by(id: session[:user_id]).todo_completeds }
  end

  private

  def todo_params
    # strong params
    params.require(:todo).permit(:title)
  end
end