module.exports = (sequelize, Sequelize) => {
    const Cctv = sequelize.define("cctv", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uid: {
            type: Sequelize.STRING,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        rtsp: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.STRING,
        },
        updatedAt: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'cctvStation',
        timestamps: false
    });
    Cctv.schema("pgn");
    return Cctv;
}