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
    });

    Users.associate = (models) => {
        Users.hasMany(models.Expenses, {
            foreignKey: 'ID_user',
            as: 'userExpenses',
            onDelete: 'CASCADE'
        });

        Users.hasMany(models.Tasks, {
            foreignKey: 'ID_user',
            as: 'tasks',
            onDelete: 'CASCADE'
        });
    };

    return Users;
};
