/* eslint-disable max-lines-per-function */
const like = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    twootID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      fields: ['twootID']
    }, {
      fields: ['userID']
    }]
  })

  return Like
}

export default like