class LikesController < ApplicationController
    before_action :authorize

    def index
        render json: Like.all, status: :ok
    end

    def create
        like = Like.create!(like_params)
        render json: like, status: :created
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        render json: like, status: :ok
    end

    private 

    def like_params
        params.permit(:id, :user_id, :post_id)
    end

    def authorize
        render json: { error: "Sign in to interact"}, status: :unauthorized unless
        session.include? :user_id
    end
end
