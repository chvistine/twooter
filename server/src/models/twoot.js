/* eslint-disable max-lines-per-function */
const twoot = (sequelize, DataTypes) => {
  const Twoot = sequelize.define('twoot', {
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0,280],
          msg: 'twootTooLong'
        }
      }
    },
    retwootOf: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      fields: ['user']
    }]
  })

  Twoot.associate = (models) => {
    models.Twoot.belongsTo(models.User, {
      foreignKey: 'user',
      as: 'author',
      onDelete: 'cascade',
      hooks: true
    })

    models.Twoot.hasMany(models.Twoot, {
      foreignKey: 'retwootOf',
      as: 'retwoots'
    })
  }

  return Twoot
}

export default twoot
