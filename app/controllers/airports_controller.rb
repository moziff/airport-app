class AirportsController < ApplicationController
  autocomplete :airport, :airport

  def index
    @airports = Airport.all
    if params[:search]
      @airport = Airport.name_like("%#{params[:search]}%").order('airport')
    end
  end

  def map_data
    @airports = Airport.all
    render json: @airports
  end

  def airport_search
    airport1 = Airport.find_by(airport: params[:airport1])
    airport2 = Airport.find_by(airport: params[:airport2])
    render json: { airport1: airport1, airport2: airport2 }
  end

private

  def air_params
    params.permit(:first_airport, :second_airport)
  end
end
