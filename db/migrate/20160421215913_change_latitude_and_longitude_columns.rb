class ChangeLatitudeAndLongitudeColumns < ActiveRecord::Migration
  def change
    remove_column :airports, :latitude
    remove_column :airports, :longitude
    add_column :airports, :latitude, :float
    add_column :airports, :longitude, :float
  end
end
