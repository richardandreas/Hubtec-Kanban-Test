class Task < ApplicationRecord
  belongs_to :user

  validates :title, :description, :status, :end_date, presence: true
  validates :status, :numericality => { :only_integer => true, :greater_than_or_equal_to => 0 }
  validate :date_is_valid

  def soft_delete
    if self.deleted_at != nil
      update(deleted_at: Time.current)
    end
  end

  private

  def self.users_tasks(user_id)
    Task.where("user_id = ?", user_id)
  end

  def date_is_valid
    if end_date < Date.today
      errors.add(:end_date, "is outdated!")
    end
  end
end
