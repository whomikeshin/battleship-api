json.extract! board, :id, :player, :game

json.cells do
  json.array! board.cells, partial: 'api/cells/cell', as: :cell
end
