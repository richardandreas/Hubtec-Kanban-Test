module Api::V1
  class TaskController < ApplicationController
    before_action :authenticate_user!
    before_action :set_task, only: [:show, :update, :destroy]
    before_action :check_permission, only: [:set_task]

    def index
      @tasks = Task.user_tasks(current_user.id)
      render json: @tasks
    end

    def show
      render json: @task
    end

    def create
      @task = Task.new(task_params)
      @task.user_id = current_user.id
      if @task.save
        render json: @task
      else
        render json: @task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      if @task.soft_delete
        render json: :destroyed
      else
        render json: @task.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def check_permission
      unless @task.user_id != current_user.id
        render json: '"Access denied"', status: :unprocessable_entity
      end
    end

    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:project_id, :title, :description, :status, :end_date)
    end
  end
end
