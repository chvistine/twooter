/* eslint-disable max-lines-per-function */
import bcrypt from 'bcrypt'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'usernameTaken'
      },
      validate: {
        notEmpty: {
          msg: 'usernameEmpty'
        },
        len: {
          args: [6,32],
          msg: 'usernameWrongLength'
        },
        is: {
          args: ['^([a-z]|[A-Z]|[0-9]|[_])+$', 'i'],
          msg: 'usernameInvalid' 
        }
      }
    },
    displayUsername: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,1000],
          msg: 'passwordTooShort'
        },
        notEmpty: {
          msg: 'passwordEmpty'
        }
      }
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['username']
    }],
    hooks: {
      beforeValidate: (account) => {
        account.displayUsername = account.username
        account.username = account.username && account.username.toLowerCase()
      },
      beforeCreate: async (account) => {
        const hash = await bcrypt.hash(account.password, 10)
        account.password = hash
      }
    }
  })

  User.associate = (models) => {
    models.User.hasMany(models.Twoot, {
      foreignKey: 'authorID',
      as: 'twoots'
    })

    models.User.belongsToMany(models.User, {
      as: 'followers',
      through: models.Follow,
      foreignKey: 'followed',
      otherKey: 'follower'
    })

    models.User.belongsToMany(models.User, {
      as: 'follows',
      through: models.Follow,
      foreignKey: 'follower',
      otherKey: 'followed'
    })

    models.User.belongsToMany(models.Twoot, {
      as: 'liked',
      through: models.Like,
      foreignKey: 'userID',
      otherKey: 'twootID'
    })
  }

  return User
}

export default user
