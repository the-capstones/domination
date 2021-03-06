const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  // avatar: {
  //   type: Sequelize.STRING
  // }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}
const validUsername = user => {
  if (user.username === null) {
    user.username = user.email.split('.')[0]
    console.log(user)
  }
}

// const setAvatar = user => {
//   const avatarOptions = ['king', 'soldier', 'champion', 'commander', 'viking', 'wizard']
//   let avatarRandomIndex = Math.floor(Math.random() * avatarOptions.length)
//   let avatarChoice = avatarOptions[avatarRandomIndex]
//   user.avatar = `../assets/avatar/${avatarChoice}.png`
// }

// User.beforeCreate(setAvatar)
User.beforeCreate(setSaltAndPassword)
console.log('did stuff')
User.beforeCreate(validUsername)
User.beforeUpdate(setSaltAndPassword)
