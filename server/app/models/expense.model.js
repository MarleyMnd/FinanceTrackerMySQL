module.exports = (connex, Sequelize) => {
    const Expenses = connex.define('Expenses', {
        name: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.REAL
        },
        datetime: {
            type: Sequelize.DATE
        },
        ID_user: { // Explicitly define the foreign key field
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // The name of the Users table
                key: 'id' // The column in the Users table that this foreign key references
            }
        }
    });

    Expenses.associate = (models) => {
        Expenses.belongsTo(models.Users, {
            foreignKey: 'ID_user',
            onDelete: 'CASCADE'
        });
    };

    return Expenses;
};
