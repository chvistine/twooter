import Sequelize from 'sequelize'
import config from 'sequelizeConfig'

const sequelize = new Sequelize(
  config.db,
  config.username,
  config.password,  
  config
)

const models = {
  User: sequelize.import('./user'),
  Twoot: sequelize.import('./twoot'),
  Follow: sequelize.import('./follow'),
  Like: sequelize.import('./like')
}

Object.keys(models).map(key => {
  let model = models[key]

  if (model.associate) {
    model.associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
