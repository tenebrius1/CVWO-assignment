class User < ApplicationRecord
  # adds virtual attributes for authentication
  has_secure_password
  # validates username, ensures that it is present and is unique
  validates :username, presence: true, uniqueness: true
end
