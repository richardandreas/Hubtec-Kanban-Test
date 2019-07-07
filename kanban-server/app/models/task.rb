class Task < ApplicationRecord
  belongs_to :user

  before_validation :set_initial_status, on: :create

  validates :title, :description, :status, :end_date, presence: true
  validates :status, :numericality => { :only_integer => true, :greater_than_or_equal_to => 0 }
  validate :date_is_valid

  default_scope -> { where(deleted_at: nil) }

  def soft_delete
    if self.deleted_at == nil
      update(deleted_at: Date.today)
    end
  end

  def self.user_tasks(user_id)
    {
      new: Task.where("user_id = ? AND status = ?", user_id, 0).order(:end_date),
      progress: Task.where("user_id = ? AND status = ?", user_id, 1).order(:end_date),
      done: Task.where("user_id = ? AND status = ?", user_id, 2).order(:end_date),
      cancelled: Task.where("user_id = ? AND status = ?", user_id, 3).order(:end_date),
    }
  end

  private

  def date_is_valid
    if end_date.present? && end_date < Date.today
      errors.add(:end_date, "is outdated!")
    end
  end

  def set_initial_status
    if self.status == nil
      self.status = 0
    end
  end
end
