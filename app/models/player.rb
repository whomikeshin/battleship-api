class Player < ActiveRecord::Base
  has_many :games, dependent: :destroy
  has_one :board, dependent: :destroy

  validates :initials, presence: :true, uniqueness: :true
end
