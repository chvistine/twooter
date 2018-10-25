import bcrypt from 'bcrypt'

/* eslint-disable-next-line max-lines-per-function */
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
    },
    followedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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

  /* eslint-disable-next-line max-lines-per-function */
  User.associate = (models) => {
    models.User.hasMany(models.Twoot, {
      foreignKey: 'user',
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
      as: 'likes',
      through: models.Like,
      foreignKey: 'user',
      otherKey: 'twoot'
    })
  }

  return User
}

export default user
