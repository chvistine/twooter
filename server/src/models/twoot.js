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
    parentTwootID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    authorID: {
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
      foreignKey: 'authorID',
      as: 'author',
      onDelete: 'cascade',
      hooks: true
    })

    models.Twoot.belongsTo(models.Twoot, {
      foreignKey: 'parentTwootID',
      as: 'parentTwoot'
    })

    models.Twoot.hasMany(models.Twoot, {
      foreignKey: 'parentTwootID',
      as: 'retwoots'
    })
  }

  return Twoot
}

export default twoot
