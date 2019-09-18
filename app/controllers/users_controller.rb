# frozen_string_literal: true

class UsersController < ApplicationController
  def show_photos
    user = User.find(params[:id])

    if user
      render json: { photos: user.photos }
    else
      render json: { error: 'wow' }, status: 422
    end
  end
end
