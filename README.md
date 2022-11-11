# Air Quality REST API
Simple Rest API for exposing the air quality information of a nearest city to GPS coordinates using external iqair API. Created with Express and MongoDB as the database.

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Endpoints](#endpoints)

## Technologies
Project is created with:
* Express version : 4.17.1
* MongoDB version : 6.0.2
* Mongoose version : 6.7.2
* node-cron version : 3.0.2
* request version : 2.88.2
* morgan version : 1.10.0
* dotenv version : 10.0.0

## Setup
To install locally the project using npm : 
```
npm install
```

To run the project in development mode :
```
npm run dev
```

To run the project in production mode :
```
npm run start
```

## Endpoints

### GET Air Quality with a given zone
```
http://localhost:4000/api/v1/iqair
```
Return nearest city's air quality, using a specified set of GPS coordinates.

#### BODY
```
{
    "latitude": "48.856613",
    "longitude": "2.352222"
}
```

### GET Datetime where the paris zone is the most polluted
```
http://localhost:4000/api/v1/iqair/paris-most-polluted
```
Return datetime (date and time) where the paris zone is the most polluted (based on the CRON JOB results).

## CRON JOB
The CRON JOB runs to check the air quality for the Paris zone every 1 minute than it saves them in the
database with date and time when saving it.
```javascript
cron.schedule("* * * * *", ()=>{
  console.log("cron job is running!");
  IqairController.saveAirQuality(48.856613, 2.352222)
})
```