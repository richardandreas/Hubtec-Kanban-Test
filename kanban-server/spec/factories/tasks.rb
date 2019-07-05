FactoryBot.define do
  factory :task do
    trait :with_user do
      user_id { create(:user).id }
    end

    title { FFaker::Name.unique.name }
    description { FFaker::Lorem.unique.phrase }
    end_date { Date.today }
    status { 0 }
  end
end
