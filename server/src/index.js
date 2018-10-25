import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.json({hello: 'you'})
})

app.listen(9500, () => {
  console.log('Listening on port 9500')
})
