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

player_board = Board.create!(
  game: game1,
  player: mike
)

computer_board = Board.create!(
  game: game1,
  player: comp
)
