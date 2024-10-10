const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: 3306,
    operatorAliases: false
})
const db = {}
db.Sequelize = Sequelize
db.connex = connex

db.Users = require('./user.model.js')(connex, Sequelize)
db.Expenses = require('./expense.model.js')(connex, Sequelize)
db.Tasks = require('./task.model.js')(connex, Sequelize)
db.Subscriptions = require('./subscription.model.js')(connex, Sequelize)

db.Users.associate(db);
db.Expenses.associate(db);
db.Tasks.associate(db);
db.Subscriptions.associate(db);

module.exports = db