import express from 'express'
import morgan from 'morgan'
import iqair from '../api/routes/iqair.routes.js'
import mongoose from 'mongoose'
import cron from 'node-cron'
import IqairController from '../api/controller/iqair.controller.js'

mongoose.connect('mongodb://localhost:27017/airquality').then(
  () => { console.log('Connected to the DB');},
  (error) => { console.log("error : ",error); }
);

const server = express()

//middleware
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/v1/', iqair)
server.use('*', (req, res, next) =>
  res.status(404).json({ error: 'page not found' })
)

cron.schedule("* * * * *", ()=>{
  console.log("cron job is running!");
  IqairController.saveAirQuality(48.856613, 2.352222)
})

export default server