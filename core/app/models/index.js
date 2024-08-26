const config = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.PORT,
        dialect: config.DIALECT,
        schema: 'pgn',
        pool: {
            max: config.POOL.MAX,
            min: config.POOL.MIN,
            acquire: config.POOL.ACQUIRE,
            idle: config.POOL.IDLE
        },
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.cctv = require('./cctv.models')(sequelize, Sequelize);
db.page = require('./page.models')(sequelize, Sequelize);
db.services = require('./service.models')(sequelize, Sequelize);

module.exports = db;