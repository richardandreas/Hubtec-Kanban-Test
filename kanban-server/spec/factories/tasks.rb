FactoryBot.define do
  factory :task do
    user { nil }
    title { "MyString" }
    description { "MyString" }
    end_date { "2019-07-04" }
    status { 1 }
  end
end
