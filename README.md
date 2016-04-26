# Airport Distance Calculator

This application is a lightweight Rails app that relies on the Google Maps Javascript API to calculate the distance between two US airports in nautical miles both as an integer and “flight path”. It has an elegant user experience that relies mostly on custom CSS, with some bootstrap.

DOCUMENTATION:

Make sure Ruby on Rails is installed in your local development environment to test this app. If it is not, please follow the directions found at this link to install: gorails.com/setup/osx/10.11-el-capitan

Once Rails is installed, unzip the file and navigate to it using the CLI. When at the root directory of the folder, run the command 'bundle install' - if Bundler is not installed, first run 'gem install bundler'.

Now that all the gems are installed, run 'rails s' in the CLI to launch your local server on port:3000

Using Chrome or Firefox, navigate to the url 'localhost:3000' to view and test the app.

TROUBLESHOOTING:

When typing an airport name into the airport fields, if there are no autocomplete values being returned try re-initializing and re-seeding the database by first shutting down the server and then running the following commands in the CLI in this order.

a. 'rake db:drop'
b. 'rake db:migrate'
c. 'rake db:seed'
If there are any other questions or issues, please contact Matteo Ziff at matteoziff@gmail.com
