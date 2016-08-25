class AddColumnToBoard < ActiveRecord::Migration
  def change
    add_column :boards, :computer_id, :integer
  end
end
