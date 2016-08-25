class Api::GamesController < ApplicationController
  def create
    @game = Game.new(game_params)
    if @game.save
      render json: ["Game was created"]
    else
      render json: @game.errors.full_messages, status: 422
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
    params.require(:game).permit(:id, :player, :player_board, :computer_board)
  end
end
