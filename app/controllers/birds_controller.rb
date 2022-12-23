class BirdsController < ApplicationController

    def index
        render json: Bird.all, status: :ok
    end

    def create
        bird = Bird.create!(bird_params)
        render json: bird, status: :created
    end

    private

    def bird_params
        params.permit(:name, :description, :image_url, :id)
    end

end


