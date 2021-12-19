class TodoIncomplete < ApplicationRecord
  belongs_to :user
  # primary key is the default id created by psql
  # foreign key is the user_id
end
