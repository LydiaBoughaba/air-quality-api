import request from "request";
import { saveAirQuality, findDatetimeWhereParisIsMostPolluted } from '../model/iqair.model.js'

export default class IqairController {
  static async apiGetAirQuality(req, res, next){
    try{
      let latitude = parseFloat(req.body.latitude)
      let longitude = parseFloat(req.body.longitude)

      if(latitude && longitude){
        let key = '03a01146-c490-407a-bb43-b3c8ba69be46'
        let hostname = 'https://api.airvisual.com/v2/nearest_city';
        let params = {lon: longitude, lat: latitude, key: key};
    
        request({url:hostname, qs:params}, async (err, response, body) =>{
          if(err) { console.log(err); return; }
          if(response.statusCode < 300 && response.statusCode >= 200){
            let result = {
              result : JSON.parse(body).data.current.pollution
            }
            res.status(200).json(result)
          }else{
            res.status(400).json(JSON.parse(body))
          }
        });
      }else{
        res.status(400).json({
          message: 'Latitude and/or Longitude are null'
        })
      }
    }catch (error){
      res.status(400).json({ error })
    }
  }
  static async saveAirQuality(latitude, longitude){
    let key = '03a01146-c490-407a-bb43-b3c8ba69be46'
    let hostname = 'https://api.airvisual.com/v2/nearest_city';
    let params = {lon: longitude, lat: latitude, key: key};
    
    request({url:hostname, qs:params}, async (err, response, body) =>{
      if(err) { console.log(err); return; }
      if(response.statusCode < 300 && response.statusCode >= 200){
      let result = JSON.parse(body).data.current.pollution
      let datetime = new Date();
        saveAirQuality(result.ts, result.aquis, result.mainus, result.aqicn, result.maincn, datetime)
      }
    });
  }
  static async findDatetimeWhereParisIsMostPolluted(req, res){
    
    try{
      const result = await findDatetimeWhereParisIsMostPolluted()
      res.status(200).json({datetime : result})
    }catch(error){
      res.status(400).json({ error })
    }
  }
}
