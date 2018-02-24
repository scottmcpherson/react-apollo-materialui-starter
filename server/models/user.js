const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: function(user, options) {
          if (!user.changed('password')) return
          return bcrypt.hash(user.password, SALT_FACTOR).then(hash => {
            user.password = hash
          })
        },
        beforeUpdate: function(user, options) {
          if (!user.changed('password')) return
          return bcrypt.hash(user.password, SALT_FACTOR).then(hash => {
            user.password = hash
          })
        }
      }
    }
  )

  User.prototype.comparePassword = function(candidatePassword, cb) {
    return bcrypt.compare(candidatePassword, this.password)
  }

  return User
}
