class Api::BoardsController < ApplicationController
  def create
    @board = Board.new(board_params)
    if @board.save
      render json: ["Board was created"]
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board.find(params[:id])
    if @board.player.initials != "CPU"
      render :show
    else
      render json: ["Cannot access computer board"]
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
    @board = Board.find(params[:id])

    if @board
      @board.destroy
      render json: ["Board was destroyed"]
    else
      render json: ["Board does not exist"], status: 422
    end
  end

  private
  def board_params
    params.require(:board).permit(:game_id, :player_id)
  end
end
