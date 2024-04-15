import express from 'express'
import 'dotenv/config'
const app = express()
import router from './routes/index.js'

export const startServer = () => {
  const { PORT } = process.env
  app.use(express.json())
  app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
  app.use('/api/v1', router)

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
  })
}
