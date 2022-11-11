import server from './server/config/server.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import IqairController from './server/api/controller/iqair.controller.js'
import cron from 'node-cron'
dotenv.config()

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})

mongoose.connect('mongodb://localhost:27017/airquality').then(
  () => { console.log('Connected to the DB');},
  (error) => { console.log("error : ",error); }
);

cron.schedule("* * * * *", ()=>{
  console.log("cron job is running!");
  IqairController.saveAirQuality(48.856613, 2.352222)
})