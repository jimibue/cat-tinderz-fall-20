class Api::CatsController < ApplicationController
  # what calls require a user, what calls do we want to protected on backend
  # When working rails and apis it good think from backend, because frontend could be anything

  # if I try to call these from client, I need a valid token
  before_action :authenticate_user!

  def index
    render json: User.random_cats(current_user.liked_cats)
  end

  def update
    current_user.liked_cats << params[:id].to_i
    current_user.save
    # I want to see if current_user has liked_cat at this point
  end

  def my_cats_x
    render json: User.liked(current_user.liked_cats)
  end
end
