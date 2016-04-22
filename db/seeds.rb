# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# parse through data and get fields that i want

json = ActiveSupport::JSON.decode(File.read('db/global_airports.json'))

json.each do |a|
  if a["FIELD4"]=="United States"
    Airport.create({
      city: a["FIELD3"],
      airport: a["FIELD2"],
      airport_code: a["FIELD5"],
      latitude:a["FIELD7"],
      longitude:a["FIELD8"]
      })
  end
end
