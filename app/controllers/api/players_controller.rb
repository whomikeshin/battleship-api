class Api::PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
    if @player.save
      sign_in(@user)
      render "api/boards/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @player = Player.find(params[:id])
  end

  private
  def player_params
    params.require(:player).permit(:initials, :board)
  end
end
end
