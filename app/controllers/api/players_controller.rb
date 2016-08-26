class Api::PlayersController < ApplicationController
  def create
    @player = Player.new(player_params)
    if @player.save
      render json: ["Player was created"]
    else
      render json: @player.errors.full_messages, status: 422
    end
  end

  def show
    @player = Player.find(params[:id])
  end

  def destroy
    @player = Player.find(params[:id])

    if @player
      @player.destroy
      render :show
    else
      render json: ["Player does not exist"], status: 422
    end
  end

  private
  def player_params
    params.require(:player).permit(:initials)
  end
end
