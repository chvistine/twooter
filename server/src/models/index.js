import Sequelize from 'sequelize'

const sequelize = new Sequelize()

const models = {
  Author: sequelize.import('./author')
}

models.map(model => {
  if (model.associate) {
    model.associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
