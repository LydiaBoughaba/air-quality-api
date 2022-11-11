import mongoose from 'mongoose';

const airQualitySchema = new mongoose.Schema({
    ts: {
        type: String
    },
    aquis: {
        type: Number
    },
    mainus: {
        type: String
    },
    aqicn: {
        type: Number
    },
    maincn: {
        type: String
    },
    datetime:{
        type: String
    }
});

const AirQuality = mongoose.model('Airquality', airQualitySchema);

export async function saveAirQuality(ts, aquis, mainus, aqicn, maincn, datetime) {
    const airquality = new AirQuality({
        ts: ts,
        aquis: aquis,
        mainus: mainus,
        aqicn: aqicn,
        maincn: maincn, 
        datetime: datetime
    });

    const result = await airquality.save();
    console.log(result);
}

export async function findDatetimeWhereParisIsMostPolluted(){
    const result = await AirQuality.findOne().sort({aqicn : -1})
    return result.datetime;
}