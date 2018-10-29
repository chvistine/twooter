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
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    retwootsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    indexes: [{
      fields: ['authorID']
    }, {
      fields: ['parentTwootID']
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

    models.Twoot.belongsToMany(models.User, {
      as: 'likes',
      through: models.Like,
      foreignKey: 'twootID',
      otherKey: 'userID'
    })
  }

  return Twoot
}

export default twoot
