# Restaurant Booking

This is simple service which provides the apis for booking tables in specific retaurant and send confirmation sms
I have added data seeder for adding data in mongo.


# setup

1. You need to update the config.env file in config folder
2. Import postman collections
4. Run seeder.js for importing data in db


## Update Config.env

you will find config copy.env in config folder just rename it **config.env** update with your secrets
like mongo uri, twilio configs etc
## Import Postman collection

To test the api I have added the postman collection of api in **documentation** folder 
just go on postman and import the collection there and start testing 

## Data Seeder
Once you are connect with your mongodb you will need data for testing right? yes 
that you can get by running **node seeder.js -i** and remove using **node seeder.js -D**
if you don't want to use seeder jsust insert the data I have added create apis for that
that you can find in postman collection

## Start Service :)

To start the service just run **npm run dev** else that you can you can create your own script in package.json


## Thank You
