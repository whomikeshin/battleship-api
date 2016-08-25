Player.destroy_all

mike = Player.create!(
  initials: "MKS"
)

comp = Player.create!(
  initials: "CPU"
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
