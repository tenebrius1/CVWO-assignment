class User < ApplicationRecord
  has_many :todo_completeds
  has_many :todo_incompletes

  # uses bcrypt to encrypt password
  has_secure_password
  # validates username, ensures that it is present and is unique
  validates :username, presence: true, uniqueness: true

  # primary key is the default id created by psql
end
