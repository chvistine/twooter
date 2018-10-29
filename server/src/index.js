import express from 'express'
import graphqlHTTP from 'express-graphql'
import expressJWT from 'express-jwt'
import cookieParser from 'cookie-parser'
import models from 'models'
import cors from 'cors'
import schema from 'schema'
import config from 'config'

const app = express()

app.use(cookieParser(config.secretKey))

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(expressJWT({
  secret: config.secretKey,
  credentialsRequired: false,
  getToken: (req) => {
    return req.signedCookies['token']
  }
}))

app.get(
  '/',
  (_req, res) => {
    res.redirect('/graphql')
  }
)

app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: schema,
    graphiql: true,
    context: {
      req: req,
      res: res
    }
  }))
)

app.on('close', async () => {
  await models.sequelize.close()
})

models.sequelize.sync().then(() => {
  app.listen(9500, () => {
    console.log('Listening on port 9500.')
  })
})
