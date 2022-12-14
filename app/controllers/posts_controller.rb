class PostsController < ApplicationController

    def index
        render json: Post.all, status: :ok
    end
end
