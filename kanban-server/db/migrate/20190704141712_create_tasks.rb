class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.references :user, foreign_key: true
      t.string :title
      t.string :description
      t.date :end_date
      t.integer :status
      t.date :deleted_at

      t.timestamps
    end
  end
end
