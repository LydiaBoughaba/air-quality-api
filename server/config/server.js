import express from 'express'
import morgan from 'morgan'
import iqair from '../api/routes/iqair.routes.js'

const server = express()

//middleware
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/v1/', iqair)
server.use('*', (req, res, next) =>
  res.status(404).json({ error: 'page not found' })
)

export default server