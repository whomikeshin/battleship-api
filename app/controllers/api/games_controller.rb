class Api::GamesController < ApplicationController
  def create
    @game = Game.new(game_params)
    if @game.save
      render :show
    else
      render json: @game.errors.full_messages, status: 422
    end
  end

  def show
    @game = Game.find(params[:id])
  end

  def destroy
    @game = Game.find(params[:id])

    if @game
      @game.destroy
      render :show
    else
      render json: ["Game does not exist"], status: 422
    end
  end

  private
  def game_params
    # params.require(:game).permit(player: [:id, :initials], computer: [:id, :initials])
    params.require(:game).permit(:player_id, :computer_id)
  end


end
