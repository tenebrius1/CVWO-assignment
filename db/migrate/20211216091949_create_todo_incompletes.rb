class CreateTodoIncompletes < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_incompletes do |t|
      t.belongs_to :user
      t.string :title, null: false

      t.timestamps
    end

    create_table :todo_completeds do |t|
      t.belongs_to :user
      t.string :title, null: false

      t.timestamps
    end
  end
end
