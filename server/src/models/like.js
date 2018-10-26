/* eslint-disable-next-line max-lines-per-function */
const like = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    twoot: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      fields: ['twoot']
    }, {
      fields: ['user']
    }]
  })

  return Like
}

export default like