import express from 'express'
import 'dotenv/config'

export const startServer = () => {
  const { PORT } = process.env
  const app = express()

  app.get('/', (req, res) => {
    res.send('Lo lograste!!')
  })

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
  })
}
