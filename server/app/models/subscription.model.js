module.exports = (connex, Sequelize) => {
    const Subscriptions = connex.define('Subscriptions', {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.REAL
        },
        planType: {
            type: Sequelize.STRING
        },
        nextPayment: {
            type: Sequelize.DATE
        }
    });

    Subscriptions.associate = (models) => {
        Subscriptions.belongsTo(models.Users, {
            foreignKey: 'ID_user',
            onDelete: 'CASCADE'
        });
    };

    return Subscriptions;
};
