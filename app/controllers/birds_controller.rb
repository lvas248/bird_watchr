class BirdsController < ApplicationController

    def index
        render json: Bird.all, status: :ok
    end
end
