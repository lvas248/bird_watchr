class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find(session[:user_id])
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    def update
        user = User.find(session[:user_id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = User.find(session[:user_id])
        session.delete :user_id
        user.destroy
        head :no_content
    end


    private

    def user_params
        params.permit(:password, :password_confirmation, :username)
    end
end
