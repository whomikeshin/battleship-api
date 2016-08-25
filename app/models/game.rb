class Game < ActiveRecord::Base
  belongs_to :player, class_name: "Player", foreign_key: "player_id"
  belongs_to :computer, class_name: "Player", foreign_key: "computer_id"

  has_many :boards
  has_one :player_board, through: :player, source: :board
  has_one :computer_board, through: :computer, source: :board
end
