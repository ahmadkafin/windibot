module.exports = (sequelize, Sequelize) => {
    const Services = sequelize.define("services", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        uid: {
            type: Sequelize.STRING,
            unique: true,
        },
        url: {
            type: Sequelize.STRING,
        },
        isEnable: {
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            type: Sequelize.STRING,
        },
        updatedAt: {
            type: Sequelize.STRING,
        }
    }, {
        tableName: 'serviceMap',
        timestamps: false,
    });
    Services.schema('pgn');
    return Services;
};