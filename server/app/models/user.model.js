module.exports = (connex, Sequelize) => {
  const Users = connex.define('Users', {
      username: {
          type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING
      },
      balance: {
          type: Sequelize.REAL
      },
      expenses: {
          type: Sequelize.TEXT
      },
      fullName: {
          type: Sequelize.STRING
      }
  })
  return Users
}