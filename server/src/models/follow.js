/* eslint-disable-next-line max-lines-per-function */
const follow = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follow', {
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followed: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      fields: ['follower']
    }, {
      fields: ['followed']
    }]
  })

  return Follow
}

export default follow
