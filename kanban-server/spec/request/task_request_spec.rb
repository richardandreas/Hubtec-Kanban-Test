require "rails_helper"

RSpec.describe "Api v1 task request", type: :request do
  let(:params) { attributes_for(:task) }

  before(:each) do
    @user = create(:user)
    post "/auth/sign_in", params: { email: @user.email, password: @user.password }
    @headers = { "access-token": response.header["access-token"], "client": response.header["client"], "uid": response.header["uid"] }
  end

  describe "GET /api/v1/task" do
    it "successful" do
      get "/api/v1/task", headers: @headers
      expect(response).to have_http_status(200)
    end

    it "returns json response" do
      get "/api/v1/task", headers: @headers
      expect(JSON.parse(response.body)).to respond_to(:hash)
    end
  end

  describe "POST /api/v1/task" do
    before(:each) do
      post "/api/v1/task", headers: @headers, params: { task: params }
    end

    it "should succeed" do
      expect(response).to be_successful
    end

    context "created task" do
      it "should return title of task" do
        parsed_response = JSON.parse(response.body)
        expect(parsed_response["title"]).to be === params[:title]
      end

      it "should return description of task" do
        parsed_response = JSON.parse(response.body)
        expect(parsed_response["description"]).to be === params[:description]
      end
    end
  end

  describe "GET /api/v1/task/:id" do
    before(:each) do
      @task = create(:task, user_id: @user.id)
      id = @task.id
      # binding.pry
      get "/api/v1/task/" + id.to_s, headers: @headers
    end

    it "should succeed" do
      expect(response).to be_successful
    end

    context "requested task" do
      it "should return title of task" do
        binding.pry
        parsed_response = JSON.parse(response.body)
        expect(parsed_response["title"]).to be === @task[:title]
      end

      it "should return description of task" do
        parsed_response = JSON.parse(response.body)
        expect(parsed_response["description"]).to be === @task[:description]
      end
    end
  end

  describe "PUT /api/v1/task/:id" do
    let(:task) { create(:task, :with_user) }
    let(:attr) { attributes_for(:task) }

    before(:each) do
      put "/api/v1/task/#{task.id}", headers: @headers, params: { task: attr }
      task.reload
    end

    it "should succeed" do
      expect(response).to have_http_status(200)
    end

    it "should update attributes" do
      attr.each do |key, value|
        expect(task[key]).to eq(attr[key])
      end
    end
  end

  describe "DELETE /api/v1/task/:id" do
    before(:each) do
      @user_id = create(:user).id
      @task = create(:task, user_id: @user_id)
      id = @task.id
      delete "/api/v1/task/#{id}", headers: @headers
    end

    it "should succeed" do
      expect(response).to be_successful
    end

    it "should return destroyed" do
      expect(JSON.parse(response.body)).to be === "destroyed"
    end
  end
end
