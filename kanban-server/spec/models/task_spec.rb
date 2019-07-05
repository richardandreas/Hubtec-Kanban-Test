require "rails_helper"

RSpec.describe Task, type: :model do
  let!(:task) { build(:task, :with_user) }

  describe "association" do
    it { should belong_to :user }
  end

  describe "validation" do
    context "presence of fields" do
      it { should validate_presence_of(:title) }
      it { should validate_presence_of(:description) }
      it { should validate_presence_of(:end_date) }
    end

    context "attribute validation" do
      it "is valid with valid attributes" do
        expect(task).to be_valid
      end

      it "is not valid with outdated end date" do
        task.end_date = 1.day.ago
        task.save
        expect(task).to_not be_valid
      end
    end
  end

  describe "method" do
    context "soft delete" do
      before(:each) do
        @user_id = create(:user).id
        @tasks = create_list(:task, 2, user_id: @user_id)
        Task.first.soft_delete
      end

      it "should not count soft deleted tasks" do
        @tasks = Task.all
        expect(@tasks.length).to be == 1
      end
    end

    context "user tasks" do
      before(:each) do
        @user_id = create(:user).id
        create(:task, user_id: @user_id, status: 0)
        create(:task, user_id: @user_id, status: 1)
        create(:task, user_id: @user_id, status: 2)
        create(:task, user_id: @user_id, status: 3)
        @tasks = Task.user_tasks(@user_id)
      end

      it "should contain only one task in new" do
        expect(@tasks[:new].length).to be == 1
      end

      it "should contain only one task in progress" do
        expect(@tasks[:progress].length).to be == 1
      end

      it "should contain only one task in done" do
        expect(@tasks[:done].length).to be == 1
      end

      it "should contain only one task in cancelled" do
        expect(@tasks[:cancelled].length).to be == 1
      end
    end
  end
end
