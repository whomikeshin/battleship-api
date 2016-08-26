class GamesController < ApplicationController
  def show
    render json: {
      game: @game,
      player: @game.player,
      player_board: @game.player_board,
      :computer_board
    }
  end
end
