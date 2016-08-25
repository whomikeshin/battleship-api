class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player_id, null: false
      t.integer :computer_id
      t.datetime :game_end
      
      t.timestamps null: false
    end
  end
end
