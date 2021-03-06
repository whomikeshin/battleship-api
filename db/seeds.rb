Player.destroy_all

comp = Player.create!(
  initials: "CPU"
)

mike = Player.create!(
  initials: "MKS"
)

Game.destroy_all

game1 = Game.create!(
  player: mike,
  computer: comp
)

Board.destroy_all

computer_board = Board.create!(
  game: game1,
  player: comp
)

Cell.destroy_all

(0..4).each do |i|
  (0..4).each do |j|
    Cell.create!(
      board: computer_board,
      row: i,
      col: j,
      status: "null"
    )
  end
end
