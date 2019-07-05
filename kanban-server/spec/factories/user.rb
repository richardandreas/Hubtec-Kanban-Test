FactoryBot.define do
  factory :user do
    name { FFaker::Name.name }
    nickname { FFaker::Name.first_name }
    email { FFaker::Internet.unique.email }
    pwd = FFaker::Internet.unique.password
    password { pwd }
    password_confirmation { pwd }
  end
end
