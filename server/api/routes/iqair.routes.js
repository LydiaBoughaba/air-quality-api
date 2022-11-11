import express from 'express'
import IqairController from '../controller/iqair.controller.js'

const router = express.Router()

router.route('/iqair').get(await IqairController.apiGetAirQuality)
router.route('/iqair/paris-most-polluted').get(await IqairController.findDatetimeWhereParisIsMostPolluted)

export default router