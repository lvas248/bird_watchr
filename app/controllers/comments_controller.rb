class CommentsController < ApplicationController

    def index
        render json: Comment.all, status: :ok
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        render json: comment, status: :ok

    end

    private

    def comment_params
        params.permit( :id, :user_id, :post_id, :content)
    end
    
end
