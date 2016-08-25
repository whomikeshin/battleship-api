json.extract! @game, :id, :player, :player_board, :computer_board

json.tracks do
  json.array! @artist.tracks, partial: 'api/tracks/track', as: :track
end
