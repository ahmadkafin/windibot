module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define('page', {
        menuuid: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        parentid: {
            type: Sequelize.BIGINT,
        },
        menuorder: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        label: {
            type: Sequelize.STRING,
        },
        url: {
            type: Sequelize.STRING,
        },
        contenttype: {
            type: Sequelize.STRING,
        },
        contentstring: {
            type: Sequelize.STRING,
        },
        querystring: {
            type: Sequelize.STRING,
        },
        icon: {
            type: Sequelize.STRING,
        },
        icontype: {
            type: Sequelize.STRING,
        },
        haschild: {
            type: Sequelize.BOOLEAN,
        },
        enable: {
            type: Sequelize.BOOLEAN,
        },
        filterWilayah: {
            type: Sequelize.BOOLEAN,
        },
    }, {
        tableName: 'APP_PGN.pgn.digio_menu',
        timestamps: false,
    });
    Page.schema("pgn");
    return Page;
}