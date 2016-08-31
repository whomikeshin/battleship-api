class Player < ActiveRecord::Base
  has_many :games, dependent: :destroy
  has_one :board, dependent: :destroy

  has_many :cells, through: :board, source: :cells

  validates :initials, presence: :true, uniqueness: :true
end
