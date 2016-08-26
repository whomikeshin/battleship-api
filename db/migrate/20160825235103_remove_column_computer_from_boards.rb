class RemoveColumnComputerFromBoards < ActiveRecord::Migration
  def change
    remove_column :boards, :computer_id
  end
end
