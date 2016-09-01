class Api::CellsController < ApplicationController
  def create
    @cell = Cell.new(cell_params)
    if @cell.save
      render :show
    else
      render json: @cell.errors.full_messages, status: 422
    end
  end

  def index
    @cells =
      Cell.all
        .where(board_id: params[:board_id])
    render :index
  end

  def show
    @cell = Cell.find(params[:id])
  end

  def update
    @cell = Cell.find(params[:id])

    if @cell.update(cell_params)
      render :show
    else
      render json: @cell.errors.full_messages, status: 422
    end
  end

  def destroy
    @cell = Cell.find(params[:id])

    if @cell
      @cell.destroy
      render json: ["Cell was destroyed"]
    else
      render json: ["Cell does not exist"], status: 422
    end
  end

  private
  def cell_params
    params.require(:cell).permit(:board_id, :row, :col, :status)
  end
end
