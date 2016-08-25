class Board < ActiveRecord::Base

  BOARD = Array.new(5) { Array.new(5, "") }

  belongs_to :game
  belongs_to :player
end
