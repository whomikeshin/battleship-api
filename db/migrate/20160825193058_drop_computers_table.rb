class DropComputersTable < ActiveRecord::Migration
  def change
    drop_table :computers
  end
end
