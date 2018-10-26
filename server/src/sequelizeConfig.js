import Sequelize from 'sequelize'

const prod = {
  db: 'twoot',
  username: 'dove',
  password: '',
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  logging: false
}

const dev = {
  db: 'twoot_dev',
  username: 'dove',
  password: '',
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  logging: false
}

const test = {
  db: 'twoot_test',
  username: 'dove',
  password: '',
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  logging: false
}

let config = prod

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  config = dev
} else if (process.env.NODE_ENV === 'test') {
  config = test
}

export default config
