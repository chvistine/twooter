/* eslint-disable-next-line max-lines-per-function */
const like = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'follower_by_followed'
    },
    followed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'follower_by_followed'
    }
  }, {
    indexes: [{
      fields: ['follower']
    }, {
      fields: ['followed']
    }, {
      unique: true,
      fields: ['follower', 'followed'],
      name: 'follower_by_followed'
    }]
  })

  return Like
}

export default like