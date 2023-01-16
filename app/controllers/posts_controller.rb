class PostsController < ApplicationController

before_action :authorize
skip_before_action :authorize, only: :index
    
    def index
        render json: Post.all.order(:created_at).reverse, status: :ok
    end

    def create
        post = Post.create!(post_params)
        post.update(user_id: session[:user_id])
        render json: post, status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update!(post_params)
        render json: post, status: :ok
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        render json: post, status: :ok
    end

    # def something
    #     user = User.find(session[:user_id])
    #     user.posts.create()
    # end

    private

    def post_params
        params.permit(:id, :location, :caption, :image_url, :user_id, :bird_id)
    end

    def authorize
        render json: { error: "Sign in to interact"}, status: :unauthorized unless
        session.include? :user_id
    end
end
