/* eslint-disable-next-line max-lines-per-function */
const twoot = (sequelize, DataTypes) => {
  const Twoot = sequelize.define('twoot', {
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0,280],
          msg: 'twootTooLong'
        }
      }
    },
    retwootsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
