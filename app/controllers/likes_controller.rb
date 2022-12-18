class LikesController < ApplicationController

    def index
        render json: Like.all, status: :ok
    end

    def create
        like = Like.create!(like_params)
        render json: like, status: :created
    end

    def destroy

    end

    private 

    def like_params
        params.permit(:user_id, :post_id)
    end

end
