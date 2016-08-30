class AddCellsTable < ActiveRecord::Migration
  def change
    create_table :cells do |t|
      t.integer :board_id
      t.integer :row
      t.integer :col
      t.string :status

      t.timestamps null: false
    end

    add_index :cells, :board_id
  end
end
