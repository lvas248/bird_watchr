class PostsController < ApplicationController

    def index
        render json: Post.all, status: :ok
    end

    def update
        post = Post.find(params[:id])
        post.update(post_params)
        render json: post, status: :ok
    end

    private

    def post_params
        params.permit(:id, :caption, :image_url, :user_id, :bird_id)
    end

end
