class PostsController < ApplicationController

before_action :authorize
    
    def index
        user = get_user
        render json: user.posts.order(:created_at).reverse, status: :ok
    end

    def create
        user = get_user
        post = user.posts.create!(post_params)
        render json: post, status: :created
    end

    def create_post_and_bird
        user = get_user
        post = user.posts.create!(post_and_bird_params)
        render json: post, status: :created
    end

    def update
        user = get_user
        post = user.posts.find(params[:id])
        post.update!(post_params)
        render json: post, status: :ok
    end

    def destroy
        user = get_user
        post = user.posts.find(params[:id])
        post.destroy
        render json: post, status: :ok
    end

    def destroy_bird_posts
        user = get_user
        user.posts.where("bird_id = #{params[:id]}").destroy_all
        head :no_content
    end



    private

    def post_and_bird_params
        params.require(:post).permit(:id, :location, :caption, :image_url, bird_attributes: [:name, :description])
    end

    def post_params
        params.require(:post).permit(:id, :location, :caption, :image_url, :bird_id)
    end

    def authorize
        render json: { error: "Sign in to interact"}, status: :unauthorized unless
        session.include? :user_id
    end

    def get_user
        User.find(session[:user_id])
    end
end
