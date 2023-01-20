class BirdsController < ApplicationController

    def index
        render json: Bird.all, status: :ok
    end





    private

    def bird_params
        params.permit(:name, :description, :image_url, :id)
    end

end


