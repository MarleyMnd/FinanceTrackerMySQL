module.exports = (connex, Sequelize) => {
    const Tasks = connex.define('Tasks', {
        state: {
            type: Sequelize.TEXT
        },
        name: {
            type: Sequelize.TEXT
        },
        goal_date: {
            type: Sequelize.DATE
        }
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users, {
            foreignKey: 'ID_user',
            onDelete: 'CASCADE'
        });
    };

    return Tasks;
};
