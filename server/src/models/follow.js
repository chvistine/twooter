/* eslint-disable-next-line max-lines-per-function */
const follow = (sequelize, DataTypes) => {
  const Follow = sequelize.define('follow', {
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

  return Follow
}

export default follow
