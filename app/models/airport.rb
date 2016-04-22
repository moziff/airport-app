class Airport < ActiveRecord::Base
    scope :name_like, -> (airport) { where("airport ilike ?", airport)}
end
